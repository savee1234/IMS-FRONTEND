import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
    <div className="complaint-onboard-wrapper assignments-page">
      <Navbar />
      <div className="complaint-onboard-background" />

      <div className="content-wrapper">
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>Main Assignments</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="config-form">
            <div className="form-grid assignments-form-grid">
              <div className="form-field">
                <label className="config-label">Employee</label>
                <div className="field-control input-wrapper">
                  <select
                    className="config-input"
                    value={filters.employee}
                    onChange={(e) => handleChange('employee', e.target.value)}
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
                    className="config-input"
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
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
                    onChange={(e) => handleChange('fromDate', e.target.value)}
                    className="config-input"
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="config-label">To Date</label>
                <div className="field-control input-wrapper">
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => handleChange('toDate', e.target.value)}
                    className="config-input"
                  />
                </div>
              </div>
            </div>
            <div className="config-actions">
              <button type="submit" className="config-btn-primary">Submit</button>
            </div>
          </form>

          <div className="form-field full" style={{ marginBottom: '0.75rem' }}>
            <label className="config-label">Search</label>
            <div className="field-control input-wrapper">
              <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="config-input"
              />
            </div>
          </div>

          <div className="config-card">
            <table className="config-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Entered Date</th>
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
                    <td>{item.enteredDate}</td>
                    <td>{item.assignedBy}</td>
                    <td>{item.assignedTo}</td>
                    <td>{item.remark || 'No remarks'}</td>
                    <td>
                      <div className="config-table-actions">
                        <button title="View" type="button" className="config-icon-btn">
                          <FaEye size={16} />
                        </button>
                        <button title="Edit" type="button" className="config-icon-btn">
                          <FaEdit size={16} />
                        </button>
                        <button title="Delete" type="button" className="config-icon-btn">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem' }}>
            <button type="button" className="config-btn-secondary">
              <FaChevronLeft /> Previous
            </button>
            <button type="button" className="config-btn-primary">
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

export default MainAssignment;
