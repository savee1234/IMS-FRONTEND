import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTasks, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import AssignmentView from './AllAssignments/AssignmentView';
import UpdateStatusModal from './AllAssignments/UpdateStatusModal';
import ProgressModal from './AllAssignments/ProgressModal';
import './complaint/ComplaintForm.css';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

const AllAssignments = () => {
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

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('http://localhost:44354/api/assignments');
        if (!res.ok) throw new Error('Failed to fetch assignments');
        const data = await res.json();
        console.log('Fetched assignments:', data);
        setAssignments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Unexpected error');
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:44354/api/user-management');
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

  const handleStatusSubmit = (payload) => {
    console.log('Status update payload:', payload);
    // TODO: call API to submit status update
    closeStatus();
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
                            <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {assignedUsers}
                            </div>
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
                          <button title="Delete" type="button" className="ma-btn-action ma-btn-delete">
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


