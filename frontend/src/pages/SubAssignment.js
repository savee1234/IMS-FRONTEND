import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
    <div className="complaint-onboard-wrapper assignments-page">
      <Navbar />
      <div className="complaint-onboard-background" />
      <div className="content-wrapper">
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>Sub Assignments</h1>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="config-form">
            <div className="form-grid assignments-form-grid">
              <Field label="Employee">
                <select
                  className="input"
                  value={filters.employee}
                  onChange={(e) => setFilters(prev => ({ ...prev, employee: e.target.value }))}
                >
                  <option value="">Select Employees</option>
                  <option value="romaine.murcott">Romaine Murcott</option>
                  <option value="john.smith">John Smith</option>
                  <option value="sarah.johnson">Sarah Johnson</option>
                </select>
              </Field>
              <Field label="Status">
                <select
                  className="input"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
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
                  onChange={(e) => setFilters(prev => ({ ...prev, fromDate: e.target.value }))}
                  className="input"
                />
              </Field>
              <Field label="To Date">
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, toDate: e.target.value }))}
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
            <table className="config-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Entered Date & Time</th>
                  <th>Assigned By</th>
                  <th>Assigned To</th>
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
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>{item.assignedByName}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.assignedByDesignation}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>{item.assignedToName}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.assignedToDesignation}</div>
                    </td>
                    <td>
                      {item.remarks ? item.remarks : (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No remarks</span>
                      )}
                    </td>
                    <td>
                      <div className="config-table-actions">
                        <button className="config-icon-btn" title="View" type="button">
                          <FaEye size={16} />
                        </button>
                        <button className="config-icon-btn" title="Update" type="button">
                          <FaEdit size={16} />
                        </button>
                        <button className="config-icon-btn" title="Delete" type="button">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.pagination}>
            <button type="button" className="config-btn-secondary"><FaChevronLeft /> Previous</button>
            <button type="button" className="config-btn-primary">Next <FaChevronRight /></button>
            <span style={styles.pageInfo}>Page {currentPage} of 1</span>
          </div>
        </div>
      </div>
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

export default SubAssignment;
