import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

const MainAssignment = () => {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:44354/api';
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage] = useState(4);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);

  const fetchMainAssignments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/main-assignments`);
      if (!response.ok) {
        throw new Error('Failed to fetch main assignments');
      }
      const data = await response.json();
      // Filter to only show assignments with Main Assignment type
      const mainOnly = data.filter(a => 
        a.assignedTo && a.assignedTo.some(assignee => assignee.assignmentType === 'Main Assignment')
      );
      setAssignments(mainOnly);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching main assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMainAssignments();
  }, []);

  const [filters, setFilters] = useState({
    employee: '',
    status: '',
    fromDate: '2025-11-12', 
    toDate: '2025-11-12'
  });

  const [search, setSearch] = useState('');

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const openView = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const closeView = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  const openEdit = (assignment) => {
    setEditAssignment({ ...assignment });
    setEditModalOpen(true);
  };

  const closeEdit = () => {
    setEditModalOpen(false);
    setEditAssignment(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (!editAssignment._id) throw new Error('Missing assignment id');

      const payload = {
        assignedBy: editAssignment.assignedBy,
        title: editAssignment.title,
        description: editAssignment.description,
        status: editAssignment.status,
        priority: editAssignment.priority
      };

      const res = await fetch(`${API_BASE}/main-assignments/${editAssignment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to update assignment');
      }

      const updated = await res.json();
      setAssignments(prev => prev.map(a => (a._id === updated._id ? updated : a)));
      closeEdit();
    } catch (err) {
      setError(err.message || 'Error updating assignment');
      console.error('Error updating assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (assignmentId) => {
    const confirmDelete = window.confirm('Delete this main assignment?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/main-assignments/${assignmentId}`, { method: 'DELETE' });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to delete assignment');
      }

      setAssignments(prev => prev.filter(a => a._id !== assignmentId));
    } catch (err) {
      setError(err.message || 'Error deleting assignment');
      console.error('Error deleting assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  // View Modal Component
  const ViewModal = ({ assignment, onClose }) => {
    if (!assignment) return null;

    // Filter to only show Main Assignment type assignees
    const mainAssignees = assignment.assignedTo && Array.isArray(assignment.assignedTo)
      ? assignment.assignedTo.filter(assignee => assignee.assignmentType === 'Main Assignment')
      : [];
    
    const assignedUsers = mainAssignees.length > 0
      ? mainAssignees.map(user => user.user?.userName || 'Unknown').join(', ')
      : 'Unassigned';

    return (
      <div className="us-overlay" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="us-modal" onClick={(e) => e.stopPropagation()}>
          <div className="us-header">
            <h3>View Assignment</h3>
            <button className="us-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="us-body" style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Title:</strong> {assignment.title}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Description:</strong> {assignment.description || 'N/A'}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Assigned By:</strong> {assignment.assignedBy}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Assigned To:</strong> {assignedUsers}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Status:</strong> {assignment.status}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Priority:</strong> {assignment.priority}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Created:</strong> {assignment.createdAt ? new Date(assignment.createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal Component
  const EditModal = ({ assignment, onClose, onSubmit }) => {
    if (!assignment) return null;

    return (
      <div className="us-overlay" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="us-modal" onClick={(e) => e.stopPropagation()}>
          <div className="us-header">
            <h3>Edit Assignment</h3>
            <button className="us-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <form className="us-body" onSubmit={onSubmit}>
            <div className="us-row">
              <label className="us-label">Title</label>
              <input
                className="us-input"
                type="text"
                value={assignment.title || ''}
                onChange={(e) => setEditAssignment(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="us-row">
              <label className="us-label">Description</label>
              <textarea
                className="us-input"
                value={assignment.description || ''}
                onChange={(e) => setEditAssignment(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="us-row">
              <label className="us-label">Assigned By</label>
              <input
                className="us-input"
                type="text"
                value={assignment.assignedBy || ''}
                onChange={(e) => setEditAssignment(prev => ({ ...prev, assignedBy: e.target.value }))}
                required
              />
            </div>

            <div className="us-row">
              <label className="us-label">Status</label>
              <select
                className="us-input"
                value={assignment.status || ''}
                onChange={(e) => setEditAssignment(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <div className="us-row">
              <label className="us-label">Priority</label>
              <select
                className="us-input"
                value={assignment.priority || ''}
                onChange={(e) => setEditAssignment(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="us-actions">
              <button type="button" className="us-btn us-reset" onClick={onClose}>Cancel</button>
              <button type="submit" className="us-btn us-submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="ma-wrapper main-assignment-page">
      <Sidebar />
      <div className="ma-content">
        <HeaderBar />
        <div className="ma-header">
          <h1>Main Assignments</h1>
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
              <option value="romaine.murcott">Romaine Murcott</option>
              <option value="john.smith">John Smith</option>
              <option value="sarah.johnson">Sarah Johnson</option>
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
          <button type="button" onClick={handleSubmit} className="ma-btn-submit">
            Submit
          </button>
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
            {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading assignments...</p>}
            {error && <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</p>}
            {!loading && !error && (
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                    <th>ASSIGNED BY</th>
                    <th>ASSIGNED TO</th>
                    <th>STATUS</th>
                    <th>PRIORITY</th>
                    <th>CREATED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const indexOfLast = currentPage * itemsPerPage;
                    const indexOfFirst = indexOfLast - itemsPerPage;
                    const visible = assignments.slice(indexOfFirst, indexOfLast);
                    return visible.map((item) => {
                      // Filter to only show Main Assignment type assignees
                      const mainAssignees = item.assignedTo && Array.isArray(item.assignedTo)
                        ? item.assignedTo.filter(assignee => assignee.assignmentType === 'Main Assignment')
                        : [];
                      
                      const assignedUsers = mainAssignees.length > 0
                        ? mainAssignees.map(user => user.user?.userName || 'Unknown').join(', ')
                        : 'Unassigned';

                      return (
                        <tr key={item._id}>
                          <td>{item.title}</td>
                          <td>
                            <div style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.description || 'N/A'}
                            </div>
                          </td>
                          <td>{item.assignedBy}</td>
                          <td>
                            <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {assignedUsers}
                            </div>
                          </td>
                          <td>
                            <span className={`ma-status-badge ma-status-${(item.status || '').toLowerCase().replace(' ', '-')}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <span className={`ma-priority-badge ma-priority-${(item.priority || '').toLowerCase()}`}>
                              {item.priority}
                            </span>
                          </td>
                          <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td>
                            <div className="ma-actions">
                              <button
                                className="ma-btn-action ma-btn-view"
                                title="View"
                                onClick={() => openView(item)}
                              >
                                <FaEye />
                              </button>
                              <button
                                className="ma-btn-action ma-btn-edit"
                                title="Edit"
                                onClick={() => openEdit(item)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="ma-btn-action ma-btn-delete"
                                title="Delete"
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
                </tbody>
              </table>
            )}
          </div>

          <div className="ma-footer-row">
            <button
              className="ma-pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              &lt; Previous
            </button>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              Page {currentPage} of {Math.max(1, Math.ceil(assignments.length / itemsPerPage))}
            </span>
            <button
              className="ma-pagination-btn next"
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(assignments.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(assignments.length / itemsPerPage)}
            >
              Next &gt;
            </button>
          </div>
        </div>

      </div>

      {modalOpen && <ViewModal assignment={selectedAssignment} onClose={closeView} />}
      {editModalOpen && <EditModal assignment={editAssignment} onClose={closeEdit} onSubmit={handleEditSubmit} />}

      <Footer />
    </div>
  );
};

export default MainAssignment;
