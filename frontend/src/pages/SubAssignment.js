import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
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
    <div className="complaint-onboard-wrapper users-page assignments-page">
      <Sidebar />
      <div className="complaint-onboard-background" />
      <div className="content-wrapper" style={{ marginLeft: '280px' }}>
        <div className="complaint-form-container users-wide" style={{ marginTop: '48px', maxWidth: '1600px', width: '94%', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="page-header">
            <div className="page-header-content" style={{ justifyContent: 'flex-start' }}>
              <h1>Sub Assignments</h1>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="config-form">
            <div className="form-grid assignments-form-grid">
              <div className="form-field">
                <label className="config-label">Employee</label>
                <div className="field-control input-wrapper">
                  <select
                    className={`input select-ash ${filters.employee ? '' : 'empty'}`}
                    value={filters.employee}
                    onChange={(e) => setFilters(prev => ({ ...prev, employee: e.target.value }))}
                  >
                    <option value="">Select Employees</option>
                    <option value="romaine.murcott">Romaine Murcott</option>
                    <option value="john.smith">John Smith</option>
                    <option value="sarah.johnson">Sarah Johnson</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="config-label">Status</label>
                <div className="field-control input-wrapper">
                  <select
                    className={`input select-ash ${filters.status ? '' : 'empty'}`}
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="config-label">From Date</label>
                <div className="field-control input-wrapper">
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, fromDate: e.target.value }))}
                    className="input"
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="config-label">To Date</label>
                <div className="field-control input-wrapper">
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, toDate: e.target.value }))}
                    className="input"
                  />
                </div>
              </div>
            </div>
            <div className="config-actions" style={{ justifyContent: 'flex-end', paddingRight: '36px' }}>
              <button type="submit" className="config-btn-primary">Submit</button>
            </div>
          </form>

          <div className="um-toolbar" style={{ marginTop: '1.4rem', marginBottom: '0.5rem' }}>
            <div className="um-toolbar-left"></div>
            <div className="um-toolbar-right">
              <div className="um-search-wrapper">
                <FaSearch className="um-search-icon" size={16} />
                <input
                  className="um-search-input"
                  placeholder="Search sub assignments"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="um-table-container">
              <table className="um-table">
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
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.requestReference}</td>
                      <td>
                        <div>{item.enteredDate}</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.enteredTime}</div>
                      </td>
                      <td><div style={{ color: '#0f172a', lineHeight: 1.6, fontWeight: 400 }}>{item.assignedByName}</div></td>
                      <td><div style={{ color: '#0f172a', fontWeight: 400 }}>{item.assignedByDesignation}</div></td>
                      <td><div style={{ color: '#0f172a', lineHeight: 1.6, fontWeight: 400 }}>{item.assignedToName}</div></td>
                      <td><div style={{ color: '#0f172a', fontWeight: 400 }}>{item.assignedToDesignation}</div></td>
                      <td>
                        {item.remarks || ''}
                      </td>
                      <td>
                        <div className="um-actions">
                          <button className="um-btn um-btn-view" title="View" type="button">
                            <FaEye size={16} />
                          </button>
                          <button className="um-btn um-btn-update" title="Update" type="button">
                            <FaEdit size={16} />
                          </button>
                          <button className="um-btn um-btn-delete" title="Delete" type="button">
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>

          <div className="pager" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
            <button type="button" className="config-btn-secondary pager-btn"><FaChevronLeft /> Previous</button>
            <button type="button" className="config-btn-primary next-btn pager-btn">Next <FaChevronRight /></button>
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>Page {currentPage} of 1</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubAssignment;
