import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEdit, FaTrash, FaSearch, FaFileAlt, FaHistory, FaComments, FaCheck } from 'react-icons/fa';
import './complaint/ComplaintForm.css';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:44354/api/complaints');
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const result = await response.json();
    const complaints = result.data || result;

    return complaints.map((complaint, index) => ({
      id: complaint._id || index + 1,
      reference: complaint.requestRef || `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear().toString().slice(-2)}-0001`,
      requester: complaint.contactName || 'Unknown',
      priority: complaint.priority || 'Medium',
      status: complaint.solutionName === 'Resolved' ? 'Completed' :
              complaint.solutionName === 'In Progress' ? 'Ongoing' : 'Open',
      issue: complaint.complaint || complaint.complaintDetails || 'No details provided',
      phone: complaint.searchMobile || complaint.mobile || 'N/A',
      email: complaint.email || 'N/A',
      created: complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      organizationContactPerson: complaint.organizationContactPersonId ? {
        name: complaint.organizationContactPersonId.name,
        organizationName: complaint.organizationContactPersonId.organizationName,
        email: complaint.organizationContactPersonId.email,
        mobileNumber: complaint.organizationContactPersonId.mobileNumber
      } : null,
      originalComplaint: complaint
    }));
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return [];
  }
};

const MyTasks = () => {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:44354/api';
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const [filters, setFilters] = useState({
    requester: '',
    status: '',
    priority: '',
    fromDate: '',
    toDate: ''
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError('Failed to load complaints');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter logic can be added here
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
    setIsEditing(false);
    setEditFormData({
      reference: complaint.reference,
      requester: complaint.requester,
      priority: complaint.priority,
      status: complaint.status,
      phone: complaint.phone,
      email: complaint.email,
      issue: complaint.issue,
      categoryType: complaint.originalComplaint?.categoryType || '',
      organization: complaint.originalComplaint?.organization || '',
      solutionType: complaint.originalComplaint?.solutionType || '',
      medium: complaint.originalComplaint?.medium || '',
      assignment: complaint.originalComplaint?.assignment || '',
      docRef: complaint.originalComplaint?.docRef || '',
      docSubject: complaint.originalComplaint?.docSubject || '',
      remarks: complaint.originalComplaint?.remarks || ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
    setIsEditing(false);
    setEditFormData({});
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (selectedComplaint) {
      setEditFormData({
        reference: selectedComplaint.reference,
        requester: selectedComplaint.requester,
        priority: selectedComplaint.priority,
        status: selectedComplaint.status,
        phone: selectedComplaint.phone,
        email: selectedComplaint.email,
        issue: selectedComplaint.issue,
        categoryType: selectedComplaint.originalComplaint?.categoryType || '',
        organization: selectedComplaint.originalComplaint?.organization || '',
        solutionType: selectedComplaint.originalComplaint?.solutionType || '',
        medium: selectedComplaint.originalComplaint?.medium || '',
        assignment: selectedComplaint.originalComplaint?.assignment || '',
        docRef: selectedComplaint.originalComplaint?.docRef || '',
        docSubject: selectedComplaint.originalComplaint?.docSubject || '',
        remarks: selectedComplaint.originalComplaint?.remarks || ''
      });
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      console.log('Saving complaint with data:', editFormData);
      const updatedComplaint = {
        ...selectedComplaint,
        ...editFormData,
        originalComplaint: {
          ...selectedComplaint.originalComplaint,
          ...editFormData
        }
      };
      
      setSelectedComplaint(updatedComplaint);
      setIsEditing(false);
      alert('Complaint updated successfully!');
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('Error updating complaint. Please try again.');
    }
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = search === '' || 
      task.reference.toLowerCase().includes(search.toLowerCase()) ||
      task.requester.toLowerCase().includes(search.toLowerCase()) ||
      task.issue.toLowerCase().includes(search.toLowerCase());
    
    const matchesRequester = !filters.requester || task.requester === filters.requester;
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    
    return matchesSearch && matchesRequester && matchesStatus && matchesPriority;
  });

  // View Modal Component
  const ViewModal = ({ complaint, onClose }) => {
    if (!complaint) return null;

    return (
      <div className="us-overlay" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="us-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="us-header">
            <h3>Complaint Details</h3>
            <button className="us-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="us-body" style={{ padding: '1.5rem' }}>
            {isEditing ? (
              <>
                <div className="us-row">
                  <label className="us-label">Reference</label>
                  <input
                    className="us-input"
                    type="text"
                    value={editFormData.reference || ''}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                  />
                </div>
                <div className="us-row">
                  <label className="us-label">Requester</label>
                  <input
                    className="us-input"
                    type="text"
                    value={editFormData.requester || ''}
                    onChange={(e) => handleInputChange('requester', e.target.value)}
                  />
                </div>
                <div className="us-row">
                  <label className="us-label">Priority</label>
                  <select
                    className="us-input"
                    value={editFormData.priority || ''}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="us-row">
                  <label className="us-label">Status</label>
                  <select
                    className="us-input"
                    value={editFormData.status || ''}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="us-row">
                  <label className="us-label">Phone</label>
                  <input
                    className="us-input"
                    type="text"
                    value={editFormData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="us-row">
                  <label className="us-label">Email</label>
                  <input
                    className="us-input"
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="us-row">
                  <label className="us-label">Issue Description</label>
                  <textarea
                    className="us-input"
                    value={editFormData.issue || ''}
                    onChange={(e) => handleInputChange('issue', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="us-actions">
                  <button type="button" className="us-btn us-reset" onClick={handleCancelEdit}>Cancel</button>
                  <button type="button" className="us-btn us-submit" onClick={handleSaveEdit}>Save Changes</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Reference:</strong> {complaint.reference}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Requester:</strong> {complaint.requester}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Priority:</strong> {complaint.priority}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Status:</strong> 
                  <span className={`ma-status-badge ma-status-${(complaint.status || '').toLowerCase().replace(' ', '-')}`} style={{ marginLeft: '0.5rem' }}>
                    {complaint.status}
                  </span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Phone:</strong> {complaint.phone}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Email:</strong> {complaint.email}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Created:</strong> {complaint.created}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Issue Description:</strong>
                  <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                    {complaint.issue}
                  </div>
                </div>
                {complaint.organizationContactPerson && (
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Organization Contact Person:</strong>
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                      <div><strong>Name:</strong> {complaint.organizationContactPerson.name}</div>
                      <div><strong>Organization:</strong> {complaint.organizationContactPerson.organizationName}</div>
                      <div><strong>Email:</strong> {complaint.organizationContactPerson.email}</div>
                      <div><strong>Mobile:</strong> {complaint.organizationContactPerson.mobileNumber}</div>
                    </div>
                  </div>
                )}
                <div className="us-actions">
                  <button type="button" className="us-btn us-reset" onClick={onClose}>Close</button>
                  <button type="button" className="us-btn us-submit" onClick={handleEditClick}>Edit Complaint</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ma-wrapper my-tasks-page">
      <Sidebar />
      <div className="ma-content">
        <HeaderBar placeholder="Search tasks..." />
        <div className="ma-header">
          <h1>My Tasks</h1>
        </div>

        <div className="ma-filter-card">
          <div className="ma-filter-group">
            <label className="ma-label">Requester</label>
            <select
              className="ma-select"
              value={filters.requester}
              onChange={(e) => handleChange('requester', e.target.value)}
            >
              <option value="">Select Requester</option>
              {Array.from(new Set(tasks.map(t => t.requester))).map(requester => (
                <option key={requester} value={requester}>{requester}</option>
              ))}
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
              <option value="Open">Open</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="ma-filter-group">
            <label className="ma-label">Priority</label>
            <select
              className="ma-select"
              value={filters.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
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
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ma-search-input"
            />
          </div>

          <div className="ma-table-container">
            {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading tasks...</p>}
            {error && <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</p>}
            {!loading && !error && (
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>REFERENCE</th>
                    <th>REQUESTER</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                    <th>ISSUE</th>
                    <th>PHONE</th>
                    <th>EMAIL</th>
                    <th>CREATED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const indexOfLast = currentPage * itemsPerPage;
                    const indexOfFirst = indexOfLast - itemsPerPage;
                    const visible = filteredTasks.slice(indexOfFirst, indexOfLast);
                    
                    if (visible.length === 0) {
                      return (
                        <tr>
                          <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                            No tasks found.
                          </td>
                        </tr>
                      );
                    }
                    
                    return visible.map((task) => (
                      <tr key={task.id}>
                        <td>{task.reference}</td>
                        <td>{task.requester}</td>
                        <td>
                          <span className={`ma-priority-badge ma-priority-${(task.priority || '').toLowerCase()}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`ma-status-badge ma-status-${(task.status || '').toLowerCase().replace(' ', '-')}`}>
                            {task.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {task.issue}
                          </div>
                        </td>
                        <td>{task.phone}</td>
                        <td>{task.email}</td>
                        <td>{task.created}</td>
                        <td>
                          <div className="ma-actions">
                            <button
                              className="ma-btn-action ma-btn-view"
                              title="View Details"
                              onClick={() => handleViewDetails(task)}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="ma-btn-action ma-btn-edit"
                              title="History"
                              onClick={() => {}}
                            >
                              <FaHistory />
                            </button>
                            <button
                              className="ma-btn-action ma-btn-progress"
                              title="Comments"
                              onClick={() => {}}
                            >
                              <FaComments />
                            </button>
                            <button
                              className="ma-btn-action ma-btn-delete"
                              title="Done"
                              onClick={() => {}}
                            >
                              <FaCheck />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ));
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
              Page {currentPage} of {Math.max(1, Math.ceil(filteredTasks.length / itemsPerPage))}
            </span>
            <button
              className="ma-pagination-btn next"
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredTasks.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage)}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {showModal && <ViewModal complaint={selectedComplaint} onClose={closeModal} />}

      <Footer />
    </div>
  );
};

export default MyTasks;
