import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundVideo from "../assets/Background.mp4";

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
    <div className="video-background-wrapper">
      {/* Background Video */}
      <video autoPlay loop muted className="video-background">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>

      {/* Overlay Content */}
      <div className="content-overlay d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-4">
          <div className="container roster-container">
            {/* Header with Roster View Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-primary mb-0">Create Roster</h2>
              <button
                onClick={handleRosterView}
                className="btn btn-info px-4 py-2 rounded-pill shadow-sm"
              >
                Roster View
              </button>
            </div>

            {/* Month Picker */}
            <div className="mb-4">
              <label className="form-label fw-bold">Month</label>
              <input
                type="month"
                className="form-control w-25 shadow-sm"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  generateMonthData(e.target.value);
                }}
              />
            </div>

            {/* Roster Table */}
            {roster.length > 0 && (
              <div className="table-responsive shadow rounded bg-white p-3 mb-4">
                <table className="table table-bordered text-center align-middle mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th className="date-col">Date</th>
                      <th className="day-col">Day</th>
                      <th className="shift-col">Shift</th>
                      <th className="emp-col">E1</th>
                      <th className="emp-col">E2</th>
                      <th className="emp-col">E3</th>
                      <th className="emp-col">E4</th>
                      <th className="emp-col">E5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.map((day, dayIndex) => (
                      <React.Fragment key={day.date}>
                        {day.shifts.map((shift, shiftIndex) => (
                          <tr key={`${day.date}-${shift.shift}`} className="roster-row">
                            {shiftIndex === 0 && (
                              <>
                                <td rowSpan={2} className="date-cell"><strong>{day.date}</strong></td>
                                <td rowSpan={2} className="day-cell">{day.dayName}</td>
                              </>
                            )}
                            <td className="shift-cell">{shift.shift}</td>
                            {shift.employees.map((emp, empIndex) => (
                              <td key={empIndex} className="emp-cell">
                                <select
                                  className="form-select form-select-sm shadow-sm"
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
            )}

            {/* Buttons */}
            {roster.length > 0 && (
              <div className="mt-4 d-flex gap-3 justify-content-center">
                <button className="btn btn-secondary px-4 rounded-pill shadow-sm" onClick={resetRoster}>
                  Reset
                </button>
                <button className="btn btn-success px-4 rounded-pill shadow-sm" onClick={submitRoster}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>

      {/* Video Background CSS */}
      <style jsx>{`
        .video-background-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -2;
        }
        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%);
          z-index: -1;
        }
        .content-overlay {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .roster-container {
          max-width: 1600px;
          margin: 0 auto;
        }
        .date-col, .day-col {
          width: 12%;
          background-color: #f8f9fa;
        }
        .shift-col {
          width: 10%;
          background-color: #e9f0ff;
        }
        .emp-col {
          width: 9%;
        }
        .roster-row:hover {
          background-color: #f8f9ff;
        }
        .date-cell, .day-cell, .shift-cell, .emp-cell {
          padding: 12px 8px;
        }
        .table-primary {
          --bs-table-bg: #cfe2ff;
          --bs-table-striped-bg: #c5d7f2;
          --bs-table-striped-color: #000;
          --bs-table-active-bg: #bacbe6;
          --bs-table-active-color: #000;
          --bs-table-hover-bg: #bfd1ec;
          --bs-table-hover-color: #000;
          color: #000;
          border-color: #bacbe6;
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
        }
        .form-control, .form-select {
          border: 1px solid #ced4da;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .form-control:focus, .form-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </div>
  );
};

export default RosterManagement;
