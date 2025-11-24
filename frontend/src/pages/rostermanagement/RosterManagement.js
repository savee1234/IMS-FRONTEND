import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
 

const employees = [
  "John Doe",
  "Jane Smith",
  "Mark Taylor",
  "Alice Moore",
  "David Clark",
];

const RosterManagement = () => {
  const [month, setMonth] = useState("");
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  //  Generate Month Data
  const generateMonthData = (selectedMonth) => {
    const [year, monthNum] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, monthNum, 0).getDate();
    const newRoster = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, monthNum - 1, day);
      const dateStr = dateObj.toISOString().split("T")[0];
      const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });

      const shifts = ["Shift 01", "Shift 02"].map((shift) => ({
        shift,
        employees: Array(5).fill(""),
      }));

      newRoster.push({
        date: dateStr,
        dayName: weekday,
        shifts,
      });
    }
    setRoster(newRoster);
  };

  // Handle Employee Selection
  const handleEmployeeSelect = (dayIndex, shiftIndex, empIndex, value) => {
    const updated = [...roster];
    updated[dayIndex].shifts[shiftIndex].employees[empIndex] = value;
    setRoster(updated);
  };

  //  Reset Roster
  const resetRoster = () => {
    setRoster((prev) =>
      prev.map((day) => ({
        ...day,
        shifts: day.shifts.map((shift) => ({
          ...shift,
          employees: Array(5).fill(""),
        })),
      }))
    );
  };

  // Submit Roster
  const submitRoster = async () => {
    if (!month || roster.length === 0) {
      setError("⚠ Please select a month and add roster details before submitting.");
      return;
    }

    // Check if a roster already exists for this month
    try {
      const response = await fetch(`${API_BASE_URL}/api/rosters?month=${month}`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const confirmReplace = window.confirm(
          `A roster for ${new Date(month + "-01").toLocaleString("en-US", {
            month: "long",
            year: "numeric"
          })} already exists. Creating a new roster will replace the existing one. Do you want to continue?`
        );
        
        if (!confirmReplace) {
          return;
        }
      }
    } catch (error) {
      console.warn('Could not check for existing roster:', error);
    }

    setLoading(true);
    setError('');

    try {
      const rosterName = `${new Date(month + "-01").toLocaleString("en-US", {
        month: "long",
        year: "numeric"
      })} Roster`;

      const rosterData = {
        rosterName,
        month,
        data: roster,
        createdBy: "EMP001", // TODO: Get from auth context
        createdByName: "John Doe" // TODO: Get from auth context
      };

      const response = await fetch(`${API_BASE_URL}/api/rosters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rosterData)
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}`);
        navigate("/roster-view");
      } else {
        setError(data.message || 'Failed to save roster');
      }
    } catch (error) {
      console.error('Error saving roster:', error);
      setError('Failed to save roster. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(0,43,91,0.15) 0%, rgba(59,130,246,0.15) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '1rem',
        marginTop: '1rem',
        maxWidth: '1400px',
        margin: '1rem auto 0 auto'
      }}>
        <div className="config-content" style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div className="roster-management-section" style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold', 
          color: '#0f172a',
          marginBottom: '2rem',
          textAlign: 'left',
          borderBottom: '2px solid #3b82f6',
          paddingBottom: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>Create Roster</h2>
          <button
            onClick={() => navigate("/roster-view")}
            style={{
              padding: '0.75rem 2rem',
              backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(59, 130, 246, 0.25)'
            }}
          >
            View Rosters
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {/* Form Section */}
        <form style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          marginBottom: '2rem',
          boxShadow: '0 10px 24px rgba(2, 6, 23, 0.08)'
        }}>
          {/* Month Picker */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            gap: '1rem'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#374151',
              fontSize: '1rem',
              minWidth: '120px'
            }}>
              Select Month :
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                generateMonthData(e.target.value);
              }}
              style={{
                padding: '0.75rem',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '0.95rem',
                width: '300px',
                outline: 'none',
                color: '#0f172a',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>
        </form>

          {/* Roster Table */}
          {roster.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 24px rgba(2, 6, 23, 0.08)',
              marginBottom: '2rem'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                border: '1px solid #e5e7eb'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      padding: '1rem', 
                      textAlign: 'left',
                      border: '1px solid #e5e7eb',
                      fontWeight: '600',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff'
                    }}>Date</th>
                    <th style={{
                      padding: '1rem', 
                      textAlign: 'left',
                      border: '1px solid #e5e7eb',
                      fontWeight: '600',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff'
                    }}>Day</th>
                    <th style={{
                      padding: '1rem', 
                      textAlign: 'left',
                      border: '1px solid #e5e7eb',
                      fontWeight: '600',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff'
                    }}>Shift</th>
                    {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                      <th key={col} style={{
                        padding: '1rem', 
                        textAlign: 'center',
                        border: '1px solid #e5e7eb',
                        fontWeight: '600',
                        backgroundColor: '#1e3a8a',
                        color: '#ffffff'
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roster.map((day, dayIndex) => (
                    <React.Fragment key={day.date}>
                      {day.shifts.map((shift, shiftIndex) => (
                        <tr key={`${day.date}-${shift.shift}`}>
                          {shiftIndex === 0 && (
                            <>
                              <td rowSpan={2} style={{
                                padding: '1rem',
                                border: '1px solid #e5e7eb',
                                color: '#374151'
                              }}>
                                {new Date(day.date).toLocaleDateString("en-GB")}
                              </td>
                              <td rowSpan={2} style={{
                                padding: '1rem',
                                border: '1px solid #e5e7eb',
                                color: '#374151'
                              }}>
                                {day.dayName}
                              </td>
                            </>
                          )}
                          <td style={{
                            padding: '1rem',
                            border: '1px solid #e5e7eb',
                            color: '#374151'
                          }}>{shift.shift}</td>
                          {shift.employees.map((emp, empIndex) => (
                            <td key={empIndex} style={{
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              textAlign: 'center'
                            }}>
                              <select
                                value={emp}
                                onChange={(e) =>
                                  handleEmployeeSelect(
                                    dayIndex,
                                    shiftIndex,
                                    empIndex,
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: '100%',
                                  padding: '0.5rem',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '10px',
                                  fontSize: '0.95rem',
                                  backgroundColor: '#ffffff',
                                  outline: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="">Select</option>
                                {employees.map((employee, i) => (
                                  <option key={i} value={employee}>
                                    {employee}
                                  </option>
                                ))}
                              </select>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <button type="button" onClick={resetRoster} style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Reset
                </button>
                
                <button onClick={submitRoster} disabled={loading} style={{
                  padding: '0.75rem 2rem',
                  backgroundImage: loading ? 'none' : 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                  backgroundColor: loading ? '#9ca3af' : undefined,
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 10px 24px rgba(59, 130, 246, 0.25)'
                }}>
                  {loading ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default RosterManagement;
