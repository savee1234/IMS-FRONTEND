import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import './complaint/ComplaintForm.css';

const MainAssignment = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const assignments = [
    {
      requestReference: '25-10-23-0001',
      enteredDate: '10/23/2025 12:24:44 PM',
      assignedBy: 'Romaine Murcott',
      assignedTo: 'Romaine Murcott',
      remark: '',
    },
    {
      requestReference: '25-10-23-0002',
      enteredDate: '10/24/2025 09:15:32 AM',
      assignedBy: 'John Smith',
      assignedTo: 'Sarah Johnson',
      remark: 'Urgent follow-up required',
    },
    {
      requestReference: '25-10-23-0003',
      enteredDate: '10/24/2025 02:45:17 PM',
      assignedBy: 'Emily Davis',
      assignedTo: 'Michael Brown',
      remark: 'Awaiting customer response',
    },
  ];

  const [filters, setFilters] = useState({
    employee: '',
    status: '',
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10)
  });

  const [search, setSearch] = useState('');

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="complaint-onboard-wrapper users-page assignments-page">
      <Sidebar />
      <div className="complaint-onboard-background" />

      <div className="content-wrapper" style={{ marginLeft: '400px' }}>
        <div className="complaint-form-container users-wide" style={{ marginTop: '48px', maxWidth: '1720px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="page-header">
            <div className="page-header-content" style={{ justifyContent: 'flex-start' }}>
              <h1>Main Assignments</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="config-form">
            <div className="form-grid assignments-form-grid">
              <Field label="Employee">
                <select
                  className={`input select-ash ${filters.employee ? '' : 'empty'}`}
                  value={filters.employee}
                  onChange={(e) => handleChange('employee', e.target.value)}
                >
                  <option value="">Select Employees</option>
                  <option value="romaine.murcott">Romaine Murcott</option>
                  <option value="john.smith">John Smith</option>
                  <option value="sarah.johnson">Sarah Johnson</option>
                </select>
              </Field>
              <Field label="Status">
                <select
                  className={`input select-ash ${filters.status ? '' : 'empty'}`}
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
            <div className="config-actions" style={{ justifyContent: 'flex-end', paddingRight: '36px' }}>
              <button type="submit" className="config-btn-primary">Submit</button>
            </div>
          </form>

          <div className="um-toolbar">
            <div className="um-toolbar-left">
              <div className="um-search-wrapper">
                <FaSearch className="um-search-icon" size={16} />
                <input
                  className="um-search-input"
                  placeholder="Search assignments"
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
                  <th>Assigned To</th>
                  <th>Remark</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((item, index) => (
                  <tr key={index}>
                    <td>{item.requestReference}</td>
                    <td>
                      <div>{item.enteredDate.split(' ')[0]}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.enteredDate.split(' ').slice(1).join(' ')}</div>
                    </td>
                    <td>{item.assignedBy}</td>
                    <td>{item.assignedTo}</td>
                    <td>{item.remark || 'No remarks'}</td>
                    <td>
                      <div className="um-actions">
                        <button title="View" type="button" className="um-btn um-btn-view">
                          <FaEye size={16} />
                        </button>
                        <button title="Edit" type="button" className="um-btn um-btn-update">
                          <FaEdit size={16} />
                        </button>
                        <button title="Delete" type="button" className="um-btn um-btn-delete">
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
            <button type="button" className="config-btn-secondary pager-btn">
              <FaChevronLeft /> Previous
            </button>
            <button type="button" className="config-btn-primary next-btn pager-btn">
              Next <FaChevronRight />
            </button>
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>Page {currentPage} of 1</span>
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

export default MainAssignment;
