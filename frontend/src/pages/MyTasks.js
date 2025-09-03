import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';
import { FaFileAlt, FaHistory, FaComments, FaCheck } from 'react-icons/fa';

const fetchTasks = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: '1',
          reference: 'REQ-001',
          requester: 'Chamodi Perera',
          priority: 'High',
          status: 'Open',
          issue: 'Unable to access system',
          phone: '0712345678',
          email: 'chamodi@slt.com',
          created: '2025-05-27',
        },
        {
          id: '2',
          reference: 'REQ-002',
          requester: 'Saman Silva',
          priority: 'Low',
          status: 'Completed',
          issue: 'Software installation request',
          phone: '0771234567',
          email: 'saman@slt.com',
          created: '2025-06-01',
        },
        {
          id: '3',
          reference: 'REQ-003',
          requester: 'Nadeesha Fernando',
          priority: 'Medium',
          status: 'Ongoing',
          issue: 'Network connectivity issue',
          phone: '0789123456',
          email: 'nadeesha@slt.com',
          created: '2025-06-15',
        },
      ]);
    }, 500)
  );

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
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
          <button style={{
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
          }}>
            View Tasks
          </button>

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
              {tasks.map((task) => (
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
                    <button title="Details" style={{
                      color: '#2563eb',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      ':hover': {
                        color: '#1e40af'
                      }
                    }}>
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
              ))}
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
      <Footer />
    </div>
  );
};

export default MyTasks;