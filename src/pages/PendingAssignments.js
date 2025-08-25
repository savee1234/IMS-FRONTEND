import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaHistory, FaComments, FaCheck, FaEye, FaFilter } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import backgroundVideo from '../assets/Background.mp4';




const GlobalFix = () => (
  <style>{`
    html, body, #root {
      margin: 0 !important;
      padding: 0 !important;
      height: 100%;
      font-size: 15px; /* bigger font */
    }
    .navbar, header.navbar {
      border: 0 !important;
      box-shadow: none !important;
    }
    body {
      background: transparent !important;
    }

    /* Bigger icon button */
    .btn-icon {
      width: 32px;
      height: 32px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      padding: 0;
      border-radius: 50%;
      line-height: 0;
      transition: all 0.2s ease-in-out;
      border: 1px solid transparent;
      background-color: #f8f9fa;
      cursor: pointer;
    }
    .btn-icon svg {
      font-size: 16px;
    }
    .btn-icon:hover {
      transform: scale(1.2);
      background-color: rgba(0,0,0,0.05);
    }

    /* Table bigger */
    .table td, .table th {
      padding: 0.5rem 0.75rem;
      vertical-align: middle;
      font-size: 0.95rem;
    }
    .table thead th {
      font-size: 1rem;
      padding: 0.6rem 0.75rem;
    }

    /* Modal adjustments */
    .modal-content {
      border-radius: 12px;
    }
    .modal-header {
      border-bottom: none;
    }
    .modal-footer {
      border-top: none;
    }
  `}</style>
);


const dummyData = [
  {
    reference: 'REQ/2025/0021',
    created: '2025/06/27',
    requester: 'Software Developer AB - Karunada Poyyatil',
    category: 'Information',
    assignFrom: 'Admin Officer - Nimasha Wijesinghe',
    status: 'Pending',
    assignTo: 'Technical Team - John Smith',
    details: 'Full details of complaint would appear here...',
    progress: [
      { from: 'Admin Officer', to: 'Technical Team', date: '2025/06/27', note: 'Initial assignment' },
      { from: 'Technical Team', to: 'Network Specialist', date: '2025/06/28', note: 'Reassigned for network issues' }
    ]
  },
  {
    reference: 'REQ/2025/0018',
    created: '2025/06/27',
    requester: 'Software Developer AB - Karunada Poyyatil',
    category: 'Information',
    assignFrom: 'Admin Officer - Nimasha Wijesinghe',
    status: 'In Progress',
    assignTo: 'Support Team - Jane Doe',
    details: 'Another detailed complaint description would be here...',
    progress: [
      { from: 'Admin Officer', to: 'Support Team', date: '2025/06/27', note: 'Initial assignment' }
    ]
  },
];


const StatusBadge = ({ status }) => {
  const colorMap = { 'Pending': 'warning', 'In Progress': 'info', 'Resolved': 'success' };
  return (
    <span className={`badge bg-${colorMap[status] || 'secondary'} rounded-pill px-2 py-1`} style={{ fontSize: '0.85rem' }}>
      {status}
    </span>
  );
};

const DetailsModal = ({ request, onClose }) => (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content shadow-lg">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">Request Details - {request.reference}</h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <p><strong>Reference:</strong> {request.reference}</p>
              <p><strong>Created Date:</strong> {request.created}</p>
              <p><strong>Requester:</strong> {request.requester}</p>
            </div>
            <div className="col-md-6 mb-2">
              <p><strong>Category:</strong> {request.category}</p>
              <p><strong>Assigned By:</strong> {request.assignFrom}</p>
              <p><strong>Status:</strong> <StatusBadge status={request.status} /></p>
            </div>
          </div>
          <hr />
          <h6>Complaint Details:</h6>
          <p>{request.details}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary rounded-pill px-4" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

const ProgressModal = ({ request, onClose }) => (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content shadow-lg">
        <div className="modal-header bg-info text-white">
          <h5 className="modal-title">Progress Details - {request.reference}</h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <h6 className="mb-3">Assignment History:</h6>
          <ul className="list-group mb-4">
            {request.progress.map((step, idx) => (
              <li key={idx} className="list-group-item py-1">
                <div className="d-flex justify-content-between flex-wrap" style={{ fontSize: '0.9rem' }}>
                  <span><strong>From:</strong> {step.from}</span>
                  <span><strong>To:</strong> {step.to}</span>
                  <span><strong>Date:</strong> {step.date}</span>
                </div>
                {step.note && <div className="mt-1" style={{ fontSize: '0.85rem' }}><strong>Note:</strong> {step.note}</div>}
              </li>
            ))}
          </ul>
          <h6>Main & Sub Assigners:</h6>
          <p><strong>Main Assigner:</strong> {request.assignFrom}</p>
          <p><strong>Current Assignee:</strong> {request.assignTo}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary rounded-pill px-4" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);


const PendingAssignments = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [progressModal, setProgressModal] = useState(false);

  const handleViewDetails = (request) => { setSelectedRequest(request); setDetailsModal(true); };
  const handleViewProgress = (request) => { setSelectedRequest(request); setProgressModal(true); };
  const handleCloseModals = () => { setDetailsModal(false); setProgressModal(false); setSelectedRequest(null); };

  return (
    <>
      <GlobalFix />

      {/* Background */}
      <div className="position-fixed w-100 h-100 top-0 start-0" style={{ zIndex: -2 }}>
        <video autoPlay loop muted className="position-absolute w-100 h-100" style={{ objectFit: 'cover' }} src={backgroundVideo} />
        <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(rgba(92, 90, 90, 0.6), rgba(153, 153, 153, 0.6))' }} />
      </div>

      <Navbar />

      <div className="min-vh-100 d-flex flex-column">
        <div className="container py-5 d-flex flex-column align-items-center text-white">
          <h1 className="mb-4 text-center fw-bold display-6">My Pending Main Assignments</h1>

          <div className="card shadow-lg rounded-4 w-100" style={{ maxWidth: '1200px', backgroundColor: 'rgba(255,255,255,0.95)', color: '#000' }}>
            <div className="card-header d-flex align-items-center bg-white">
              <FaFilter className="me-2 text-primary" />
              <span className="fw-semibold">Filter by Date Range</span>
            </div>
            <div className="card-body">
              <div className="row g-2 align-items-end mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">From</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control form-control-sm"
                    placeholderText="Select start date"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">To</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="form-control form-control-sm"
                    placeholderText="Select end date"
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle mb-0 table-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Request Reference</th>
                      <th>Entered Date</th>
                      <th>Assigned By</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((item, idx) => (
                      <tr key={idx}>
                        <td className="fw-semibold">{item.reference}</td>
                        <td>{item.created}</td>
                        <td>{item.assignFrom}</td>
                        <td><StatusBadge status={item.status} /></td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-1">
                            <button className="btn-icon text-primary" title="View Details" onClick={() => handleViewDetails(item)}><FaEye /></button>
                            <button className="btn-icon text-info" title="View Progress" onClick={() => handleViewProgress(item)}><FaHistory /></button>
                            <button className="btn-icon text-secondary" title="Comments"><FaComments /></button>
                            <button className="btn-icon text-success" title="Mark as Done"><FaCheck /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>

      {detailsModal && selectedRequest && <DetailsModal request={selectedRequest} onClose={handleCloseModals} />}
      {progressModal && selectedRequest && <ProgressModal request={selectedRequest} onClose={handleCloseModals} />}
      {(detailsModal || progressModal) && <div className="modal-backdrop fade show"></div>}

      <Footer />
    </>
  );
};

export default PendingAssignments;
