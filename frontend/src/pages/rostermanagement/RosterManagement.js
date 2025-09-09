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
          padding: "2.5rem",
          marginTop: "1rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            padding: "1.5rem 2rem",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              color: "#ffffff",
              margin: 0,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Create Roster
          </h2>
          <button
            onClick={() => navigate("/roster-view")}
            style={{
              padding: "0.8rem 1.8rem",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              borderRadius: "10px",
              fontSize: "1.1rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.3)";
            }}
          >
            View Rosters
          </button>
        </div>

        {/* Form Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            padding: "2.5rem",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            marginBottom: "2rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Month Picker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2rem",
              background: "rgba(59, 130, 246, 0.05)",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid rgba(59, 130, 246, 0.1)",
            }}
          >
            <label
              style={{
                fontWeight: "600",
                color: "#1f2937",
                fontSize: "1rem",
                minWidth: "120px",
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
                width: "300px",
                padding: "1rem 1.2rem",
                border: "2px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "10px",
                fontSize: "1rem",
                backgroundColor: "white",
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.1)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow =
                  "0 4px 16px rgba(59, 130, 246, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(59, 130, 246, 0.2)";
                e.target.style.boxShadow =
                  "0 2px 8px rgba(59, 130, 246, 0.1)";
              }}
            />
          </div>

          {/* Roster Table */}
          {roster.length > 0 && (
            <div
              style={{
                overflowX: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
                backgroundColor: "white",
                padding: "1rem",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #d1d5db",
                  marginBottom: "1.5rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      color: "white",
                    }}
                  >
                    <th style={headerStyle}>Date</th>
                    <th style={headerStyle}>Day</th>
                    <th style={headerStyle}>Shift</th>
                    {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                      <th key={col} style={headerStyle}>
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
                                  padding: "0.5rem",
                                  border: "2px solid rgba(59, 130, 246, 0.2)",
                                  borderRadius: "8px",
                                  fontSize: "0.9rem",
                                  backgroundColor: "white",
                                  transition: "all 0.3s ease",
                                  outline: "none",
                                  cursor: "pointer",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = "#3b82f6";
                                  e.target.style.boxShadow =
                                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor =
                                    "rgba(59, 130, 246, 0.2)";
                                  e.target.style.boxShadow = "none";
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
            </div>
          )}

          {/* Action Buttons */}
          {roster.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1.5rem",
                marginTop: "2rem",
                padding: "1.5rem",
                background: "rgba(59, 130, 246, 0.03)",
                borderRadius: "12px",
                border: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              <button
                onClick={resetRoster}
                style={resetBtnStyle}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(107, 114, 128, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(107, 114, 128, 0.3)";
                }}
              >
                Reset
              </button>
              <button
                onClick={submitRoster}
                style={submitBtnStyle}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(59, 130, 246, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(59, 130, 246, 0.3)";
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

const headerStyle = {
  ...thStyle,
  color: "white",
  fontWeight: "600",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  border: "none",
  padding: "1rem 0.8rem",
};

const resetBtnStyle = {
  padding: "0.8rem 1.8rem",
  background: "linear-gradient(135deg, #6b7280, #4b5563)",
  color: "#fff",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(107, 114, 128, 0.3)",
};

const submitBtnStyle = {
  padding: "0.8rem 1.8rem",
  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  color: "#fff",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
};

export default RosterManagement;
