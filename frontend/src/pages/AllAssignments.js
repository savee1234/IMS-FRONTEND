import React, { useState } from 'react';
import { FaFileAlt, FaHistory, FaTrash, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import AssignmentView from './AllAssignments/AssignmentView';
import UpdateStatusModal from './AllAssignments/UpdateStatusModal';
import ProgressModal from './AllAssignments/ProgressModal';
import './complaint/ComplaintForm.css';

const AllAssignments = () => {
  const [filters, setFilters] = useState({
    employee: '',
    status: '',
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10)
  });

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusAssignment, setStatusAssignment] = useState(null);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intentionally left blank for now (no API). Keeps UI consistent with images.
  };

  const openView = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const closeView = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  const openStatus = (assignment) => {
    setStatusAssignment(assignment);
    setStatusModalOpen(true);
  };

  const closeStatus = () => {
    setStatusModalOpen(false);
    setStatusAssignment(null);
  };

  const handleStatusSubmit = (payload) => {
    console.log('Status update payload:', payload);
    // TODO: call API to submit status update
    closeStatus();
  };

  const [progressOpen, setProgressOpen] = useState(false);
  const [progressAssignment, setProgressAssignment] = useState(null);

  const openProgress = (assignment) => {
    setProgressAssignment(assignment);
    setProgressOpen(true);
  };

  const closeProgress = () => {
    setProgressOpen(false);
    setProgressAssignment(null);
  };

  return (
    <div className="ma-wrapper">
      <Sidebar />
      <div className="ma-content">
        <div className="ma-header">
          <h1>All Assignments</h1>
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
              <option value="john.doe">John Doe</option>
              <option value="jane.smith">Jane Smith</option>
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
          <button type="button" onClick={handleSubmit} className="ma-btn-submit">Submit</button>
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
                <tr>
                  <td style={{ color: '#0f172a' }}>25-10-23-0001</td>
                  <td>
                    <div>10/23/2025</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>12:24:44 PM</div>
                  </td>
                  <td style={{ color: '#0f172a' }}>Romaine Murcott</td>
                  <td style={{ color: '#0f172a' }}>Romaine Murcott</td>
                  <td style={{ color: '#0f172a' }}>No remarks</td>
                  <td>
                    <div className="ma-actions">
                      <button
                        title="View"
                        type="button"
                        className="ma-btn-action ma-btn-view"
                        onClick={() => openView({
                          requestRef: '25-10-23-0001',
                          categoryType: 'INTERNAL',
                          documentSubject: 'gdfgd gdfgf g',
                          mediumSource: '657645374',
                          projectType: 'Type 1',
                          contactPerson: 'Chandima Dunuwila',
                          criticality: 'MEDIUM',
                          documentReference: 'SLT_Payslip_Report___Employee_310725.pdf',
                          medium: 'Call Centre (Test)',
                          organization: 'DEF',
                          projectName: 'NCPA',
                          remarks: 'd fd gdfg fd',
                          mainAssignment: [
                            { empNo: '015777', name: 'Romaine Murcott', designation: 'Software Developer-A8', remarks: 'd fd gdfg fd' }
                          ],
                          subAssignments: [
                            { empNo: '011111', name: 'Amalya Dayaratne', designation: 'Software Developer' },
                            { empNo: '015888', name: 'Piumi Kaushalya', designation: 'TTO' }
                          ]
                        })}
                      >
                        <FaFileAlt color="#ffffff" />
                      </button>
                      <button
                        title="Update"
                        type="button"
                        className="ma-btn-action ma-btn-edit"
                        onClick={() => {
                          openStatus({
                            id: '25-10-23-0001',
                            requestRef: '25-10-23-0001',
                            contactPerson: 'Chandima Dunuwila'
                          });
                        }}
                      >
                        <FaHistory color="#ffffff" />
                      </button>
                      <button
                        title="Delete"
                        type="button"
                        className="ma-btn-action ma-btn-delete"
                      >
                        <FaTrash color="#ffffff" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ma-footer-row">
            <button className="ma-pagination-btn">&lt; Previous</button>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Page 1 of 1</span>
            <button className="ma-pagination-btn next">Next &gt;</button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <AssignmentView assignment={selectedAssignment} onClose={closeView} />
      )}

      {statusModalOpen && (
        <UpdateStatusModal assignment={statusAssignment} onClose={closeStatus} onSubmit={handleStatusSubmit} />
      )}

      {progressOpen && (
        <ProgressModal assignment={progressAssignment} onClose={closeProgress} />
      )}

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

export default AllAssignments;


