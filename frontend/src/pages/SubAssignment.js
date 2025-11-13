import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaComments } from 'react-icons/fa';

const SubAssignment = () => {
  const navigate = useNavigate();
  
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
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
      backgroundColor: '#f8fafc'
    },
    
    // Content Section
    contentSection: {
      padding: '30px 20px',
      flex: 1
    },
    contentContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    formCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#0E3A7C',
      marginBottom: '20px',
      textAlign: 'center',
      fontFamily: "'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    },
    
    // Table Styles
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      textAlign: 'left'
    },
    thead: {
      background: 'linear-gradient(135deg, #0E3A7C 0%, #1e40af 100%)',
      color: 'white'
    },
    th: {
      padding: '16px 20px',
      fontWeight: '600',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: 'none'
    },
    td: {
      padding: '16px 20px',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '0.9rem',
      color: '#334155',
      backgroundColor: 'white',
      transition: 'all 0.2s ease'
    },
    tr: {
      '&:hover td': {
        backgroundColor: '#f8fafc'
      }
    },
    actionCell: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    actionButton: {
      backgroundColor: '#0E3A7C',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 6px rgba(14, 58, 124, 0.2)'
    },
    actionButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(14, 58, 124, 0.3)'
    },
    orangeButton: {
      backgroundColor: '#F8991D',
      color: '#0E3A7C'
    },
    blueButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    dateTimeCell: {
      lineHeight: '1.4'
    },
    emptyRemarks: {
      color: '#94a3b8',
      fontStyle: 'italic'
    },
    
    // Pagination
    pagination: {
      marginTop: '25px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px'
    },
    pageButton: {
      backgroundColor: '#0E3A7C',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(14, 58, 124, 0.2)'
    },
    pageButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(14, 58, 124, 0.3)'
    },
    pageInfo: {
      color: '#0E3A7C',
      fontWeight: '600',
      fontSize: '0.9rem',
      padding: '10px 20px',
      backgroundColor: 'rgba(14, 58, 124, 0.1)',
      borderRadius: '8px'
    },
    
    // Responsive
    '@media (max-width: 768px)': {
      formCard: {
        padding: '20px'
      },
      tableContainer: {
        fontSize: '0.8rem'
      },
      th: {
        padding: '12px 15px'
      },
      td: {
        padding: '12px 15px'
      },
      pagination: {
        flexDirection: 'column',
        gap: '10px'
      },
      pageButton: {
        padding: '8px 16px',
        fontSize: '0.8rem'
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
    <div style={styles.pageContainer}>
      <Navbar />
      
      {/* Content Section */}
      <section style={styles.contentSection}>
        <div style={styles.contentContainer}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>My Sub Assignments</h2>
            
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Request Reference</th>
                    <th style={styles.th}>Entered Date & Time</th>
                    <th style={styles.th}>Assigned By</th>
                    <th style={styles.th}>Assigned To</th>
                    <th style={styles.th}>Remarks</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} style={styles.tr}>
                      <td style={styles.td}>
                        <strong style={{ color: '#0E3A7C' }}>{item.requestReference}</strong>
                      </td>
                      <td style={{...styles.td, ...styles.dateTimeCell}}>
                        <div>{item.enteredDate}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.enteredTime}</div>
                      </td>
                      <td style={styles.td}>
                        <div>{item.assignedByName}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.assignedByDesignation}</div>
                      </td>
                      <td style={styles.td}>
                        <div>{item.assignedToName}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.assignedToDesignation}</div>
                      </td>
                      <td style={styles.td}>
                        {item.remarks || <span style={styles.emptyRemarks}>No remarks</span>}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actionCell}>
                          <button 
                            style={styles.actionButton}
                            onMouseEnter={(e) => {
                              e.target.style.transform = styles.actionButtonHover.transform;
                              e.target.style.boxShadow = styles.actionButtonHover.boxShadow;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'none';
                              e.target.style.boxShadow = styles.actionButton.boxShadow;
                            }}
                          >
                            <FaEye />
                          </button>
                          <button 
                            style={{...styles.actionButton, ...styles.orangeButton}}
                            onMouseEnter={(e) => {
                              e.target.style.transform = styles.actionButtonHover.transform;
                              e.target.style.boxShadow = '0 4px 10px rgba(248, 153, 29, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'none';
                              e.target.style.boxShadow = '0 2px 6px rgba(248, 153, 29, 0.2)';
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            style={{...styles.actionButton, ...styles.blueButton}}
                            onMouseEnter={(e) => {
                              e.target.style.transform = styles.actionButtonHover.transform;
                              e.target.style.boxShadow = '0 4px 10px rgba(59, 130, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'none';
                              e.target.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.2)';
                            }}
                          >
                            <FaComments />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={styles.pagination}>
              <button 
                style={styles.pageButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.pageButtonHover.transform;
                  e.target.style.boxShadow = styles.pageButtonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = styles.pageButton.boxShadow;
                }}
              >
                <FaChevronLeft /> Previous
              </button>
              
              <div style={styles.pageInfo}>
                Page 1 of 1
              </div>
              
              <button 
                style={styles.pageButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.pageButtonHover.transform;
                  e.target.style.boxShadow = styles.pageButtonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = styles.pageButton.boxShadow;
                }}
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SubAssignment;