import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "../complaint/ComplaintForm.css";
import { FaEye, FaEdit } from "react-icons/fa";
 

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  // Fetch rosters from backend
  const fetchRosters = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const url = month 
        ? `${API_BASE_URL}/api/rosters?month=${month}`
        : `${API_BASE_URL}/api/rosters`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setRosters(data.data);
      } else {
        setError(data.message || 'Failed to fetch rosters');
      }
    } catch (error) {
      console.error('Error fetching rosters:', error);
      setError('Failed to load rosters');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, month]);

  // Load rosters on component mount and when month changes
  useEffect(() => {
    fetchRosters();
  }, [fetchRosters]);

  const filteredRosters = rosters; // Backend filtering is now handled by the API

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

  const handleSaveUpdate = async () => {
    setLoading(true);
    setError('');
    
    try {
      const updateData = {
        rosterName: editForm.rosterName,
        data: editData
      };
      
      const response = await fetch(`${API_BASE_URL}/api/rosters/${editingRoster._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchRosters(); // Refresh the list
        setEditingRoster(null);
        setError('');
      } else {
        setError(data.message || 'Failed to update roster');
      }
    } catch (error) {
      console.error('Error updating roster:', error);
      setError('Failed to update roster');
    } finally {
      setLoading(false);
    }
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
    <div className="ma-wrapper">
      <Sidebar />
      <div className="ma-content">
        <div className="ma-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Rosters</h1>
          <button type="button" className="ma-btn-submit" onClick={() => navigate('/roster')}>
            <FaEdit style={{ marginRight: '8px' }} />
            Create Roster
          </button>
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
                setCurrentPage(1);
              }}
              className="ma-input"
              disabled={loading}
            />
          </div>
        </div>

        {!selectedRoster && !editingRoster && (
          <div className="ma-table-card">
            <div className="ma-table-container">
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>Roster Name</th>
                    <th>Month</th>
                    <th>Created By</th>
                    <th>Created By Name</th>
                    <th>Created DTM</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRosters.length > 0 ? (
                    currentRosters.map((roster) => (
                      <tr key={roster._id}>
                        <td>{roster.rosterName}</td>
                        <td>
                          {new Date(roster.month + "-01").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </td>
                        <td>{roster.createdBy}</td>
                        <td>{roster.createdByName}</td>
                        <td>{new Date(roster.createdDtm).toLocaleString()}</td>
                        <td>
                          <div className="ma-actions">
                            <button
                              className="ma-btn-action ma-btn-view"
                              title="View"
                              onClick={() => handleViewRoster(roster)}
                              disabled={loading}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="ma-btn-action ma-btn-edit"
                              title="Update"
                              onClick={() => handleUpdateRoster(roster)}
                              disabled={loading}
                            >
                              <FaEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                        No rosters available
                        {month
                          ? ` for ${new Date(month + "-01").toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })}`
                          : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="ma-footer-row">
              <button
                className="ma-pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
              >
                &lt; Previous
              </button>
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Page {currentPage} of {Math.max(1, totalPages)}</span>
              <button
                className="ma-pagination-btn next"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}

            {/* Roster Details View */}
            {selectedRoster && !editingRoster && (
              <div className="ma-table-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                    Roster Details - {selectedRoster.rosterName}
                  </h3>
                  <button className="ma-pagination-btn" onClick={() => setSelectedRoster(null)}>
                    Back to List
                  </button>
                </div>

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
                    {selectedRoster.data.map((day, dayIndex) => (
                      <React.Fragment key={day.date}>
                        {day.shifts.map((shift, shiftIndex) => (
                          <tr key={`${day.date}-${shift.shift}`}>
                            {shiftIndex === 0 && (
                              <>
                                <td rowSpan={2} style={{
                                  padding: '1rem',
                                  border: '1px solid #d1d5db',
                                  color: '#374151'
                                }}>
                                  {new Date(day.date).toLocaleDateString("en-GB")}
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
                            }}>{shift.shift}</td>
                            {shift.employees.map((emp, empIndex) => (
                            <td key={empIndex} style={{
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              textAlign: 'center',
                              color: '#374151'
                            }}>
                              {emp || "Not Assigned"}
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

            {/* Roster Update Form */}
            {editingRoster && (
              <div className="ma-table-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                    Update Roster - {editingRoster.rosterName}
                  </h3>
                  <div>
                    <button className="ma-pagination-btn next" onClick={handleSaveUpdate} disabled={loading}>
                      Save Changes
                    </button>
                    <button className="ma-pagination-btn" onClick={() => setEditingRoster(null)}>
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Update Form Fields */}
                <div className="ma-filter-card" style={{ flexWrap: 'wrap' }}>
                  <div className="ma-filter-group">
                    <label className="ma-label">Roster Name</label>
                    <input
                      className="ma-input"
                      type="text"
                      value={editForm.rosterName}
                      onChange={(e) => setEditForm({ ...editForm, rosterName: e.target.value })}
                    />
                  </div>
                  <div className="ma-filter-group">
                    <label className="ma-label">Created By Name</label>
                    <input
                      className="ma-input"
                      type="text"
                      value={editForm.createdByName}
                      onChange={(e) => setEditForm({ ...editForm, createdByName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Editable Roster Table */}
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
                    {editData.map((day, dayIndex) => (
                      <React.Fragment key={day.date}>
                        {day.shifts.map((shift, shiftIndex) => (
                          <tr key={`${day.date}-${shift.shift}`}>
                            {shiftIndex === 0 && (
                              <>
                                <td rowSpan={2} style={{
                                  padding: '1rem',
                                  border: '1px solid #d1d5db',
                                  color: '#374151'
                                }}>
                                  {new Date(day.date).toLocaleDateString("en-GB")}
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
                            <td>{shift.shift}</td>
                            {shift.employees.map((emp, empIndex) => (
                              <td key={empIndex}>
                                <select
                                  className="ma-select"
                                  value={emp}
                                  onChange={(e) =>
                                    handleEmployeeSelectEdit(
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
          </div>
      <Footer />
    </div>
  );
};

export default RosterView;
