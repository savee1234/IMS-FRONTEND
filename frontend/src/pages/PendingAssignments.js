import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaHistory, FaComments, FaCheck, FaFilter, FaCalendarAlt, FaUser, FaTasks, FaClipboardList } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import backgroundVideo from '../assets/Background.mp4';


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
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: '#fef3c7', color: '#d97706' };
      case 'In Progress':
        return { backgroundColor: '#dbeafe', color: '#2563eb' };
      case 'Resolved':
        return { backgroundColor: '#dcfce7', color: '#16a34a' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };
  
  return (
    <span style={{
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      ...getStatusStyle(status)
    }}>
      {status}
    </span>
  );
};

const DetailsModal = ({ request, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a237e',
        color: 'white',
        borderRadius: '12px 12px 0 0'
      }}>
        <h5 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Request Details - {request.reference}</h5>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0',
          width: '24px',
          height: '24px'
        }}>×</button>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Reference:</strong> {request.reference}</p>
            <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Created Date:</strong> {request.created}</p>
            <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Requester:</strong> {request.requester}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Category:</strong> {request.category}</p>
            <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Assigned By:</strong> {request.assignFrom}</p>
            <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Status:</strong> <StatusBadge status={request.status} /></p>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />
        <h6 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.1rem', fontWeight: '600' }}>Complaint Details:</h6>
        <p style={{ color: '#374151', lineHeight: '1.6' }}>{request.details}</p>
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
        <button onClick={onClose} style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>Close</button>
      </div>
    </div>
  </div>
);

const ProgressModal = ({ request, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      maxWidth: '700px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a237e',
        color: 'white',
        borderRadius: '12px 12px 0 0'
      }}>
        <h5 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Progress Details - {request.reference}</h5>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0',
          width: '24px',
          height: '24px'
        }}>×</button>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h6 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.1rem', fontWeight: '600' }}>Assignment History:</h6>
        <div style={{ marginBottom: '1.5rem' }}>
          {request.progress.map((step, idx) => (
            <div key={idx} style={{
              padding: '1rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#374151' }}><strong>From:</strong> {step.from}</span>
                <span style={{ color: '#374151' }}><strong>To:</strong> {step.to}</span>
                <span style={{ color: '#374151' }}><strong>Date:</strong> {step.date}</span>
              </div>
              {step.note && <div style={{ fontSize: '0.85rem', color: '#6b7280' }}><strong>Note:</strong> {step.note}</div>}
            </div>
          ))}
        </div>
        <h6 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.1rem', fontWeight: '600' }}>Main & Sub Assigners:</h6>
        <p style={{ margin: '0 0 0.5rem 0', color: '#374151' }}><strong>Main Assigner:</strong> {request.assignFrom}</p>
        <p style={{ margin: 0, color: '#374151' }}><strong>Current Assignee:</strong> {request.assignTo}</p>
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
        <button onClick={onClose} style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>Close</button>
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
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />

      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '1rem',
        marginTop: '1rem',
        maxWidth: '1400px',
        margin: '1rem auto 0 auto'
      }}>
        <div className="config-content" style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div className="pending-assignments-section" style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: '2rem',
              textAlign: 'left',
              borderBottom: '2px solid #3b82f6',
              paddingBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FaTasks style={{ marginRight: '0.75rem', color: '#3b82f6' }} />
              <h2 style={{ margin: 0 }}>My Pending Main Assignments</h2>
            </div>

            {/* Filter Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              marginBottom: '2rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                color: '#1f2937',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                <FaFilter style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                Filter by Date Range
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FaCalendarAlt style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                    From Date:
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: '#374151'
                    }}
                    placeholderText="Select start date"
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FaCalendarAlt style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                    To Date:
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: '#374151'
                    }}
                    placeholderText="Select end date"
                  />
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '1px solid #d1d5db',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                border: '1px solid #d1d5db'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      backgroundColor: '#1a237e',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaClipboardList style={{ marginRight: '0.5rem' }} />
                        Request Reference
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      backgroundColor: '#1a237e',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                        Entered Date
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      backgroundColor: '#1a237e',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaUser style={{ marginRight: '0.5rem' }} />
                        Assigned By
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      backgroundColor: '#1a237e',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaTasks style={{ marginRight: '0.5rem' }} />
                        Status
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'center',
                      border: '1px solid #d1d5db',
                      fontWeight: '600',
                      backgroundColor: '#1a237e',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaEdit style={{ marginRight: '0.5rem' }} />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151',
                        fontWeight: '600'
                      }}>{item.reference}</td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>{item.created}</td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>{item.assignFrom}</td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}><StatusBadge status={item.status} /></td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        textAlign: 'center'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleViewDetails(item)}
                            style={{
                              backgroundColor: '#4CAF50',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px 8px',
                              marginRight: '6px'
                            }}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleViewProgress(item)}
                            style={{
                              backgroundColor: '#2196F3',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px 8px',
                              marginRight: '6px'
                            }}
                            title="View Progress"
                          >
                            <FaHistory />
                          </button>
                          <button
                            style={{
                              backgroundColor: '#FF9800',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px 8px',
                              marginRight: '6px'
                            }}
                            title="Comments"
                          >
                            <FaComments />
                          </button>
                          <button
                            style={{
                              backgroundColor: '#4CAF50',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px 8px'
                            }}
                            title="Mark as Done"
                          >
                            <FaCheck />
                          </button>
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

      {detailsModal && selectedRequest && <DetailsModal request={selectedRequest} onClose={handleCloseModals} />}
      {progressModal && selectedRequest && <ProgressModal request={selectedRequest} onClose={handleCloseModals} />}

      <Footer />
    </div>
  );
};

export default PendingAssignments;
