import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

  const toggleCustomerNotify = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, notifyCustomer: !n.notifyCustomer } : n
      )
    );
  };

  return (
    <div style={styles.page}>
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.gradientOverlay}></div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Notification Center</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Recipient</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Notify Customer</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id}>
                  <td style={styles.td}>{n.recipient}</td>
                  <td style={styles.td}>{n.type}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: n.status === 'Sent' ? 'green' : 'red',
                      fontWeight: '600',
                    }}
                  >
                    {n.status}
                  </td>
                  <td style={styles.td}>{n.date}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        backgroundColor: n.notifyCustomer ? '#10b981' : '#f87171',
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: '0.85rem',
                      }}
                    >
                      {n.notifyCustomer ? 'ON' : 'OFF'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => toggleCustomerNotify(n.id)}
                      style={styles.button}
                    >
                      Toggle Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.alert}>
          <p>
            <strong>Auto Notification:</strong> System will notify supervisors if
            issues are pending beyond critical time limits.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

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
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: 'rgba(249, 250, 251, 0.95)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    maxWidth: '1000px',
    margin: '2rem auto 4rem',
    marginTop: '50px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#1e3a8a',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  th: {
    backgroundColor: '#1e3a8a',
    color: '#fff',
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.9rem',
  },
  td: {
    padding: '0.9rem',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '0.9rem',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#1e3a8a',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'background-color 0.3s ease',
  },
  alert: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#e0f2fe',
    borderRadius: '6px',
    borderLeft: '4px solid #0284c7',
    color: '#0369a1',
  },
};

export default Notification;
