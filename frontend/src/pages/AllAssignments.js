import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTasks } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AssignmentView from './AllAssignments/AssignmentView';
import UpdateStatusModal from './AllAssignments/UpdateStatusModal';
import ProgressModal from './AllAssignments/ProgressModal';
import './complaint/ComplaintForm.css';

const AllAssignments = () => {
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
    <div className="complaint-onboard-wrapper assignments-page">
      <Navbar />
      <div className="complaint-onboard-background" />

      <div className="content-wrapper">
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>All Assignments</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="config-form">
            <div className="form-grid assignments-form-grid">
              <Field label="Employee">
                <select
                  className="input"
                  value={filters.employee}
                  onChange={(e) => handleChange('employee', e.target.value)}
                >
                  <option value="">Select Employees</option>
                  <option value="john.doe">John Doe</option>
                  <option value="jane.smith">Jane Smith</option>
                </select>
              </Field>
              <Field label="Status">
                <select
                  className="input"
                  value={filters.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </Field>
              <Field label="From Date">
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleChange('fromDate', e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="To Date">
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleChange('toDate', e.target.value)}
                  className="input"
                />
              </Field>
            </div>
            <div className="config-actions">
              <button type="submit" className="config-btn-primary">Submit</button>
            </div>
          </form>

          <Field label="Search" className="full" style={{ marginBottom: '0.75rem' }}>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </Field>

          <div className="config-card">
            {loading && (
              <p style={{ textAlign: 'center', padding: '1rem' }}>Loading assignments...</p>
            )}
            {error && (
              <p style={{ textAlign: 'center', padding: '1rem', color: 'red' }}>Error: {error}</p>
            )}
            {!loading && !error && (
              <table className="config-table">
                <thead>
                  <tr>
                    <th>Assignment Type</th>
                    <th>Assigned By</th>
                    <th>Assigned To</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((item) => (
                    <tr key={item._id}>
                      <td>{item.Assignment}</td>
                      <td>{item.assignedBy}</td>
                      <td>{
                        item.assignedTo && typeof item.assignedTo === 'object'
                          ? (item.assignedTo.userName || item.assignedTo.name || userNames[item.assignedTo._id] || 'Unassigned')
                          : (item.assignedTo ? (userNames[item.assignedTo] || String(item.assignedTo)) : 'Unassigned')
                      }</td>
                      <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}</td>
                      <td>
                        <div className="config-table-actions">
                          <button
                            title="View"
                            type="button"
                            className="config-icon-btn"
                            onClick={() => openView(item)}
                          >
                            <FaEye size={16} />
                          </button>
                          <button
                            title="Update"
                            type="button"
                            className="config-icon-btn"
                            onClick={() => openStatus(item)}
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            title="Progress"
                            type="button"
                            className="config-icon-btn"
                            onClick={() => openProgress(item)}
                          >
                            <FaTasks size={16} />
                          </button>
                          <button title="Delete" type="button" className="config-icon-btn">
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {assignments.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>No assignments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem' }}>
            <button type="button" className="config-btn-secondary">Previous</button>
            <button type="button" className="config-btn-primary">Next</button>
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>Page 1 of 1</span>
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

function Field({ label, children, className = "", style }) {
  return (
    <div className={`form-field ${className}`} style={style}>
      <label className="field-label">{label}</label>
      <div className="field-control">{children}</div>
    </div>
  );
}

export default AllAssignments;


