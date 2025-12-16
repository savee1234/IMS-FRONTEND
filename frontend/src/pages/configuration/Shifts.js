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
  const [filters, setFilters] = useState({ createdBy: '', fromDate: '', toDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  
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
  }, [fetchShifts]);

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
  const filteredShifts = shifts.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.createdByName && item.createdByName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCreatedBy = !filters.createdBy || item.createdByName === filters.createdBy;
    const createdDate = item.createdDtm ? new Date(item.createdDtm) : null;
    const fromOk = !filters.fromDate || (createdDate && createdDate >= new Date(filters.fromDate));
    const toOk = !filters.toDate || (createdDate && createdDate <= new Date(filters.toDate));
    return matchesSearch && matchesCreatedBy && fromOk && toOk;
  });

  const pageCount = Math.max(1, Math.ceil(filteredShifts.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRows = filteredShifts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="shifts-section">
      {/* Upper filter section removed */}
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

      {/* Add/Edit Shift Card - Themed */}
      <div className="ma-filter-card" style={{ marginBottom: '1.25rem' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="ma-filter-group" style={{ flex: '1 1 240px' }}>
            <label className="ma-label">{editMode ? 'Update Shift Period' : 'Add New Shift Period'}</label>
            <input
              type="text"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              className="ma-input"
              placeholder="Enter shift name"
              required
            />
          </div>
          <div className="ma-filter-group" style={{ flex: '1 1 260px' }}>
            <label className="ma-label">From Time</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select 
                value={fromHours} 
                onChange={(e) => setFromHours(e.target.value)}
                className="ma-select"
              >
                {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                  <option key={`from-${hour}`} value={hour}>{hour}</option>
                ))}
              </select>
              <select 
                value={fromMinutes} 
                onChange={(e) => setFromMinutes(e.target.value)}
                className="ma-select"
              >
                {['00', '15', '30', '45'].map(minute => (
                  <option key={`from-min-${minute}`} value={minute}>{minute}</option>
                ))}
              </select>
              <select 
                value={fromAmPm} 
                onChange={(e) => setFromAmPm(e.target.value)}
                className="ma-select"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div className="ma-filter-group" style={{ flex: '1 1 260px' }}>
            <label className="ma-label">To Time</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select 
                value={toHours} 
                onChange={(e) => setToHours(e.target.value)}
                className="ma-select"
              >
                {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                  <option key={`to-${hour}`} value={hour}>{hour}</option>
                ))}
              </select>
              <select 
                value={toMinutes} 
                onChange={(e) => setToMinutes(e.target.value)}
                className="ma-select"
              >
                {['00', '15', '30', '45'].map(minute => (
                  <option key={`to-min-${minute}`} value={minute}>{minute}</option>
                ))}
              </select>
              <select 
                value={toAmPm} 
                onChange={(e) => setToAmPm(e.target.value)}
                className="ma-select"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div className="ma-actions" style={{ flex: '0 0 auto' }}>
            <button type="button" onClick={handleReset} className="ma-pagination-btn">Reset</button>
            <button type="submit" disabled={loading} className="ma-btn-submit" style={{ marginLeft: 0, marginTop: 0 }}>
              {loading ? 'Processing...' : (editMode ? 'Update' : 'Submit')}
            </button>
          </div>
        </form>
      </div>

      {/* List Card - Themed */}
      <div className="ma-table-card">
        <div className="ma-search-bar">
          <FaSearch className="ma-search-icon" />
          <input
            type="text"
            className="ma-search-input"
            placeholder="Search shifts"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="ma-table-container">
          <table className="ma-table">
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
                currentRows.map((shift) => (
                  <tr key={shift._id}>
                    <td style={{ fontWeight: 500 }}>{shift.name}</td>
                    <td>{shift.fromTime}</td>
                    <td>{shift.toTime}</td>
                    <td>{shift.createdByName}</td>
                    <td>
                      {shift.createdDtm ? new Date(shift.createdDtm).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <div className="ma-actions">
                        <button className="ma-btn-action ma-btn-view" title="View" onClick={() => handleView(shift)}>
                          <FaEye />
                        </button>
                        <button className="ma-btn-action ma-btn-edit" title="Edit" onClick={() => handleEdit(shift)}>
                          <FaEdit />
                        </button>
                        <button className="ma-btn-action ma-btn-delete" title="Delete" onClick={() => handleDelete(shift._id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="ma-footer-row">
          <button
            type="button"
            className="ma-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            className="ma-pagination-btn next"
            onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
            disabled={currentPage === pageCount}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shifts;
