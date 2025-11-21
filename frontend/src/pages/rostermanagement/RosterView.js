import React, { useState, useEffect } from "react";
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
  const fetchRosters = async () => {
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
  };

  // Load rosters on component mount and when month changes
  useEffect(() => {
    fetchRosters();
  }, [month]);

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
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
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
          <div className="roster-view-section" style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: '2rem',
              textAlign: 'left',
              borderBottom: '2px solid #3b82f6',
              paddingBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0 }}>Roster View</h2>
              <button
                onClick={() => navigate("/roster")}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: '1px solid #10b981',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back
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

            {/* Month Filter */}
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
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    width: '300px',
                    outline: 'none',
                    color: '#374151'
                  }}
                />
              </div>
            </div>

            {/* Roster List */}
            {!selectedRoster && !editingRoster && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid #d1d5db',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #d1d5db'
                }}>
                  <thead>
                    <tr>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Roster Name</th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Month</th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Created By</th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Created By Name</th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Created DTM</th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'center',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRosters.length > 0 ? (
                      currentRosters.map((roster, index) => (
                        <tr key={roster._id}>
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            color: '#374151'
                          }}>{roster.rosterName}</td>
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            color: '#374151'
                          }}>
                            {new Date(roster.month + "-01").toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })}
                          </td>
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            color: '#374151'
                          }}>{roster.createdBy}</td>
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            color: '#374151'
                          }}>{roster.createdByName}</td>
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            color: '#374151'
                          }}>{new Date(roster.createdDtm).toLocaleString()}</td>
                          <td style={{ 
                            padding: '1rem',
                            border: '1px solid #d1d5db',
                            textAlign: 'center'
                          }}>
                            <button
                              onClick={() => handleViewRoster(roster)}
                              style={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                padding: '6px 12px',
                                marginRight: '6px',
                                fontSize: '0.875rem'
                              }}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleUpdateRoster(roster)}
                              style={{
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                padding: '6px 12px',
                                fontSize: '0.875rem'
                              }}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ 
                          padding: '2rem', 
                          textAlign: 'center',
                          color: '#6b7280',
                          border: '1px solid #d1d5db'
                        }}>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          margin: '0 0.25rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          border: currentPage === page ? '2px solid #3b82f6' : '1px solid #d1d5db',
                          backgroundColor: currentPage === page ? '#3b82f6' : 'white',
                          color: currentPage === page ? 'white' : '#374151',
                          cursor: 'pointer'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        style={{
                          marginLeft: '0.5rem',
                          padding: '0.5rem 1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        &gt;&gt;
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Roster Details View */}
            {selectedRoster && !editingRoster && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid #d1d5db',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>Roster Details - {selectedRoster.rosterName}</h3>
                  <button
                    onClick={() => setSelectedRoster(null)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Back to List
                  </button>
                </div>

                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #d1d5db'
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Date</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Day</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Shift</th>
                      {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                        <th key={col} style={{
                          padding: '1rem',
                          textAlign: 'center',
                          border: '1px solid #d1d5db',
                          fontWeight: '600',
                          backgroundColor: '#1a237e',
                          color: '#ffffff'
                        }}>
                          {col}
                        </th>
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
                                border: '1px solid #d1d5db',
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
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid #d1d5db',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>Update Roster - {editingRoster.rosterName}</h3>
                  <div>
                    <button
                      onClick={handleSaveUpdate}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        marginRight: '0.5rem'
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingRoster(null)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Update Form Fields */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>Roster Name:</label>
                      <input
                        type="text"
                        value={editForm.rosterName}
                        onChange={(e) => setEditForm({ ...editForm, rosterName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>Created By Name:</label>
                      <input
                        type="text"
                        value={editForm.createdByName}
                        onChange={(e) => setEditForm({ ...editForm, createdByName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Editable Roster Table */}
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #d1d5db'
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Date</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Day</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        border: '1px solid #d1d5db',
                        fontWeight: '600',
                        backgroundColor: '#1a237e',
                        color: '#ffffff'
                      }}>Shift</th>
                      {["E1", "E2", "E3", "E4", "E5"].map((col) => (
                        <th key={col} style={{
                          padding: '1rem',
                          textAlign: 'center',
                          border: '1px solid #d1d5db',
                          fontWeight: '600',
                          backgroundColor: '#1a237e',
                          color: '#ffffff'
                        }}>
                          {col}
                        </th>
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
                            <td style={{
                              padding: '1rem',
                              border: '1px solid #d1d5db',
                              color: '#374151'
                            }}>{shift.shift}</td>
                            {shift.employees.map((emp, empIndex) => (
                              <td key={empIndex} style={{
                                padding: '1rem',
                                border: '1px solid #d1d5db',
                                textAlign: 'center'
                              }}>
                                <select
                                  value={emp}
                                  onChange={(e) =>
                                    handleEmployeeSelectEdit(
                                      dayIndex,
                                      shiftIndex,
                                      empIndex,
                                      e.target.value
                                    )
                                  }
                                  style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    backgroundColor: 'white',
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
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RosterView;