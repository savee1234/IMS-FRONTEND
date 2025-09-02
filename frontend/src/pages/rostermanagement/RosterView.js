import React, { useState, useEffect } from "react";
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

const RosterView = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [rosters, setRosters] = useState([]);
  const [selectedRoster, setSelectedRoster] = useState(null);

  // For Update
  const [editingRoster, setEditingRoster] = useState(null);
  const [editForm, setEditForm] = useState({
    rosterName: "",
    month: "",
    createdByName: "",
  });
  const [editData, setEditData] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rostersPerPage = 5;

  // Load saved rosters from localStorage
  useEffect(() => {
    const savedRosters = JSON.parse(localStorage.getItem("rosters")) || [];
    setRosters(savedRosters);
  }, []);

  const filteredRosters = month ? rosters.filter((r) => r.month === month) : rosters;

  // Pagination calculations
  const indexOfLastRoster = currentPage * rostersPerPage;
  const indexOfFirstRoster = indexOfLastRoster - rostersPerPage;
  const currentRosters = filteredRosters.slice(indexOfFirstRoster, indexOfLastRoster);
  const totalPages = Math.ceil(filteredRosters.length / rostersPerPage);

  const handleViewRoster = (roster) => setSelectedRoster(roster);

  const handleUpdateRoster = (roster) => {
    setEditingRoster(roster);
    setEditForm({
      rosterName: roster.rosterName,
      month: roster.month,
      createdByName: roster.createdByName,
    });
    // Deep copy roster data for editing
    const copied = roster.data.map((day) => ({
      ...day,
      shifts: day.shifts.map((shift) => ({
        ...shift,
        employees: [...shift.employees],
      })),
    }));
    setEditData(copied);
  };

  const handleSaveUpdate = () => {
    const updatedRosters = rosters.map((r) =>
      r.id === editingRoster.id
        ? { ...r, ...editForm, data: editData, createdDTM: new Date().toLocaleString() }
        : r
    );
    setRosters(updatedRosters);
    localStorage.setItem("rosters", JSON.stringify(updatedRosters));
    setEditingRoster(null);
  };

  const handleEmployeeSelectEdit = (dayIndex, shiftIndex, empIndex, value) => {
    setEditData((prev) =>
      prev.map((day, dIdx) =>
        dIdx === dayIndex
          ? {
              ...day,
              shifts: day.shifts.map((shift, sIdx) =>
                sIdx === shiftIndex
                  ? {
                      ...shift,
                      employees: shift.employees.map((emp, eIdx) =>
                        eIdx === empIndex ? value : emp
                      ),
                    }
                  : shift
              ),
            }
          : day
      )
    );
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -2,
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

      <div style={{ position: "relative", zIndex: 1, padding: "2rem", marginTop: "4rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => navigate("/roster")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            ← Back
          </button>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#1f2937",
              borderBottom: "2px solid #3b82f6",
              paddingBottom: "0.5rem",
              margin: 0,
            }}
          >
            Roster View
          </h2>
        </div>

        {/* Month Filter */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Select Month
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "300px",
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "1rem",
              backgroundColor: "white",
            }}
          />
        </div>

        {/* Roster List */}
        {!selectedRoster && !editingRoster && (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Roster Name</th>
                  <th style={thStyle}>Month</th>
                  <th style={thStyle}>Created By</th>
                  <th style={thStyle}>Created By Name</th>
                  <th style={thStyle}>Created DTM</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRosters.length > 0 ? (
                  currentRosters.map((roster, index) => (
                    <tr
                      key={roster.id}
                      style={{ backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff" }}
                    >
                      <td style={tdStyle}>{roster.rosterName}</td>
                      <td style={tdStyle}>
                        {new Date(roster.month + "-01").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </td>
                      <td style={tdStyle}>{roster.createdBy}</td>
                      <td style={tdStyle}>{roster.createdByName}</td>
                      <td style={tdStyle}>{roster.createdDTM}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                          <button style={btnView} onClick={() => handleViewRoster(roster)}>
                            View
                          </button>
                          <button style={btnUpdate} onClick={() => handleUpdateRoster(roster)}>
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "1rem", color: "#6b7280" }}>
                      No rosters available
                      {month
                        ? ` for ${new Date(month + "-01").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}`
                        : ""}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      margin: "0 0.25rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      border: currentPage === page ? "2px solid #3b82f6" : "1px solid #d1d5db",
                      backgroundColor: currentPage === page ? "#3b82f6" : "white",
                      color: currentPage === page ? "white" : "#374151",
                      cursor: "pointer",
                    }}
                  >
                    {page}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{
                      marginLeft: "0.5rem",
                      padding: "0.5rem 1rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    &gt;&gt;
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Detailed Roster View */}
        {selectedRoster && !editingRoster && (
          <div>
            <button
              onClick={() => setSelectedRoster(null)}
              style={{
                padding: "0.5rem 1rem",
                marginBottom: "1rem",
                backgroundColor: "#6b7280",
                color: "white",
                borderRadius: "4px",
              }}
            >
              ← Back to Rosters
            </button>

            <h3 style={{ marginBottom: "1rem" }}>{selectedRoster.rosterName}</h3>

            {/* Show All Employees */}
            <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f3f4f6", borderRadius: "6px" }}>
              <strong>All Employees:</strong>{" "}
              {Array.from(
                new Set(
                  selectedRoster.data.flatMap((day) =>
                    day.shifts.flatMap((shift) => shift.employees.filter(Boolean))
                  )
                )
              ).join(", ") || "No employees"}
            </div>

            {/* Daily shifts */}
            {selectedRoster.data.map((day) => (
              <div
                key={day.date}
                style={{
                  marginBottom: "1.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  backgroundColor: "#f9fafb",
                  padding: "0.5rem",
                }}
              >
                <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                  {new Date(day.date).toLocaleDateString("en-GB")} - {day.dayName}
                </strong>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#e5e7eb" }}>
                      <th style={thStyle}>Shift</th>
                      <th style={thStyle}>E1</th>
                      <th style={thStyle}>E2</th>
                      <th style={thStyle}>E3</th>
                      <th style={thStyle}>E4</th>
                      <th style={thStyle}>E5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.shifts.map((shift) => (
                      <tr key={shift.shift}>
                        <td style={tdStyle}>{shift.shift}</td>
                        {[...Array(5)].map((_, i) => (
                          <td key={i} style={tdStyle}>
                            {shift.employees[i] || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* Update Editor (mirrors Add Roster) */}
        {editingRoster && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <button onClick={() => setEditingRoster(null)} style={btnCancel}>← Back</button>
              <h3 style={{ margin: 0 }}>Update Roster</h3>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                padding: "2rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Roster Name</label>
                  <input
                    type="text"
                    value={editForm.rosterName}
                    onChange={(e) => setEditForm({ ...editForm, rosterName: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Month</label>
                  <input
                    type="month"
                    value={editForm.month}
                    onChange={(e) => setEditForm({ ...editForm, month: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Created By Name</label>
                  <input
                    type="text"
                    value={editForm.createdByName}
                    onChange={(e) => setEditForm({ ...editForm, createdByName: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              {editData && editData.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #d1d5db" }}>
                  <thead>
                    <tr style={{ background: "#f3f4f6" }}>
                      <th style={thStyle}>Date</th>
                      <th style={thStyle}>Day</th>
                      <th style={thStyle}>Shift</th>
                      {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                        <th key={col} style={thStyle}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {editData.map((day, dayIndex) => (
                      <React.Fragment key={day.date}>
                        {day.shifts.map((shift, shiftIndex) => (
                          <tr key={`${day.date}-${shift.shift}`}>
                            {shiftIndex === 0 && (
                              <>
                                <td rowSpan={2} style={tdStyle}>{new Date(day.date).toLocaleDateString("en-GB")}</td>
                                <td rowSpan={2} style={tdStyle}>{day.dayName}</td>
                              </>
                            )}
                            <td style={tdStyle}>{shift.shift}</td>
                            {shift.employees.map((emp, empIndex) => (
                              <td key={empIndex} style={tdStyle}>
                                <select
                                  value={emp}
                                  onChange={(e) =>
                                    handleEmployeeSelectEdit(dayIndex, shiftIndex, empIndex, e.target.value)
                                  }
                                  style={{ width: "100%", padding: "0.3rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                                >
                                  <option value="">Select</option>
                                  {employees.map((employee, i) => (
                                    <option key={i} value={employee}>{employee}</option>
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

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", gap: "0.5rem" }}>
                <button onClick={() => setEditingRoster(null)} style={btnCancel}>Cancel</button>
                <button onClick={handleSaveUpdate} style={btnSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

/* ✅ Table Styles */
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #d1d5db",
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const thStyle = {
  padding: "0.8rem",
  border: "1px solid #d1d5db",
  textAlign: "center",
  backgroundColor: "#f3f4f6",
  fontWeight: "600",
};

const tdStyle = {
  padding: "0.6rem",
  border: "1px solid #d1d5db",
  textAlign: "center",
};

const btnView = {
  padding: "0.5rem 1rem",
  backgroundColor: "#3b82f6",
  color: "white",
  borderRadius: "4px",
  border: "none",
};

const btnUpdate = {
  padding: "0.5rem 1rem",
  backgroundColor: "#10b981",
  color: "white",
  borderRadius: "4px",
  border: "none",
};

const btnCancel = {
  padding: "0.5rem 1rem",
  backgroundColor: "#6b7280",
  color: "white",
  borderRadius: "4px",
  border: "none",
};

const btnSave = {
  padding: "0.5rem 1rem",
  backgroundColor: "#10b981",
  color: "white",
  borderRadius: "4px",
  border: "none",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
};

const modalBox = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "400px",
};

const labelStyle = { display: "block", marginTop: "0.5rem", fontWeight: "500" };
const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  marginBottom: "0.5rem",
};

export default RosterView;