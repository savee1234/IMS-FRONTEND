import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';
import { FaFileAlt, FaHistory, FaComments, FaCheck } from 'react-icons/fa';

const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:44354/api/complaints');
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const result = await response.json();
    const complaints = result.data || result; // Handle both old and new response formats

    // Map backend data to frontend display format
    return complaints.map((complaint, index) => ({
      id: complaint._id || index + 1,
      reference: complaint.requestRef || `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear().toString().slice(-2)}-0001`,
      requester: complaint.contactName || 'Unknown',
      priority: complaint.priority || 'Medium',
      status: complaint.solutionName === 'Resolved' ? 'Completed' :
              complaint.solutionName === 'In Progress' ? 'Ongoing' : 'Open',
      issue: complaint.complaint || complaint.complaintDetails || 'No details provided',
      phone: complaint.searchMobile || complaint.mobile || 'N/A',
      email: complaint.email || 'N/A',
      created: complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      // Store organization contact person info if available
      organizationContactPerson: complaint.organizationContactPersonId ? {
        name: complaint.organizationContactPersonId.name,
        organizationName: complaint.organizationContactPersonId.organizationName,
        email: complaint.organizationContactPersonId.email,
        mobileNumber: complaint.organizationContactPersonId.mobileNumber
      } : null,
      // Store original complaint data for actions
      originalComplaint: complaint
    }));
  } catch (error) {
    console.error('Error fetching complaints:', error);
    // Return empty array if API fails
    return [];
  }
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError('Failed to load complaints');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

   const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    videoBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -2,
    },
    gradientOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%)',
      zIndex: -1,
    },
  };

  return (
    <div style={styles.page}>
          <video autoPlay loop muted style={styles.videoBackground}>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={styles.gradientOverlay}></div>
      <Navbar />
      <main style={{
        flex: 1,
        padding: '24px'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: '#0d0d0eff'
        }}>
          My Tasks
        </h1>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginBottom: '12px',
              backgroundColor: '#10b981',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#059669'
              }
            }}
          >
            {loading ? 'Loading...' : 'Refresh Tasks'}
          </button>

          {error && (
            <div style={{
              color: '#dc2626',
              backgroundColor: '#fee2e2',
              padding: '8px 12px',
              borderRadius: '4px',
              marginBottom: '12px'
            }}>
              {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <button style={{
              backgroundColor: '#1048b9ff',
              padding: '4px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#1048b9ff'
              }
            }}>
              CSV
            </button>
            <button style={{
              backgroundColor: '#1048b9ff',
              padding: '4px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#1048b9ff'
              }
            }}>
              Excel
            </button>
            <button style={{
              backgroundColor: '#1048b9ff',
              padding: '4px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#1048b9ff'
              }
            }}>
              PDF
            </button>
            <button style={{
              backgroundColor: '#1048b9ff',
              padding: '4px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#1048b9ff'
              }
            }}>
              Print
            </button>
          </div>
        </div>

        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            minWidth: '100%',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#e5e7eb',
                color: '#374151'
              }}>
                <th style={{ padding: '12px', textAlign: 'center' }}>Reference</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Requester</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Priority</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Issue</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Phone</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Created</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ padding: '24px', textAlign: 'center' }}>
                    Loading complaints...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ padding: '24px', textAlign: 'center' }}>
                    No complaints found. Submit a complaint to see it here.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                <tr key={task.id} style={{
                  borderTop: '1px solid #e5e7eb',
                  ':hover': {
                    backgroundColor: '#f9fafb'
                  }
                }}>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.reference}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.requester}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.priority}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: task.status === 'Open'
                          ? '#fee2e2'
                          : task.status === 'Ongoing'
                          ? '#fef3c7'
                          : '#d1fae5',
                        color: task.status === 'Open'
                          ? '#dc2626'
                          : task.status === 'Ongoing'
                          ? '#92400e'
                          : '#065f46'
                      }}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.issue}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.phone}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.email}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{task.created}</td>
                  <td style={{ 
                    padding: '12px', 
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <button
                      title="Details"
                      onClick={() => handleViewDetails(task.originalComplaint)}
                      style={{
                        color: '#2563eb',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        ':hover': {
                          color: '#1e40af'
                        }
                      }}
                    >
                      <FaFileAlt />
                    </button>
                    <button title="History" style={{
                      color: '#4b5563',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      ':hover': {
                        color: '#1f2937'
                      }
                    }}>
                      <FaHistory />
                    </button>
                    <button title="Comments" style={{
                      color: '#7c3aed',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      ':hover': {
                        color: '#5b21b6'
                      }
                    }}>
                      <FaComments />
                    </button>
                    <button title="Done" style={{
                      color: '#059669',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      ':hover': {
                        color: '#047857'
                      }
                    }}>
                      <FaCheck />
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          fontSize: '0.875rem'
        }}>
          <span>Showing 1 to {tasks.length} of {tasks.length} entries</span>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button style={{
              padding: '4px 10px',
              border: '1px solid #151515ff',
              borderRadius: '4px',
              color: '#f7f7fbff',
              backgroundColor: 'black',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#0e0e0eff'
              },
              ':disabled': {
                opacity: 0.5
              }
            }} disabled>
              Previous
            </button>
            <button style={{
              padding: '4px 18px',
              border: '1px solid #151515ff',
              borderRadius: '4px',
              color: '#f7f7fbff',
              backgroundColor: 'black',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#f3f4f6'
              }
            }}>
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Complaint Details Modal */}
      {showModal && selectedComplaint && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <h2 style={{
                margin: 0,
                color: '#1f2937',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                Complaint Details - {selectedComplaint.requestRef || 'New Complaint'}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            {/* Complaint Details Content */}
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* Request Information */}
              <section>
                <h3 style={{
                  color: '#3b82f6',
                  margin: '0 0 16px 0',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '8px'
                }}>
                  📋 Request Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Reference Number:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937', fontSize: '1.1rem', fontWeight: '500' }}>
                      {selectedComplaint.requestRef || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Category:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.categoryType || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Organization:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.organization || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Solution Type:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.solutionType || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Status:
                    </label>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      backgroundColor: selectedComplaint.solutionName === 'Resolved' ? '#d1fae5' :
                                     selectedComplaint.solutionName === 'In Progress' ? '#fef3c7' : '#fee2e2',
                      color: selectedComplaint.solutionName === 'Resolved' ? '#065f46' :
                             selectedComplaint.solutionName === 'In Progress' ? '#92400e' : '#dc2626'
                    }}>
                      {selectedComplaint.solutionName || 'Pending'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h3 style={{
                  color: '#3b82f6',
                  margin: '0 0 16px 0',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '8px'
                }}>
                  👤 Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Contact Name:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.contactName || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Email:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Mobile:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.mobile || selectedComplaint.searchMobile || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Office Mobile:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.officeMobile || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Title:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.title || 'N/A'}</p>
                  </div>
                </div>
              </section>

              {/* Organization Contact Person Information */}
              {selectedComplaint.organizationContactPerson && (
                <section>
                  <h3 style={{
                    color: '#10b981',
                    margin: '0 0 16px 0',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '8px'
                  }}>
                    🏢 Organization Contact Person
                  </h3>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      <div>
                        <label style={{ fontWeight: '600', color: '#166534', display: 'block', marginBottom: '4px' }}>
                          Name:
                        </label>
                        <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>
                          {selectedComplaint.organizationContactPerson.name || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontWeight: '600', color: '#166534', display: 'block', marginBottom: '4px' }}>
                          Organization:
                        </label>
                        <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>
                          {selectedComplaint.organizationContactPerson.organizationName || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontWeight: '600', color: '#166534', display: 'block', marginBottom: '4px' }}>
                          Email:
                        </label>
                        <p style={{ margin: 0, color: '#166534' }}>
                          {selectedComplaint.organizationContactPerson.email || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontWeight: '600', color: '#166534', display: 'block', marginBottom: '4px' }}>
                          Mobile:
                        </label>
                        <p style={{ margin: 0, color: '#166534' }}>
                          {selectedComplaint.organizationContactPerson.mobileNumber || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Communication Details */}
              <section>
                <h3 style={{
                  color: '#3b82f6',
                  margin: '0 0 16px 0',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '8px'
                }}>
                  📞 Communication Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Medium:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.medium || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Medium Source:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.mediumSource || 'N/A'}</p>
                  </div>
                </div>
              </section>

              {/* Complaint Details */}
              <section>
                <h3 style={{
                  color: '#3b82f6',
                  margin: '0 0 16px 0',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '8px'
                }}>
                  📝 Complaint Details
                </h3>
                <div>
                  <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Complaint Description:
                  </label>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    minHeight: '60px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedComplaint.complaint || 'No complaint description provided'}
                  </div>
                </div>
              </section>

              {/* Assignment Information */}
              {(selectedComplaint.mainAssignment || selectedComplaint.subAssignment) && (
                <section>
                  <h3 style={{
                    color: '#3b82f6',
                    margin: '0 0 16px 0',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '8px'
                  }}>
                    👥 Assignment Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                        Main Assignment:
                      </label>
                      <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.mainAssignment || 'N/A'}</p>
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                        Sub Assignment:
                      </label>
                      <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.subAssignment || 'N/A'}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Document Information */}
              {(selectedComplaint.docRef || selectedComplaint.docSubject || selectedComplaint.remarks) && (
                <section>
                  <h3 style={{
                    color: '#3b82f6',
                    margin: '0 0 16px 0',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '8px'
                  }}>
                    📄 Document Information
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {selectedComplaint.docRef && (
                      <div>
                        <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Document Reference:
                        </label>
                        <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.docRef}</p>
                      </div>
                    )}
                    {selectedComplaint.docSubject && (
                      <div>
                        <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Document Subject:
                        </label>
                        <p style={{ margin: 0, color: '#1f2937' }}>{selectedComplaint.docSubject}</p>
                      </div>
                    )}
                    {selectedComplaint.remarks && (
                      <div>
                        <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Remarks:
                        </label>
                        <div style={{
                          padding: '12px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {selectedComplaint.remarks}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Timestamps */}
              <section>
                <h3 style={{
                  color: '#3b82f6',
                  margin: '0 0 16px 0',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '8px'
                }}>
                  🕒 Timestamps
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Created At:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>
                      {selectedComplaint.createdAt ? new Date(selectedComplaint.createdAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Last Updated:
                    </label>
                    <p style={{ margin: 0, color: '#1f2937' }}>
                      {selectedComplaint.updatedAt ? new Date(selectedComplaint.updatedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div style={{
              marginTop: '32px',
              paddingTop: '16px',
              borderTop: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyTasks;