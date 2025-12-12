import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaSearch, FaTimes, FaClock, FaInfoCircle, FaUser, FaCalendarAlt } from 'react-icons/fa';

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
  const [searchTerm, setSearchTerm] = useState('');
  
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
    try {
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
    } catch (e) {
      console.error("Error parsing time", e);
    }
    
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

  // Filter data based on search term
  const filteredShifts = shifts.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.createdByName && item.createdByName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="shifts-section">
      {/* View Modal */}
      {viewModalOpen && selectedShift && (
        <div className="conf-modal-overlay">
          <div className="conf-modal">
            <div className="conf-modal-header">
              <h3 className="conf-modal-title">Shift Details</h3>
              <button onClick={closeViewModal} className="conf-modal-close">
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="conf-modal-body">
              <div className="conf-modal-section">
                <h4 className="conf-modal-section-title">Basic Info</h4>
                <div className="conf-modal-detail">
                  <div className="conf-modal-detail-icon"><FaInfoCircle style={{ color: '#3b82f6' }} /></div>
                  <span className="conf-modal-detail-label">Name:</span>
                  <span className="conf-modal-detail-value">{selectedShift.name}</span>
                </div>
                <div className="conf-modal-detail">
                  <div className="conf-modal-detail-icon"><FaClock style={{ color: '#3b82f6' }} /></div>
                  <span className="conf-modal-detail-label">Time:</span>
                  <span className="conf-modal-detail-value">{selectedShift.fromTime} - {selectedShift.toTime}</span>
                </div>
              </div>

              <div className="conf-modal-section">
                <h4 className="conf-modal-section-title">Audit Info</h4>
                <div className="conf-modal-detail">
                  <div className="conf-modal-detail-icon"><FaUser style={{ color: '#10b981' }} /></div>
                  <span className="conf-modal-detail-label">Created By:</span>
                  <span className="conf-modal-detail-value">{selectedShift.createdByName}</span>
                </div>
                <div className="conf-modal-detail">
                  <div className="conf-modal-detail-icon"><FaCalendarAlt style={{ color: '#10b981' }} /></div>
                  <span className="conf-modal-detail-label">Date:</span>
                  <span className="conf-modal-detail-value">{selectedShift.createdDtm ? new Date(selectedShift.createdDtm).toLocaleString() : '-'}</span>
                </div>
              </div>
            </div>

            <div className="conf-modal-footer">
              <button 
                onClick={() => { closeViewModal(); handleEdit(selectedShift); }}
                className="conf-btn conf-btn-primary"
              >
                Edit
              </button>
              <button 
                onClick={closeViewModal}
                className="conf-btn conf-btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="conf-error-msg">
          {error}
        </div>
      )}

      {/* Add/Edit Shift Card */}
      <div className="conf-card">
        <div className="conf-card-header">
          <h2 className="conf-card-title">{editMode ? 'Update Shift Period' : 'Add New Shift Period'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="conf-form-group">
            <label className="conf-label">Shift Name</label>
            <input
              type="text"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              className="conf-input"
              placeholder="Enter shift name"
              required
            />
          </div>

          <div className="conf-grid-2">
            <div className="conf-form-group">
              <label className="conf-label">From Time</label>
              <div className="conf-flex-row">
                <select 
                  value={fromHours} 
                  onChange={(e) => setFromHours(e.target.value)}
                  className="conf-input"
                >
                  {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={`from-${hour}`} value={hour}>{hour}</option>
                  ))}
                </select>
                <select 
                  value={fromMinutes} 
                  onChange={(e) => setFromMinutes(e.target.value)}
                  className="conf-input"
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={`from-min-${minute}`} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={fromAmPm} 
                  onChange={(e) => setFromAmPm(e.target.value)}
                  className="conf-input conf-time-select"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div className="conf-form-group">
              <label className="conf-label">To Time</label>
              <div className="conf-flex-row">
                <select 
                  value={toHours} 
                  onChange={(e) => setToHours(e.target.value)}
                  className="conf-input"
                >
                  {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={`to-${hour}`} value={hour}>{hour}</option>
                  ))}
                </select>
                <select 
                  value={toMinutes} 
                  onChange={(e) => setToMinutes(e.target.value)}
                  className="conf-input"
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={`to-min-${minute}`} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={toAmPm} 
                  onChange={(e) => setToAmPm(e.target.value)}
                  className="conf-input conf-time-select"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="conf-actions">
            <button type="button" onClick={handleReset} className="conf-btn conf-btn-outline">Reset</button>
            <button type="submit" disabled={loading} className="conf-btn conf-btn-primary">
              {loading ? 'Processing...' : (editMode ? 'Update' : 'Submit')}
            </button>
          </div>
        </form>
      </div>

      {/* List Card */}
      <div className="conf-card">
        <div className="conf-search-container">
          <FaSearch className="conf-search-icon" />
          <input
            type="text"
            className="conf-search-input"
            placeholder="Search shifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="conf-table-container">
          <table className="conf-table">
            <thead>
              <tr>
                <th>SHIFT NAME</th>
                <th>START TIME</th>
                <th>END TIME</th>
                <th>CREATED BY</th>
                <th>CREATED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading && shifts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>Loading...</td>
                </tr>
              ) : filteredShifts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>No shifts found</td>
                </tr>
              ) : (
                filteredShifts.map((shift) => (
                  <tr key={shift._id}>
                    <td style={{ fontWeight: 500 }}>{shift.name}</td>
                    <td>{shift.fromTime}</td>
                    <td>{shift.toTime}</td>
                    <td>{shift.createdByName}</td>
                    <td>
                      {shift.createdDtm ? new Date(shift.createdDtm).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <button className="conf-action-btn conf-btn-view" title="View" onClick={() => handleView(shift)}>
                          <FaEye size={14} />
                        </button>
                        <button className="conf-action-btn conf-btn-edit" title="Edit" onClick={() => handleEdit(shift)}>
                          <FaEdit size={14} />
                        </button>
                        <button className="conf-action-btn conf-btn-delete" title="Delete" onClick={() => handleDelete(shift._id)}>
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="conf-pagination">
          <button className="conf-btn conf-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} disabled>
            &lt; Previous
          </button>
          <span className="conf-page-info">Page 1 of 1</span>
          <button className="conf-btn conf-btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shifts;
