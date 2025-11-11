import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MainAssignment = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const assignments = [
    {
      requestReference: '25-10-23-0001',
      enteredDate: '10/23/2025 12:24:44 PM',
      assignedBy: 'Romaine Murcott',
      assignedTo: 'Romaine Murcott',
      remark: '',
    },
  ];

  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
      background: 'linear-gradient(135deg, rgba(26, 58, 140, 0.1) 0%, rgba(74, 107, 202, 0.08) 100%)',
      backdropFilter: 'blur(8px)',
      zIndex: -1,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '2rem 1rem',
    },
    tableContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 20px 40px rgba(26, 58, 140, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08)',
      width: '95%',
      maxWidth: '1200px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1a3a8c 0%, #4a6bca 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1.5rem',
      letterSpacing: '-0.5px',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    th: {
      backgroundColor: '#1a3a8c',
      color: 'white',
      padding: '1rem 1.2rem',
      fontWeight: '600',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: 'none',
    },
    td: {
      padding: '1.2rem',
      borderBottom: '1px solid rgba(26, 58, 140, 0.1)',
      fontSize: '0.95rem',
      color: '#333',
      backgroundColor: 'white',
      transition: 'all 0.2s ease',
    },
    tr: {
      '&:hover td': {
        backgroundColor: '#f8faff',
        transform: 'translateY(-2px)',
      },
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.8rem',
    },
    button: {
      background: 'linear-gradient(135deg, #1a3a8c 0%, #4a6bca 100%)',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontSize: '1.2rem',
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(26, 58, 140, 0.2)',
    },
    pagination: {
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
    },
    pageButton: {
      background: 'linear-gradient(135deg, #1a3a8c 0%, #4a6bca 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '0.8rem 1.5rem',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(26, 58, 140, 0.3)',
    },
    pageInfo: {
      color: '#1a3a8c',
      fontWeight: '600',
      fontSize: '0.9rem',
      padding: '0.8rem 1.5rem',
      backgroundColor: 'rgba(26, 58, 140, 0.1)',
      borderRadius: '10px',
    },
  };

  return (
    <div style={styles.page}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={styles.videoBackground}
      >
        <source src={backgroundVideo} type="video/mp4" />
        <source src={backgroundVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.gradientOverlay}></div>

      <div style={styles.contentWrapper}>
        <Navbar />

        <div style={styles.tableContainer}>
          <h2 style={styles.title}>My Main Assignments</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Request Reference</th>
                <th style={styles.th}>Entered Date</th>
                <th style={styles.th}>Assigned By Name</th>
                <th style={styles.th}>Assigned To Name</th>
                <th style={styles.th}>Remark</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>
                    <strong style={{ color: '#1a3a8c' }}>{item.requestReference}</strong>
                  </td>
                  <td style={styles.td}>{item.enteredDate}</td>
                  <td style={styles.td}>{item.assignedBy}</td>
                  <td style={styles.td}>{item.assignedTo}</td>
                  <td style={styles.td}>{item.remark}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        style={styles.button}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-2px) scale(1.05)';
                          e.target.style.boxShadow = '0 8px 20px rgba(26, 58, 140, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 12px rgba(26, 58, 140, 0.2)';
                        }}
                      >
                        🔄
                      </button>
                      <button
                        style={styles.button}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-2px) scale(1.05)';
                          e.target.style.boxShadow = '0 8px 20px rgba(26, 58, 140, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 12px rgba(26, 58, 140, 0.2)';
                        }}
                      >
                        ✅
                      </button>
                      <button
                        style={styles.button}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-2px) scale(1.05)';
                          e.target.style.boxShadow = '0 8px 20px rgba(26, 58, 140, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 12px rgba(26, 58, 140, 0.2)';
                        }}
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.pagination}>
            <button
              style={styles.pageButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(26, 58, 140, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(26, 58, 140, 0.3)';
              }}
            >
              <FaChevronLeft /> Previous
            </button>
            <span style={styles.pageInfo}>Page 1 of 1</span>
            <button
              style={styles.pageButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(26, 58, 140, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(26, 58, 140, 0.3)';
              }}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainAssignment;
