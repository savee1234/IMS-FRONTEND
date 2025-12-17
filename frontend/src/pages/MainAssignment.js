import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

const MainAssignment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    fetchMainAssignments();
  }, []);

  const fetchMainAssignments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:44354/api/main-assignments');
      if (!response.ok) {
        throw new Error('Failed to fetch main assignments');
      }
      const data = await response.json();
      setAssignments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching main assignments:', err);
    } finally {
      setLoading(false);
    }
  };

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
              <option value="Resolved">Resolved</option>
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
                    <th>DUE DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const indexOfLast = currentPage * itemsPerPage;
                    const indexOfFirst = indexOfLast - itemsPerPage;
                    const visible = assignments.slice(indexOfFirst, indexOfLast);
                    return visible.map((item) => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.description || 'N/A'}</td>
                        <td>{item.assignedBy}</td>
                        <td>{
                          item.assignedTo && Array.isArray(item.assignedTo)
                            ? item.assignedTo.map(user => user.userName || user.name || 'Unknown').join(', ')
                            : (item.assignedTo?.userName || 'Unassigned')
                        }</td>
                      <td>{item.status}</td>
                      <td>{item.priority}</td>
                      <td>{item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <div className="ma-actions">
                          <button className="ma-btn-action ma-btn-view" title="View">
                            <FaEye />
                          </button>
                          <button className="ma-btn-action ma-btn-edit" title="Edit">
                            <FaEdit />
                          </button>
                          <button className="ma-btn-action ma-btn-delete" title="Delete">
                            <FaTrash />
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
      <Footer />
    </div>
  );
};

export default MainAssignment;
