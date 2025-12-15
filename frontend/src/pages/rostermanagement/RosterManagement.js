import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../complaint/ComplaintForm.css";
import { FaEye } from "react-icons/fa";
 

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
    <div className="ma-wrapper">
      <Sidebar />
      <div className="ma-content">
        <div className="ma-header">
          <h1>Roster Management</h1>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', padding: '1rem', borderRadius: '6px' }}>
            {error}
          </div>
        )}

        <div className="ma-filter-card" style={{ alignItems: 'center' }}>
          <div className="ma-filter-group" style={{ maxWidth: '340px' }}>
            <label className="ma-label">Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                generateMonthData(e.target.value);
              }}
              className="ma-input"
            />
          </div>
          <button type="button" className="ma-btn-submit" onClick={() => navigate('/roster-view')}>
            <FaEye style={{ marginRight: '8px' }} />
            View Rosters
          </button>
        </div>

        {roster.length > 0 && (
          <div className="ma-table-card">
            <div className="ma-table-container">
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Shift</th>
                    {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                      <th key={col}>{col}</th>
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
                              <td rowSpan={2}>{new Date(day.date).toLocaleDateString("en-GB")}</td>
                              <td rowSpan={2}>{day.dayName}</td>
                            </>
                          )}
                          <td>{shift.shift}</td>
                          {shift.employees.map((emp, empIndex) => (
                            <td key={empIndex}>
                              <select
                                className="ma-select"
                                value={emp}
                                onChange={(e) =>
                                  handleEmployeeSelect(
                                    dayIndex,
                                    shiftIndex,
                                    empIndex,
                                    e.target.value
                                  )
                                }
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
            </div>

            <div className="ma-footer-row">
              <button type="button" className="ma-pagination-btn" onClick={resetRoster}>
                Reset
              </button>
              <button className="ma-pagination-btn next" onClick={submitRoster} disabled={loading}>
                {loading ? 'Saving…' : 'Submit'}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};


export default RosterManagement;
