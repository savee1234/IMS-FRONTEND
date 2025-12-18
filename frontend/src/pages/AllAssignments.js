import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTasks, FaSearch, FaChevronDown } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import AssignmentView from './AllAssignments/AssignmentView';
import UpdateStatusModal from './AllAssignments/UpdateStatusModal';
import ProgressModal from './AllAssignments/ProgressModal';
import './complaint/ComplaintForm.css';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

const AllAssignments = () => {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:44354/api';
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filters, setFilters] = useState({
    employee: '',
    status: '',
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10)
  });

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusAssignment, setStatusAssignment] = useState(null);
  
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userNames, setUserNames] = useState({});

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/assignments`);
      if (!res.ok) throw new Error('Failed to fetch assignments');
      const data = await res.json();
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Unexpected error');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/user-management`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      // Build quick lookup by id
      const map = {};
      data.forEach(u => {
        if (u && u._id) map[u._id] = u.userName || u.name || 'Unknown';
      });
      setUserNames(map);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intentionally left blank for now (no API). Keeps UI consistent with images.
  };

  const openView = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const closeView = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  const openStatus = (assignment) => {
    setStatusAssignment(assignment);
    setStatusModalOpen(true);
  };

  const closeStatus = () => {
    setStatusModalOpen(false);
    setStatusAssignment(null);
  };

  const handleStatusSubmit = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      if (!payload.assignmentId) throw new Error('Missing assignment id');

      const res = await fetch(`${API_BASE}/assignments/${payload.assignmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: payload.status })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to update assignment');
      }

      const updated = await res.json();
      setAssignments(prev => prev.map(a => (a._id === updated._id ? updated : a)));
      closeStatus();
    } catch (err) {
      setError(err.message || 'Unexpected error');
      console.error('Error updating assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const [progressOpen, setProgressOpen] = useState(false);
  const [progressAssignment, setProgressAssignment] = useState(null);

  const openProgress = (assignment) => {
    setProgressAssignment(assignment);
    setProgressOpen(true);
  };

  const closeProgress = () => {
    setProgressOpen(false);
    setProgressAssignment(null);
  };

  const handleDelete = async (assignmentId) => {
    const confirmDelete = window.confirm('Delete this assignment?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/assignments/${assignmentId}`, { method: 'DELETE' });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to delete assignment');
      }

      setAssignments(prev => prev.filter(a => a._id !== assignmentId));
    } catch (err) {
      setError(err.message || 'Unexpected error');
      console.error('Error deleting assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const AssigneesDropdown = ({ assignedTo }) => {
    const [open, setOpen] = useState(false);
    const list = Array.isArray(assignedTo) ? assignedTo : [];
    const main = list.filter(a => (a.assignmentType || '').toLowerCase().includes('main'));
    const sub = list.filter(a => (a.assignmentType || '').toLowerCase().includes('sub'));
    const total = list.length;
    const label = total > 0 ? `${total} assignee${total > 1 ? 's' : ''}` : 'Unassigned';
    const toggle = () => setOpen(v => !v);
    return (
      <div style={{ position: 'relative', display: 'inline-block', maxWidth: '300px' }}>
        <button
          type="button"
          onClick={toggle}
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#111827',
            fontSize: '0.9rem',
            cursor: total > 0 ? 'pointer' : 'default',
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
          disabled={total === 0}
        >
          <span style={{ flex: '1 1 auto' }}>{label}</span>
          <FaChevronDown
            style={{
              flex: '0 0 auto',
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              color: total === 0 ? '#9ca3af' : '#6b7280'
            }}
            size={14}
          />
        </button>
        {open && total > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              width: '320px',
              zIndex: 20,
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: 600, color: '#374151' }}>
              Main Assigners
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
              {main.length === 0 && (
                <div style={{ padding: '10px 12px', color: '#6b7280' }}>None</div>
              )}
              {main.map((a, i) => {
                const name = a.user?.userName || a.user?.name || 'Unknown';
                return (
                  <div key={`m-${i}`} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', fontSize: '0.8rem', background: '#eef2ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '12px' }}>Main</span>
                    <span style={{ color: '#111827' }}>{name}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '10px 12px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: 600, color: '#374151' }}>
              Sub Assigners
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
              {sub.length === 0 && (
                <div style={{ padding: '10px 12px', color: '#6b7280' }}>None</div>
              )}
              {sub.map((a, i) => {
                const name = a.user?.userName || a.user?.name || 'Unknown';
                return (
                  <div key={`s-${i}`} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', fontSize: '0.8rem', background: '#ecfeff', color: '#0ea5e9', padding: '2px 8px', borderRadius: '12px' }}>Sub</span>
                    <span style={{ color: '#111827' }}>{name}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '8px 12px', textAlign: 'right', background: '#f9fafb' }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  color: '#111827',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="ma-wrapper">
      <Sidebar />
      <div className="ma-content">
        <HeaderBar />
        <div className="ma-header">
          <h1>All Assignments</h1>
        </div>

        <div className="ma-filter-card">
          <div className="ma-filter-group">
            <label className="ma-label">Employee</label>
            <select
              className="ma-select"
              value={filters.employee}
              onChange={(e) => handleChange('employee', e.target.value)}
            >
              <option value="">Select Employees</option>
              <option value="john.doe">John Doe</option>
              <option value="jane.smith">Jane Smith</option>
            </select>
          </div>
          <div className="ma-filter-group">
            <label className="ma-label">Status</label>
            <select
              className="ma-select"
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div className="ma-filter-group">
            <label className="ma-label">From Date</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => handleChange('fromDate', e.target.value)}
              className="ma-input"
            />
          </div>
          <div className="ma-filter-group">
            <label className="ma-label">To Date</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => handleChange('toDate', e.target.value)}
              className="ma-input"
            />
          </div>
          <button type="submit" className="ma-btn-submit" onClick={handleSubmit}>Submit</button>
        </div>

        <div className="ma-table-card">
          <div className="ma-search-bar">
            <FaSearch className="ma-search-icon" />
            <input
              type="text"
              placeholder="Search assignments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ma-search-input"
            />
          </div>

          <div className="ma-table-container">
            {loading && (
              <p style={{ textAlign: 'center', padding: '1rem' }}>Loading assignments...</p>
            )}
            {error && (
              <p style={{ textAlign: 'center', padding: '1rem', color: 'red' }}>Error: {error}</p>
            )}
            {!loading && !error && (
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Assigned To</th>
                    <th>Assigned By</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const indexOfLast = currentPage * itemsPerPage;
                    const indexOfFirst = indexOfLast - itemsPerPage;
                    const visibleAssignments = assignments.slice(indexOfFirst, indexOfLast);
                    return visibleAssignments.map((item) => {
                      // Extract assigned users
                      const assignedUsers = item.assignedTo && Array.isArray(item.assignedTo) 
                        ? item.assignedTo.map(assignee => {
                            const userName = assignee.user?.userName || 'Unknown';
                            const assignType = assignee.assignmentType === 'Main Assignment' ? '(Main)' : '(Sub)';
                            return `${userName} ${assignType}`;
                          }).join(', ')
                        : 'Unassigned';

                      return (
                        <tr key={item._id}>
                          <td><strong>{item.title || 'N/A'}</strong></td>
                          <td>
                            <div style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.description || 'No description'}
                            </div>
                          </td>
                          <td>
                            <span className={`ma-status-badge ma-status-${(item.status || '').toLowerCase().replace(' ', '-')}`}>
                              {item.status || 'Pending'}
                            </span>
                          </td>
                          <td>
                            <span className={`ma-priority-badge ma-priority-${(item.priority || '').toLowerCase()}`}>
                              {item.priority || 'Medium'}
                            </span>
                          </td>
                          <td>
                            <AssigneesDropdown assignedTo={item.assignedTo} />
                          </td>
                          <td>{item.assignedBy || 'N/A'}</td>
                          <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : 'N/A'}</td>
                          <td>
                        <div className="ma-actions">
                          <button
                            title="View"
                            type="button"
                            className="ma-btn-action ma-btn-view"
                            onClick={() => openView(item)}
                          >
                            <FaEye />
                          </button>
                          <button
                            title="Update"
                            type="button"
                            className="ma-btn-action ma-btn-edit"
                            onClick={() => openStatus(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="Progress"
                            type="button"
                            className="ma-btn-action ma-btn-progress"
                            onClick={() => openProgress(item)}
                          >
                            <FaTasks />
                          </button>
                          <button
                            title="Delete"
                            type="button"
                            className="ma-btn-action ma-btn-delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                      );
                    });
                  })()}
                  {assignments.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>No assignments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
            <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
              Page {currentPage} of {Math.max(1, Math.ceil(assignments.length / itemsPerPage))}
            </span>
            <button
              type="button"
              className="ma-pagination-btn next"
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(assignments.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(assignments.length / itemsPerPage)}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <AssignmentView assignment={selectedAssignment} onClose={closeView} />
      )}

      {statusModalOpen && (
        <UpdateStatusModal assignment={statusAssignment} onClose={closeStatus} onSubmit={handleStatusSubmit} />
      )}

      {progressOpen && (
        <ProgressModal assignment={progressAssignment} onClose={closeProgress} />
      )}

      <Footer />
    </div>
  );
};

export default AllAssignments;


