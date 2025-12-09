import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaTasks, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
    <div className="complaint-onboard-wrapper users-page assignments-page">
      <Sidebar />
      <div className="complaint-onboard-background" />

      <div className="content-wrapper" style={{ marginLeft: '400px' }}>
        <div className="complaint-form-container users-wide" style={{ marginTop: '48px', maxWidth: '1720px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="page-header">
            <div className="page-header-content" style={{ justifyContent: 'flex-start' }}>
              <h1>All Assignments</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="config-form">
            <div className="form-grid assignments-form-grid">
              <div className="form-field">
                <label className="config-label">Employee</label>
                <div className="field-control input-wrapper">
                  <select
                    className={`input select-ash ${filters.employee ? '' : 'empty'}`}
                    value={filters.employee}
                    onChange={(e) => handleChange('employee', e.target.value)}
                  >
                    <option value="">Select Employees</option>
                    <option value="john.doe">John Doe</option>
                    <option value="jane.smith">Jane Smith</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="config-label">Status</label>
                <div className="field-control input-wrapper">
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
                </div>
              </div>
              <div className="form-field">
                <label className="config-label">From Date</label>
                <div className="field-control input-wrapper">
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => handleChange('fromDate', e.target.value)}
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
                    onChange={(e) => handleChange('toDate', e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>
            <div className="config-actions" style={{ justifyContent: 'flex-end', paddingRight: '36px' }}>
              <button type="submit" className="config-btn-primary">Submit</button>
            </div>
          </form>

          <div className="um-toolbar" style={{ marginTop: '1.4rem', marginBottom: '0.4rem' }}>
            <div className="um-toolbar-left"></div>
            <div className="um-toolbar-right">
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
                <tr>
                  <td>25-10-23-0001</td>
                  <td>
                    <div>{'10/23/2025'}</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{'12:24:44 PM'}</div>
                  </td>
                  <td>Romaine Murcott</td>
                  <td>Romaine Murcott</td>
                  <td>No remarks</td>
                  <td>
                    <div className="um-actions">
                      <button
                        title="View"
                        type="button"
                        className="um-btn um-btn-view"
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
                        <FaEye size={16} />
                      </button>
                      <button
                        title="Update"
                        type="button"
                        className="um-btn um-btn-update"
                        onClick={() => {
                          openStatus({
                            id: '25-10-23-0001',
                            requestRef: '25-10-23-0001',
                            contactPerson: 'Chandima Dunuwila'
                          });
                        }}
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        title="Progress"
                        type="button"
                        className="um-btn um-btn-progress"
                        onClick={() => openProgress({ requestRef: '25-10-23-0001' })}
                      >
                        <FaTasks size={16} />
                      </button>
                      <button
                        title="Delete"
                        type="button"
                        className="um-btn um-btn-delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pager" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
            <button type="button" className="config-btn-secondary pager-btn"><FaChevronLeft /> Previous</button>
            <button type="button" className="config-btn-primary next-btn pager-btn">Next <FaChevronRight /></button>
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>Page 1 of 1</span>
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

export default AllAssignments;
