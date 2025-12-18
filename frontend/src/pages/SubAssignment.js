import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

const SubAssignment = () => {
  

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:44354/api';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubAssignments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:44354/api/sub-assignments');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        const result = await response.json();
        
        // Map API response to table structure
        const mapped = result.map(item => {
          // Extract assigned user names from populated assignedTo array
          const assignedToNames = item.assignedTo && Array.isArray(item.assignedTo)
            ? item.assignedTo.map(assignee => {
                const userName = assignee.user?.userName || assignee.user?.name || 'Unknown';
                const assignType = assignee.assignmentType === 'Sub Assignment' ? '(Sub)' : '(Main)';
                return `${userName} ${assignType}`;
              }).join(', ')
            : 'N/A';

          // Get first assigned user's details for designation and contact
          const firstUser = item.assignedTo && Array.isArray(item.assignedTo) && item.assignedTo.length > 0
            ? item.assignedTo[0].user
            : null;
          
          return {
            requestReference: item._id || 'N/A',
            enteredDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
            enteredTime: item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'N/A',
            assignedByName: item.assignedBy || 'N/A',
            assignedByDesignation: '',
            assignedToName: assignedToNames,
            assignedToDesignation: firstUser?.Designation || '—',
            assignedToContact: firstUser?.ContactNumber || '',
            assignedToStatus: firstUser?.ActiveStatus ? 'Active' : 'Inactive',
            remarks: item.description || '',
            rawData: item
          };
        });
        
        setData(mapped);
      } catch (err) {
        console.error('Failed to fetch sub-assignments:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubAssignments();
  }, []);

  const openView = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const closeView = () => {
    setViewModalOpen(false);
    setSelectedItem(null);
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const closeEdit = () => {
    setEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (assignmentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sub-assignment?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/sub-assignments/${assignmentId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete sub-assignment');
      
      // Refresh data after deletion
      const response = await fetch(`${API_BASE}/sub-assignments`);
      const result = await response.json();
      const mapped = result.map(item => {
        const assignedToNames = item.assignedTo && Array.isArray(item.assignedTo)
          ? item.assignedTo.map(assignee => {
              const userName = assignee.user?.userName || assignee.user?.name || 'Unknown';
              const assignType = assignee.assignmentType === 'Sub Assignment' ? '(Sub)' : '(Main)';
              return `${userName} ${assignType}`;
            }).join(', ')
          : 'N/A';

        const firstUser = item.assignedTo && Array.isArray(item.assignedTo) && item.assignedTo.length > 0
          ? item.assignedTo[0].user
          : null;
        
        return {
          requestReference: item._id || 'N/A',
          enteredDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
          enteredTime: item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'N/A',
          assignedByName: item.assignedBy || 'N/A',
          assignedByDesignation: '',
          assignedToName: assignedToNames,
          assignedToDesignation: firstUser?.Designation || '—',
          assignedToContact: firstUser?.ContactNumber || '',
          assignedToStatus: firstUser?.ActiveStatus ? 'Active' : 'Inactive',
          remarks: item.description || '',
          rawData: item
        };
      });
      setData(mapped);
    } catch (err) {
      setError(err.message || 'Failed to delete sub-assignment');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };
  const [filters, setFilters] = useState({
    employee: '',
    status: '',
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10)
  });
  const [search, setSearch] = useState('');

  const styles = {
    pagination: { display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem' },
    pageInfo: { marginLeft: '0.5rem', color: 'var(--text-primary)' }
  };

  return (
    <div className="ma-wrapper sub-assignment-page">
      <Sidebar />
      <div className="ma-content">
        <HeaderBar />
        <div className="ma-header">
          <h1>Sub Assignments</h1>
        </div>

        <div className="ma-filter-card">
          <div className="ma-filter-group">
            <label className="ma-label">Employee</label>
            <select
              className="ma-select"
              value={filters.employee}
              onChange={(e) => setFilters(prev => ({ ...prev, employee: e.target.value }))}
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
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="ma-filter-group">
            <label className="ma-label">From Date</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters(prev => ({ ...prev, fromDate: e.target.value }))}
              className="ma-input"
            />
          </div>
          <div className="ma-filter-group">
            <label className="ma-label">To Date</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters(prev => ({ ...prev, toDate: e.target.value }))}
              className="ma-input"
            />
          </div>
          <button type="submit" className="ma-btn-submit">Submit</button>
        </div>

        <div className="ma-table-card">
          <div className="ma-search-bar">
            <FaSearch className="ma-search-icon" />
            <input
              type="text"
              placeholder="Search sub-assignments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ma-search-input"
            />
          </div>

          <div className="ma-table-container">
            <table className="ma-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Entered Date & Time</th>
                  <th>Assigned By</th>
                  <th>Assigned By Designation</th>
                  <th>Assigned To</th>
                  <th>Assigned To Designation</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                      Loading sub-assignments...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#dc2626' }}>
                      Error: {error}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      No sub-assignments found
                    </td>
                  </tr>
                ) : (
                  (() => {
                    const indexOfLast = currentPage * itemsPerPage;
                    const indexOfFirst = indexOfLast - itemsPerPage;
                    const currentRows = data.slice(indexOfFirst, indexOfLast);
                    return currentRows.map((item, index) => (
                    <tr key={item.rawData?._id || index}>
                      <td>{item.requestReference}</td>
                      <td>
                        <div>{item.enteredDate}</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.enteredTime}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>{item.assignedByName}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.assignedByDesignation || '—'}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>{item.assignedToName}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.assignedToDesignation || '—'}</div>
                      </td>
                      <td>
                        {item.remarks ? item.remarks : (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No remarks</span>
                        )}
                      </td>
                      <td>
                        <div className="ma-actions">
                          <button 
                            className="ma-btn-action ma-btn-view" 
                            title="View" 
                            type="button"
                            onClick={() => openView(item)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="ma-btn-action ma-btn-edit" 
                            title="Update" 
                            type="button"
                            onClick={() => openEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="ma-btn-action ma-btn-delete" 
                            title="Delete" 
                            type="button"
                            onClick={() => handleDelete(item.rawData._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    ));
                  })()
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
              <FaChevronLeft /> Previous
            </button>
            <span style={styles.pageInfo}>
              Page {currentPage} of {Math.max(1, Math.ceil(data.length / itemsPerPage))}
            </span>
            <button
              type="button"
              className="ma-pagination-btn next"
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(data.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      <Footer />

      {/* View Modal */}
      {viewModalOpen && selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>Sub-Assignment Details</h2>
            <p><strong>Request Reference:</strong> {selectedItem.requestReference}</p>
            <p><strong>Title:</strong> {selectedItem.rawData?.title || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedItem.remarks || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedItem.rawData?.status || 'Pending'}</p>
            <p><strong>Priority:</strong> {selectedItem.rawData?.priority || 'Medium'}</p>
            <p><strong>Assigned To:</strong> {selectedItem.assignedToName}</p>
            <p><strong>Assigned By:</strong> {selectedItem.assignedByName}</p>
            <p><strong>Date:</strong> {selectedItem.enteredDate} {selectedItem.enteredTime}</p>
            <button 
              onClick={closeView}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>Edit Sub-Assignment</h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Edit sub-assignment details</p>
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Status
              </label>
              <select 
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
                defaultValue={selectedItem.rawData?.status}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Priority
              </label>
              <select 
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
                defaultValue={selectedItem.rawData?.priority}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button 
                onClick={closeEdit}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6b7280',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Close
              </button>
              <button 
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAssignment;
