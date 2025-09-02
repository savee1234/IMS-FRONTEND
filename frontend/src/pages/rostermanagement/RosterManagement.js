import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import backgroundVideo from "../../assets/Background.mp4";

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
  const navigate = useNavigate();

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

  const handleEmployeeSelect = (dayIndex, shiftIndex, empIndex, value) => {
    const updated = [...roster];
    updated[dayIndex].shifts[shiftIndex].employees[empIndex] = value;
    setRoster(updated);
  };

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

  const submitRoster = () => {
    console.log("Roster Data:", roster);
    alert("✅ Roster submitted! Check console for data.");
  };

  const handleRosterView = () => {
    navigate("/roster-view");
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            borderBottom: '2px solid #3b82f6',
            paddingBottom: '0.5rem',
            margin: 0
          }}>
            Create Roster
          </h2>
          <button
            onClick={handleRosterView}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: '1px solid #10b981',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Roster View
          </button>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#374151',
              fontSize: '1rem',
              minWidth: '80px'
            }}>Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                generateMonthData(e.target.value);
              }}
              style={{
                padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.9rem',
                width: '250px',
                outline: 'none',
                color: '#374151'
              }}
            />
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>month picker</span>
          </div>

          {roster.length > 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '1px solid #d1d5db',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                border: '1px solid #d1d5db'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Date
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Day
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Shift
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'center',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      E1
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'center',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      E2
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'center',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      E3
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'center',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      E4
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'center',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      E5
                    </th>
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
                                border: '1px solid #d1d5db',
                                color: '#374151',
                                fontWeight: '600'
                              }}>
                                {new Date(day.date).toLocaleDateString('en-GB')}
                              </td>
                              <td rowSpan={2} style={{ 
                                padding: '1rem',
                                border: '1px solid #d1d5db',
                                color: '#374151'
                              }}>
                                {day.dayName}
                              </td>
                            </>
                          )}
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            color: '#374151'
                          }}>
                            {shift.shift}
                          </td>
                          {shift.employees.map((emp, empIndex) => (
                            <td key={empIndex} style={{ 
                              padding: '0.5rem',
                              border: '1px solid #d1d5db',
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
                                  padding: '0.5rem 2rem 0.5rem 0.5rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem',
                                  background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.5rem center/12px 12px',
                                  width: '100%',
                                  outline: 'none',
                                  cursor: 'pointer',
                                  color: '#374151',
                                  WebkitAppearance: 'none',
                                  MozAppearance: 'none',
                                  appearance: 'none'
                                }}
                              >
                                <option value="">Select</option>
                                {employees.map((employee, i) => (
                                  <option key={i} value={employee}>
                                    {employee}
                                  </option>
                                ))}
                              </select>
                              <div style={{ 
                                fontSize: '0.7rem', 
                                color: '#6b7280', 
                                marginTop: '0.25rem'
                              }}>
                                Single employee select
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {roster.length > 0 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: '1rem'
            }}>
              <button 
                onClick={resetRoster}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: '1px solid #6b7280',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
              <button 
                onClick={submitRoster}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: '1px solid #3b82f6',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RosterManagement;
