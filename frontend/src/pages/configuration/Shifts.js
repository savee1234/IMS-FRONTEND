import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Shifts = () => {
  const [shiftName, setShiftName] = useState('');
  const [fromHours, setFromHours] = useState('09');
  const [fromMinutes, setFromMinutes] = useState('00');
  const [fromAmPm, setFromAmPm] = useState('AM');
  const [toHours, setToHours] = useState('05');
  const [toMinutes, setToMinutes] = useState('00');
  const [toAmPm, setToAmPm] = useState('PM');
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  
  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  const fetchShifts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/shifts`);
      const data = await res.json();
      if (data.success) {
        setShifts(data.data);
      } else {
        setError(data.message || 'Failed to fetch shifts');
      }
    } catch (e) {
      console.error('Error fetching shifts:', e);
      setError('Failed to load shifts');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shiftName.trim()) {
      setError('Shift name is required');
      return;
    }
    const fromTime = `${fromHours}:${fromMinutes} ${fromAmPm}`;
    const toTime = `${toHours}:${toMinutes} ${toAmPm}`;

    setLoading(true);
    setError('');
    try {
      const url = editMode ? `${API_BASE_URL}/api/shifts/${editingId}` : `${API_BASE_URL}/api/shifts`;
      const method = editMode ? 'PUT' : 'POST';
      const body = editMode
        ? { name: shiftName.trim(), fromTime, toTime }
        : { name: shiftName.trim(), fromTime, toTime, createdBy: 'current_user', createdByName: 'Current User' };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        await fetchShifts();
        handleReset();
      } else {
        setError(data.message || 'Failed to save shift');
      }
    } catch (e) {
      console.error('Error saving shift:', e);
      setError('Failed to save shift');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShiftName('');
    setFromHours('09');
    setFromMinutes('00');
    setFromAmPm('AM');
    setToHours('05');
    setToMinutes('00');
    setToAmPm('PM');
    setEditMode(false);
    setEditingId(null);
    setError('');
  };

  const handleEdit = (shift) => {
    setShiftName(shift.name);
    // Parse times like "09:00 AM"
    const [fh, fmampm] = shift.fromTime.split(':');
    const [fm, fampm] = fmampm.trim().split(' ');
    setFromHours(fh.padStart(2, '0'));
    setFromMinutes(fm);
    setFromAmPm(fampm);
    const [th, tmampm] = shift.toTime.split(':');
    const [tm, tampm] = tmampm.trim().split(' ');
    setToHours(th.padStart(2, '0'));
    setToMinutes(tm);
    setToAmPm(tampm);
    setEditMode(true);
    setEditingId(shift._id);
  };

  const handleView = (shift) => {
    setSelectedShift(shift);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedShift(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shift?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/shifts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endedBy: 'current_user', endedByName: 'Current User' })
      });
      const data = await res.json();
      if (data.success) {
        await fetchShifts();
      } else {
        setError(data.message || 'Failed to delete shift');
      }
    } catch (e) {
      console.error('Error deleting shift:', e);
      setError('Failed to delete shift');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Shift Details Modal */}
      {viewModalOpen && selectedShift && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={styles.modalHeaderIcon}>⏱️</div>
                <div>
                  <h3 style={styles.modalTitle}>Shift Details</h3>
                  <p style={styles.modalSubtitle}>{selectedShift.name}</p>
                </div>
              </div>
              <button onClick={closeViewModal} style={styles.modalCloseBtn} aria-label="Close details">✕</button>
            </div>

            {/* Modal Body */}
            <div style={styles.modalBody}>
              <div style={styles.modalGrid}>
                {/* Shift Info */}
                <div style={styles.infoCardPrimary}>
                  <h4 style={styles.infoTitle}>Shift Information</h4>
                  <div style={styles.infoList}>
                    <div style={styles.infoRow}><span style={styles.infoLabel}>Shift Name:</span><span style={styles.infoValue}>{selectedShift.name}</span></div>
                    <div style={styles.infoRow}><span style={styles.infoLabel}>Start Time:</span><span style={styles.infoValue}>{selectedShift.fromTime}</span></div>
                    <div style={styles.infoRow}><span style={styles.infoLabel}>To Time:</span><span style={styles.infoValue}>{selectedShift.toTime}</span></div>
                    {selectedShift.shiftId && (
                      <div style={styles.infoRow}><span style={styles.infoLabel}>Shift ID:</span><span style={styles.infoValue}>{selectedShift.shiftId}</span></div>
                    )}
                  </div>
                </div>

                {/* Record Info */}
                <div style={styles.infoCardSecondary}>
                  <h4 style={styles.infoTitle}>Record Information</h4>
                  <div style={styles.infoList}>
                    <div style={styles.infoRow}><span style={styles.infoLabel}>Created By:</span><span style={styles.infoValue}>{selectedShift.createdByName}</span></div>
                    <div style={styles.infoRow}><span style={styles.infoLabel}>Created Date:</span><span style={styles.infoValue}>
                      {selectedShift.createdDtm ? (
                        <>
                          {new Date(selectedShift.createdDtm).toLocaleDateString()}&nbsp;&nbsp;
                          {new Date(selectedShift.createdDtm).toLocaleTimeString()}
                        </>
                      ) : '-'}
                    </span></div>
                    {!selectedShift.isActive && (
                      <>
                        <div style={styles.infoRow}><span style={styles.infoLabel}>Ended By:</span><span style={styles.infoValue}>{selectedShift.endedByName || '-'}</span></div>
                        <div style={styles.infoRow}><span style={styles.infoLabel}>Ended Date:</span><span style={styles.infoValue}>
                          {selectedShift.endDtm ? (
                            <>
                              {new Date(selectedShift.endDtm).toLocaleDateString()}&nbsp;&nbsp;
                              {new Date(selectedShift.endDtm).toLocaleTimeString()}
                            </>
                          ) : '-'}
                        </span></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={styles.modalFooter}>
              <button
                onClick={() => { closeViewModal(); handleEdit(selectedShift); }}
                style={styles.primaryBtn}
              >
                Edit Shift
              </button>
              <button onClick={closeViewModal} style={styles.secondaryBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div style={styles.formSection}>
        <div style={styles.addHeader}>
          <h3 style={styles.cardTitle}>Add Shift Time</h3>
          <div style={styles.headerAccent} />
        </div>
        <div style={styles.formRow}>
          <div style={styles.shiftNameContainer}>
            <label style={styles.label}>Shift Name</label>
            <input
              type="text"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              style={styles.input}
              placeholder="Enter shift name"
            />
          </div>

          <div style={styles.timeContainer}>
            <div style={styles.timeGroup}>
              <label style={styles.label}>From Time</label>
              <div style={styles.timeInputs}>
                <select 
                  value={fromHours} 
                  onChange={(e) => setFromHours(e.target.value)}
                  style={styles.timeSelect}
                >
                  {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={`from-${hour}`} value={hour}>{hour}</option>
                  ))}
                </select>
                <span style={styles.timeSeparator}>:</span>
                <select 
                  value={fromMinutes} 
                  onChange={(e) => setFromMinutes(e.target.value)}
                  style={styles.timeSelect}
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={`from-min-${minute}`} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={fromAmPm} 
                  onChange={(e) => setFromAmPm(e.target.value)}
                  style={styles.ampmSelect}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div style={styles.timeGroup}>
              <label style={styles.label}>To Time</label>
              <div style={styles.timeInputs}>
                <select 
                  value={toHours} 
                  onChange={(e) => setToHours(e.target.value)}
                  style={styles.timeSelect}
                >
                  {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={`to-${hour}`} value={hour}>{hour}</option>
                  ))}
                </select>
                <span style={styles.timeSeparator}>:</span>
                <select 
                  value={toMinutes} 
                  onChange={(e) => setToMinutes(e.target.value)}
                  style={styles.timeSelect}
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={`to-min-${minute}`} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={toAmPm} 
                  onChange={(e) => setToAmPm(e.target.value)}
                  style={styles.ampmSelect}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <div className="action-buttons-group">
            <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
            <button type="submit" onClick={handleSubmit} disabled={loading} className="btn btn-primary">{loading ? 'Saving...' : (editMode ? 'Update' : 'Save')}</button>
          </div>
        </div>
      </div>

      <div style={styles.tableSection}>
        <div style={styles.listSection}>
          <div style={styles.addHeader}>
            <h3 style={styles.cardTitle}>Shift List</h3>
            <div style={styles.headerAccent} />
          </div>
          <div className="table-container" style={{ marginTop: '1rem' }}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Shift Name</th>
                  <th>Start Time</th>
                  <th>To Time</th>
                  <th>Created By Name</th>
                  <th>Created DTM</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shifts.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No shifts found</td>
                  </tr>
                ) : (
                  shifts.map((shift) => (
                    <tr key={shift._id}>
                      <td>{shift.name}</td>
                      <td>{shift.fromTime}</td>
                      <td>{shift.toTime}</td>
                      <td>{shift.createdByName}</td>
                      <td>
                        {shift.createdDtm ? (
                          <>
                            {new Date(shift.createdDtm).toLocaleDateString()}
                            {'\u00A0\u00A0'}
                            {new Date(shift.createdDtm).toLocaleTimeString()}
                          </>
                        ) : ''}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button onClick={() => handleView(shift)} className="btn btn-sm" style={{ backgroundColor: '#4CAF50', color: '#fff' }} title="View">View</button>
                          <button onClick={() => handleEdit(shift)} className="btn btn-sm" style={{ backgroundColor: '#FFB300', color: '#fff' }} title="Update"><FaEdit /></button>
                          <button onClick={() => handleDelete(shift._id)} className="btn btn-sm" style={{ backgroundColor: '#F44336', color: '#fff' }} title="Delete">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'inherit',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    padding: '20px 30px',
    fontSize: '14px'
  },
  cardHeader: {
    padding: '12px 16px 0',
    borderBottom: '0',
    backgroundColor: '#ffffff'
  },
  addHeader: {
    padding: '12px 8px 0'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '0 10px'
  },
  cardTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#000'
  },
  tableWrapper: {
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
    overflow: 'hidden'
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)'
  },
  tableSection: {
    marginTop: '24px'
  },
  listSection: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
    border: '1px solid #eef2f7',
    marginBottom: '24px',
    width: '100%'
  },
  formRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '30px',
    marginBottom: '30px',
    flexWrap: 'nowrap',
    padding: '20px 0'
  },
  shiftNameContainer: {
    flex: '0 0 200px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  timeContainer: {
    display: 'flex',
    gap: '40px',
    flex: '1',
    minWidth: '500px',
    paddingLeft: '30px',
    borderLeft: '1px solid #eee'
  },
  timeGroup: {
    flex: '1',
    minWidth: '180px'
  },
  timeInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  timeSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    flex: 1
  },
  ampmSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '70px'
  },
  timeSeparator: {
    fontSize: '16px',
    margin: '0 2px'
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    paddingTop: '25px',
    marginTop: '20px',
    borderTop: '1px solid #eee'
  },
  resetButton: {
    padding: '8px 20px',
    backgroundColor: '#6b7280',
    border: '1px solid #6b7280',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'white',
    marginRight: '10px'
  },
  saveButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#1976D2'
    }
  },
  tableResponsive: {
    width: '100%',
    overflowX: 'auto',
    padding: '0 16px 16px',
    marginTop: '24px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    backgroundColor: '#fff',
    border: '1px solid #e3e8ef'
  },
  th: {
    backgroundColor: '#1a237e',
    color: '#ffffff',
    fontWeight: '600',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #e3e8ef',
    borderRight: '1px solid #e3e8ef',
    whiteSpace: 'nowrap'
  },
  thFirst: {
    borderLeft: '1px solid #e3e8ef'
  },
  thLast: {
    borderRight: '1px solid #e3e8ef'
  },
  thCenter: {
    textAlign: 'center'
  },
  tr: {
    borderBottom: '1px solid #e3e8ef'
  },
  td: {
    padding: '12px 15px',
    color: '#333',
    verticalAlign: 'middle',
    borderRight: '1px solid #e3e8ef'
  },
  tdFirst: {
    borderLeft: '1px solid #e3e8ef'
  },
  tdLast: {
    borderRight: '1px solid #e3e8ef'
  },
  tdBlack: {
    color: '#000'
  },
  tdAction: {
    textAlign: 'center'
  },
  dtmTime: {
    marginLeft: '16px'
  },
  tdCenter: {
    textAlign: 'center'
  },
  tableHeaderRow: {
    borderBottom: '2px solid #dee2e6'
  },
  actionIcons: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 8px',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: { backgroundColor: '#10b981' },
  editBtn: { backgroundColor: '#FFB300' },
  deleteBtn: { backgroundColor: '#F44336' }
};

// Add modal styles to match the Organization Contact Person view theme
styles.modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '1rem'
};

styles.modalBox = {
  backgroundColor: 'white',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  border: '1px solid #e5e7eb'
};

styles.modalHeader = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '1.5rem',
  borderRadius: '12px 12px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

styles.modalHeaderIcon = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

styles.modalTitle = { margin: 0, fontSize: '1.25rem', fontWeight: '600' };
styles.modalSubtitle = { margin: 0, fontSize: '0.875rem', opacity: 0.9 };

styles.modalCloseBtn = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  border: 'none',
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white'
};

styles.modalBody = { padding: '2rem' };

styles.modalGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  marginBottom: '2rem'
};

styles.infoCardPrimary = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '1.5rem',
  border: '1px solid #e2e8f0'
};

styles.infoCardSecondary = {
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  padding: '1.5rem',
  border: '1px solid #fde68a'
};

styles.infoTitle = {
  margin: '0 0 1rem 0',
  color: '#1e293b',
  fontSize: '1.1rem',
  fontWeight: '600'
};

styles.infoList = { display: 'flex', flexDirection: 'column', gap: '0.75rem' };
styles.infoRow = { display: 'flex', alignItems: 'center', gap: '0.75rem' };
styles.infoLabel = { fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' };
styles.infoValue = { margin: 0, color: '#1f2937', fontWeight: '600' };

styles.modalFooter = {
  borderTop: '1px solid #e5e7eb',
  padding: '1.5rem',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  backgroundColor: '#f8fafc',
  borderRadius: '0 0 12px 12px'
};

styles.primaryBtn = {
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '0.75rem 1.5rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

styles.secondaryBtn = {
  backgroundColor: '#6b7280',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '0.75rem 1.5rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  cursor: 'pointer'
};

export default Shifts;
