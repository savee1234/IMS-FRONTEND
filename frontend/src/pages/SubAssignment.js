import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaFileAlt, FaHistory, FaTrash, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';

const SubAssignment = () => {
  const navigate = useNavigate();

  const data = [
    {
      requestReference: '25-11-10-0002',
      enteredDate: '11/10/2025',
      enteredTime: '10:16:01 AM',
      assignedByName: 'Romaine Murcott',
      assignedByDesignation: 'TTO',
      assignedToName: 'Piumi Kaushalya',
      assignedToDesignation: 'TTO',
      remarks: '',
    },
    {
      requestReference: '25-11-10-0003',
      enteredDate: '11/10/2025',
      enteredTime: '11:30:45 AM',
      assignedByName: 'John Smith',
      assignedByDesignation: 'Manager',
      assignedToName: 'Sarah Johnson',
      assignedToDesignation: 'Engineer',
      remarks: 'Urgent follow-up required',
    },
    {
      requestReference: '25-11-10-0004',
      enteredDate: '11/10/2025',
      enteredTime: '02:15:33 PM',
      assignedByName: 'Emily Davis',
      assignedByDesignation: 'Supervisor',
      assignedToName: 'Michael Brown',
      assignedToDesignation: 'Technician',
      remarks: 'Awaiting customer response',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="ma-wrapper">
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
          <button type="button" className="ma-btn-submit">Submit</button>
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
                  <th>ASSIGNED BY DESIGNATION</th>
                  <th>ASSIGNED TO</th>
                  <th>ASSIGNED TO DESIGNATION</th>
                  <th>REMARK</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: '#0f172a' }}>{item.requestReference}</td>
                    <td>
                      <div>{item.enteredDate}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.enteredTime}</div>
                    </td>
                    <td><div style={{ color: '#0f172a', fontWeight: 400 }}>{item.assignedByName}</div></td>
                    <td><div style={{ color: '#0f172a', fontWeight: 400 }}>{item.assignedByDesignation}</div></td>
                    <td><div style={{ color: '#0f172a', fontWeight: 400 }}>{item.assignedToName}</div></td>
                    <td><div style={{ color: '#0f172a', fontWeight: 400 }}>{item.assignedToDesignation}</div></td>
                    <td style={{ color: '#0f172a' }}>{item.remarks || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No remarks</span>}</td>
                    <td>
                      <div className="ma-actions">
                        <button className="ma-btn-action ma-btn-view" title="View">
                          <FaFileAlt />
                        </button>
                        <button className="ma-btn-action ma-btn-edit" title="Update">
                          <FaHistory />
                        </button>
                        <button className="ma-btn-action ma-btn-delete" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ma-footer-row">
            <button className="ma-pagination-btn">&lt; Previous</button>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Page {currentPage} of 1</span>
            <button className="ma-pagination-btn next">Next &gt;</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SubAssignment;
