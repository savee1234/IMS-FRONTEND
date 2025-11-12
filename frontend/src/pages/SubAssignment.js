import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const SubAssignment = () => {
  const data = [
    {
      requestReference: '25-11-10-0002',
      enteredDate: '11/10/2025',
      enteredTime: '10:16:01 AM',
      assignedByName: 'Romaine Murcott',
      assignedByDesignation: 'TTO',
      assignedToName: 'Piumi Kaushalya',
      assignedToDesignation: 'TTO',
      remarks: '',
    },
  ];

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
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(5px)',
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
    container: {
      width: '90%',
      maxWidth: '1400px',
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(12px)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      overflow: 'hidden',
      padding: '2rem',
      marginTop: '2rem',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1c3d91 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '2rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      textAlign: 'left',
      minWidth: '1200px',
    },
    thead: {
      background: 'linear-gradient(135deg, #1c3d91 0%, #2563eb 100%)',
      color: 'white',
    },
    th: {
      padding: '16px 20px',
      fontWeight: '600',
      fontSize: '0.95rem',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    tr: {
      transition: 'all 0.3s ease',
    },
    td: {
      padding: '14px 20px',
      backgroundColor: 'rgba(255,255,255,0.95)',
      fontSize: '0.9rem',
      color: '#1f2937',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    actionCell: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    actionBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      width: '40px',
      height: '40px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
    },
    messageBtn: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    dateTimeCell: {
      lineHeight: '1.4',
    },
    emptyRemarks: {
      color: '#6b7280',
      fontStyle: 'italic',
    },
  };

  // Add hover effects
  const enhancedStyles = {
    ...styles,
    trHover: {
      ...styles.tr,
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }
    },
    tdHover: {
      ...styles.td,
      ':hover': {
        backgroundColor: 'rgba(248, 250, 252, 0.95)',
        transform: 'scale(1.02)',
      }
    },
    actionBtnHover: {
      ...styles.actionBtn,
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
      }
    }
  };

  // Example button click handlers
  const handleRefresh = (ref) => {
    alert(`Refreshing request ${ref}`);
  };

  const handleMessage = (ref) => {
    alert(`Opening chat for request ${ref}`);
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

        <div style={styles.container}>
          <h2 style={styles.heading}>My Sub Assignments</h2>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Request Reference</th>
                  <th style={styles.th}>Entered Date</th>
                  <th style={styles.th}>Assigned By Name</th>
                  <th style={styles.th}>Assigned By Designation</th>
                  <th style={styles.th}>Assigned To Name</th>
                  <th style={styles.th}>Assigned To Designation</th>
                  <th style={styles.th}>Remarks</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr 
                    key={index}
                    style={{
                      ...enhancedStyles.tr,
                      transform: 'translateY(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <td style={{
                      ...enhancedStyles.td,
                      fontWeight: '600',
                      color: '#1c3d91',
                    }}>
                      {item.requestReference}
                    </td>
                    <td style={{
                      ...enhancedStyles.td,
                      ...styles.dateTimeCell
                    }}>
                      <div style={{ fontWeight: '600' }}>{item.enteredDate}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{item.enteredTime}</div>
                    </td>
                    <td style={enhancedStyles.td}>{item.assignedByName}</td>
                    <td style={enhancedStyles.td}>
                      <span style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                      }}>
                        {item.assignedByDesignation}
                      </span>
                    </td>
                    <td style={enhancedStyles.td}>{item.assignedToName}</td>
                    <td style={enhancedStyles.td}>
                      <span style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                      }}>
                        {item.assignedToDesignation}
                      </span>
                    </td>
                    <td style={{
                      ...enhancedStyles.td,
                      ...(item.remarks ? {} : styles.emptyRemarks)
                    }}>
                      {item.remarks || 'No remarks'}
                    </td>
                    <td style={enhancedStyles.td}>
                      <div style={styles.actionCell}>
                        <button
                          style={enhancedStyles.actionBtnHover}
                          onClick={() => handleRefresh(item.requestReference)}
                          title="Refresh"
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
                          }}
                        >
                          🔄
                        </button>
                        <button
                          style={{
                            ...enhancedStyles.actionBtnHover,
                            ...styles.messageBtn
                          }}
                          onClick={() => handleMessage(item.requestReference)}
                          title="Message"
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                          }}
                        >
                          💬
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SubAssignment;