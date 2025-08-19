import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundVideo from "../assets/Background.mp4";

const employees = [//dajhfjkasdfkkd
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

      {/* Overlay Content */}
      <div className="content-overlay d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 p-4">
          <div className="container">
            {/* Header with Roster View Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-primary mb-0"> Create Roster</h2>
              <button
                onClick={handleRosterView}
                className="btn btn-info px-4 py-2"
              >
              Roster View
              </button>
            </div>

            {/* Month Picker */}
            <div className="mb-4">
              <label className="form-label fw-bold">Month</label>
              <input
                type="month"
                className="form-control w-25"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  generateMonthData(e.target.value);
                }}
              />
            </div>

            {/* Roster Table */}
            {roster.length > 0 && (
              <div className="table-responsive shadow-sm rounded bg-white p-2">
                <table className="table table-bordered text-center align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Shift</th>
                      <th>E1</th>
                      <th>E2</th>
                      <th>E3</th>
                      <th>E4</th>
                      <th>E5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.map((day, dayIndex) => (
                      <React.Fragment key={day.date}>
                        {day.shifts.map((shift, shiftIndex) => (
                          <tr key={`${day.date}-${shift.shift}`}>
                            {shiftIndex === 0 && (
                              <>
                                <td rowSpan={2}>{day.date}</td>
                                <td rowSpan={2}>{day.dayName}</td>
                              </>
                            )}
                            <td>{shift.shift}</td>
                            {shift.employees.map((emp, empIndex) => (
                              <td key={empIndex}>
                                <select
                                  className="form-select"
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
              <div className="mt-4 d-flex gap-3">
                <button className="btn btn-secondary" onClick={resetRoster}>
                   Reset
                </button>
                <button className="btn btn-success" onClick={submitRoster}>
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
          position: absolute;
          top: 50%;
          left: 50%;
          width: auto;
          height: 100%;
          min-width: 100%;
          min-height: 100%;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 0;
          opacity: 0.4;
        }
        .content-overlay {
          position: relative;
          z-index: 1;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default RosterManagement;
