import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';

const SubAssignment = () => {
  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const fetchSubAssignments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:44354/api/sub-assignments');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        const result = await response.json();
        
        // Map API response to table structure
        const mapped = result.map(item => ({
          requestReference: item._id || 'N/A',
          enteredDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
          enteredTime: item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'N/A',
          assignedByName: item.assignedBy || 'N/A',
          assignedByDesignation: '',
          assignedToName: item.assignedTo?.userName || 'N/A',
          assignedToDesignation: '',
          assignedToContact: item.assignedTo?.contactNumber || '',
          assignedToStatus: item.assignedTo?.activeStatus ? 'Active' : 'Inactive',
          remarks: '',
          rawData: item
        }));
        
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
                          <button className="ma-btn-action ma-btn-view" title="View" type="button">
                            <FaEye />
                          </button>
                          <button className="ma-btn-action ma-btn-edit" title="Update" type="button">
                            <FaEdit />
                          </button>
                          <button className="ma-btn-action ma-btn-delete" title="Delete" type="button">
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
    </div>
  );
};

export default SubAssignment;
