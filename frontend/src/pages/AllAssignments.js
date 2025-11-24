import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaTasks } from 'react-icons/fa';
import Navbar from '../components/Navbar';
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
    <div
      className="complaint-onboard-wrapper assignments-page"
      style={{
        minHeight: '100vh',
        background: `url(${process.env.PUBLIC_URL}/new.jpg) center center / cover no-repeat fixed`
      }}
    >
      <Navbar />

      <div className="content-wrapper">
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>All Assignments</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid assignments-form-grid">
              <div className="form-field">
                <label className="field-label">Employee</label>
                <div className="field-control input-wrapper">
                  <select
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
                <label className="field-label">Status</label>
                <div className="field-control input-wrapper">
                  <select
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
                <label className="field-label">From Date</label>
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
                <label className="field-label">To Date</label>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>

          <div className="form-field full" style={{ marginBottom: '0.75rem' }}>
            <label className="field-label">Search</label>
            <div className="field-control input-wrapper">
              <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-sm"
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Entered Date</th>
                  <th>Assigned By Name</th>
                  <th>Assigned To Name</th>
                  <th>Days Pending</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>REQ/—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start' }}>
                      <button
                        title="View"
                        className="btn"
                        style={{ backgroundColor: '#4CAF50', color: '#fff' }}
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
                        <FaEye />
                      </button>
                      <button
                        title="Update"
                        className="btn"
                        style={{ backgroundColor: '#FFB300', color: '#fff' }}
                        onClick={() => {
                          openStatus({
                            id: '25-10-23-0001',
                            requestRef: '25-10-23-0001',
                            contactPerson: 'Chandima Dunuwila'
                          });
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Progress"
                        className="btn"
                        style={{ backgroundColor: '#2563eb', color: '#fff' }}
                        onClick={() => openProgress({ requestRef: '25-10-23-0001' })}
                      >
                        <FaTasks />
                      </button>
                      <button
                        title="Delete"
                        className="btn"
                        style={{ backgroundColor: '#F44336', color: '#fff' }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem' }}>
            <button type="button" className="btn btn-primary">Previous</button>
            <button type="button" className="btn btn-primary">Next</button>
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>Page 1 of 0</span>
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


