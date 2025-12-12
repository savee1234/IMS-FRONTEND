import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaFileAlt, FaHistory, FaTrash, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';

const MainAssignment = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const assignments = [
    {
      requestReference: '25-10-23-0001',
      enteredDate: '10/23/2025',
      enteredTime: '12:24:44 PM',
      assignedBy: 'Romaine Murcott',
      assignedTo: 'Romaine Murcott',
      remark: 'No remarks',
    },
    {
      requestReference: '25-10-23-0002',
      enteredDate: '10/24/2025',
      enteredTime: '09:15:32 AM',
      assignedBy: 'John Smith',
      assignedTo: 'Sarah Johnson',
      remark: 'Urgent follow-up required',
    },
    {
      requestReference: '25-10-23-0003',
      enteredDate: '10/24/2025',
      enteredTime: '02:45:17 PM',
      assignedBy: 'Emily Davis',
      assignedTo: 'Michael Brown',
      remark: 'Awaiting customer response',
    },
  ];

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
    <div className="ma-wrapper">
      <Sidebar />
      <div className="ma-content">
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
            <table className="ma-table">
              <thead>
                <tr>
                  <th>REQUEST REFERENCE</th>
                  <th>ENTERED DATE & TIME</th>
                  <th>ASSIGNED BY</th>
                  <th>ASSIGNED TO</th>
                  <th>REMARK</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((item, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 600 }}>{item.requestReference}</td>
                    <td>
                      <div>{item.enteredDate}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{item.enteredTime}</div>
                    </td>
                    <td>{item.assignedBy}</td>
                    <td>{item.assignedTo}</td>
                    <td>{item.remark}</td>
                    <td>
                      <div className="ma-actions">
                        <button className="ma-btn-action ma-btn-view" title="View">
                          <FaFileAlt color="#ffffff" />
                        </button>
                        <button className="ma-btn-action ma-btn-edit" title="Update">
                          <FaHistory color="#ffffff" />
                        </button>
                        <button className="ma-btn-action ma-btn-delete" title="Delete">
                          <FaTrash color="#ffffff" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ma-footer-row">
            <button className="ma-pagination-btn">
              &lt; Previous
            </button>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Page {currentPage} of 1</span>
            <button className="ma-pagination-btn next">
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
