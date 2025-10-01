import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBell, FaUser, FaEnvelope, FaSms, FaToggleOn, FaToggleOff, FaCalendarAlt, FaExclamationTriangle, FaEdit, FaEye } from 'react-icons/fa';
import backgroundVideo from '../assets/Background.mp4';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      recipient: 'Engineer A',
      type: 'Email',
      status: 'Sent',
      notifyCustomer: true,
      date: '2025-07-17',
    },
    {
      id: 2,
      recipient: 'Supervisor B',
      type: 'SMS',
      status: 'Failed',
      notifyCustomer: false,
      date: '2025-07-17',
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Sent':
        return { backgroundColor: '#dcfce7', color: '#16a34a' };
      case 'Failed':
        return { backgroundColor: '#fee2e2', color: '#dc2626' };
      case 'Pending':
        return { backgroundColor: '#fef3c7', color: '#d97706' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email':
        return <FaEnvelope style={{ marginRight: '0.5rem' }} />;
      case 'SMS':
        return <FaSms style={{ marginRight: '0.5rem' }} />;
      default:
        return <FaBell style={{ marginRight: '0.5rem' }} />;
    }
  };

  const toggleCustomerNotify = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, notifyCustomer: !n.notifyCustomer } : n
      )
    );
  };

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
          <div className="notification-section" style={{ padding: '2rem' }}>
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
              <FaBell style={{ marginRight: '0.75rem', color: '#3b82f6' }} />
              <h2 style={{ margin: 0 }}>Notification Center</h2>
            </div>

            {/* Notifications Table */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '1px solid #d1d5db',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
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
                        <FaUser style={{ marginRight: '0.5rem' }} />
                        Recipient
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
                        <FaBell style={{ marginRight: '0.5rem' }} />
                        Type
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
                        <FaExclamationTriangle style={{ marginRight: '0.5rem' }} />
                        Status
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
                        Date
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
                        <FaBell style={{ marginRight: '0.5rem' }} />
                        Notify Customer
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
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((n) => (
                    <tr key={n.id}>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <FaUser style={{ marginRight: '0.5rem', color: '#6b7280' }} />
                          {n.recipient}
                        </div>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {getTypeIcon(n.type)}
                          {n.type}
                        </div>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          ...getStatusStyle(n.status)
                        }}>
                          {n.status}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <FaCalendarAlt style={{ marginRight: '0.5rem', color: '#6b7280' }} />
                          {n.date}
                        </div>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        color: '#374151'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {n.notifyCustomer ? 
                            <FaToggleOn style={{ marginRight: '0.5rem', color: '#10b981', fontSize: '1.2rem' }} /> :
                            <FaToggleOff style={{ marginRight: '0.5rem', color: '#ef4444', fontSize: '1.2rem' }} />
                          }
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            backgroundColor: n.notifyCustomer ? '#dcfce7' : '#fee2e2',
                            color: n.notifyCustomer ? '#16a34a' : '#dc2626'
                          }}>
                            {n.notifyCustomer ? 'ON' : 'OFF'}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        border: '1px solid #d1d5db',
                        textAlign: 'center'
                      }}>
                        <button
                          onClick={() => toggleCustomerNotify(n.id)}
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
                          title="Toggle Notification"
                        >
                          {n.notifyCustomer ? <FaToggleOff /> : <FaToggleOn />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Alert Section */}
            <div style={{
              background: 'rgba(239, 246, 255, 0.95)',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #dbeafe',
              borderLeft: '4px solid #3b82f6',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <FaExclamationTriangle style={{ marginRight: '0.75rem', color: '#3b82f6', marginTop: '0.25rem' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '1.1rem', fontWeight: '600' }}>Auto Notification</h4>
                  <p style={{ margin: 0, color: '#1e40af', lineHeight: '1.6' }}>
                    System will automatically notify supervisors if issues are pending beyond critical time limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notification;
