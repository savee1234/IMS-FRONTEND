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

  // ✅ Generate Month Data
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

  // ✅ Handle Employee Selection
  const handleEmployeeSelect = (dayIndex, shiftIndex, empIndex, value) => {
    const updated = [...roster];
    updated[dayIndex].shifts[shiftIndex].employees[empIndex] = value;
    setRoster(updated);
  };

  // ✅ Reset Roster
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

  // ✅ Submit Roster
  const submitRoster = () => {
    if (!month || roster.length === 0) {
      alert("⚠ Please select a month and add roster details before submitting.");
      return;
    }

    const existingRosters = JSON.parse(localStorage.getItem("rosters")) || [];

    const newRoster = {
      id: Date.now(),
      rosterName: `${new Date(month + "-01").toLocaleString("en-US", {
        month: "long",
      })} Roster`,
      month,
      createdBy: "EMP001",
      createdByName: "John Doe",
      createdDTM: new Date().toLocaleString(),
      data: roster,
    };

    const updatedRosters = [...existingRosters, newRoster];
    localStorage.setItem("rosters", JSON.stringify(updatedRosters));

    alert("✅ Roster saved successfully!");
    navigate("/roster-view");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Blur Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          zIndex: -1,
        }}
      ></div>

      <Navbar />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          marginTop: "4rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#1f2937",
              borderBottom: "2px solid #3b82f6",
              paddingBottom: "0.5rem",
            }}
          >
            Create Roster
          </h2>
          <button
            onClick={() => navigate("/roster-view")}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#10b981",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          >
            View Rosters
          </button>
        </div>

        {/* Form Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            marginBottom: "2rem",
          }}
        >
          {/* Month Picker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <label
              style={{
                fontWeight: "600",
                color: "#374151",
                fontSize: "1rem",
              }}
            >
              Select Month
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                generateMonthData(e.target.value);
              }}
              style={{
                width: "300px", // ✅ Same size as RosterView
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "white",
              }}
            />
          </div>

          {/* Roster Table */}
          {roster.length > 0 && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #d1d5db",
                marginBottom: "1.5rem",
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Day</th>
                  <th style={thStyle}>Shift</th>
                  {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                    <th key={col} style={thStyle}>
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
                            <td rowSpan={2} style={tdStyle}>
                              {new Date(day.date).toLocaleDateString("en-GB")}
                            </td>
                            <td rowSpan={2} style={tdStyle}>
                              {day.dayName}
                            </td>
                          </>
                        )}
                        <td style={tdStyle}>{shift.shift}</td>
                        {shift.employees.map((emp, empIndex) => (
                          <td key={empIndex} style={tdStyle}>
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
                                width: "100%",
                                padding: "0.3rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "4px",
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
          )}

          {/* Action Buttons */}
          {roster.length > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button
                onClick={resetRoster}
                style={{
                  padding: "0.6rem 1.2rem",
                  background: "#6b7280",
                  color: "#fff",
                  borderRadius: "6px",
                }}
              >
                Reset
              </button>
              <button
                onClick={submitRoster}
                style={{
                  padding: "0.6rem 1.2rem",
                  background: "#3b82f6",
                  color: "#fff",
                  borderRadius: "6px",
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

const thStyle = {
  padding: "0.8rem",
  border: "1px solid #d1d5db",
  textAlign: "center",
};

const tdStyle = {
  padding: "0.5rem",
  border: "1px solid #d1d5db",
  textAlign: "center",
};

export default RosterManagement;