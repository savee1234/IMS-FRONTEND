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
    {
      requestReference: '25-11-10-0003',
      enteredDate: '11/10/2025',
      enteredTime: '11:30:45 AM',
      assignedByName: 'John Smith',
      assignedByDesignation: 'Manager',
      assignedToName: 'Sarah Johnson',
      assignedToDesignation: 'Engineer',
      remarks: 'Urgent follow-up required',
    },
    {
      requestReference: '25-11-10-0004',
      enteredDate: '11/10/2025',
      enteredTime: '02:15:33 PM',
      assignedByName: 'Emily Davis',
      assignedByDesignation: 'Supervisor',
      assignedToName: 'Michael Brown',
      assignedToDesignation: 'Technician',
      remarks: 'Awaiting customer response',
    },
  ];

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      backgroundAttachment: 'fixed'
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
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    },
    formHeader: {
      textAlign: 'center',
      marginBottom: '30px',
      padding: '20px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      borderRadius: '12px',
      color: 'white',
      boxShadow: '0 4px 8px rgba(59, 130, 246, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },
    formTitle: {
      fontSize: '2.5rem',
      fontWeight: 800,
      margin: '0',
      background: 'linear-gradient(90deg, #1e40af, #3b82f6, #000000)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    },
    formSubtitle: {
      fontSize: '1.25rem',
      color: '#e2e8f0',
      margin: '10px 0 0 0',
      fontWeight: 400,
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    },
    topicBadge: {
      display: 'inline-block',
      padding: '8px 20px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      fontSize: '1.2rem',
      fontWeight: '700',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    },

    // Enhanced Table Styles
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
      background: 'white',
      marginTop: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      textAlign: 'left'
    },
    thead: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    th: {
      backgroundColor: 'transparent',
      color: 'white',
      padding: '20px 24px',
      fontWeight: '700',
      fontSize: '1.1rem',
      textTransform: 'none',
      letterSpacing: '0',
      border: 'none',
      fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', sans-serif",
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    },
    td: {
      padding: '20px 24px',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '1.05rem',
      color: '#0f172a',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    },
    tr: {
      '&:hover td': {
        backgroundColor: '#f0f9ff'
      }
    },
    trEven: {
      backgroundColor: '#f8fafc'
    },
    trEvenHover: {
      backgroundColor: '#f0f9ff'
    },
    // Enhanced table cell styling
    referenceCell: {
      fontWeight: '700',
      color: '#1d4ed8',
      fontSize: '1.1rem',
      position: 'relative',
      paddingLeft: '20px'
    },
    referenceCellBefore: {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6'
    },
    dateTimeCell: {
      color: '#475569',
      fontWeight: '500',
      lineHeight: '1.6'
    },
    nameCell: {
      fontWeight: '600',
      color: '#0f172a',
      lineHeight: '1.6'
    },
    designationCell: {
      fontSize: '0.9rem',
      color: '#64748b',
      fontWeight: '400'
    },
    remarkCell: {
      fontStyle: 'italic',
      color: '#64748b',
      maxWidth: '200px',
      wordWrap: 'break-word'
    },
    noRemark: {
      color: '#94a3b8',
      fontStyle: 'italic'
    },
    
    // Enhanced Action Buttons
    actionCell: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center'
    },
    actionButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 8px rgba(59, 130, 246, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },
    actionButtonHover: {
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
    },
    editButton: {
      backgroundColor: '#f59e0b',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },

    // Enhanced Pagination
    pagination: {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px'
    },
    pageButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '14px 28px',
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 6px 12px rgba(59, 130, 246, 0.25)',
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    },
    pageButtonHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.35)'
    },
    pageInfo: {
      color: '#0f172a',
      fontWeight: '700',
      fontSize: '1.1rem',
      padding: '14px 28px',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '12px',
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    
    // Responsive
    '@media (max-width: 768px)': {
      formCard: {
        padding: '20px'
      },
      tableContainer: {
        fontSize: '0.9rem'
      },
      th: {
        padding: '16px 18px',
        fontSize: '0.95rem'
      },
      td: {
        padding: '16px 18px',
        fontSize: '0.95rem'
      },
      pagination: {
        flexDirection: 'column',
        gap: '15px'
      },
      pageButton: {
        padding: '12px 24px',
        fontSize: '1rem'
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
            {/* Modern Header */}
            <div style={styles.formHeader}>
              <div style={styles.topicBadge}>Sub Assignments</div>
            </div>
            
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
                    <tr 
                      key={index} 
                      style={index % 2 === 0 ? styles.trEven : styles.tr}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? styles.trEvenHover.backgroundColor : styles.tr['&:hover td'].backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? styles.trEven.backgroundColor : styles.td.backgroundColor;
                      }}
                    >
                      <td style={{...styles.td, ...styles.referenceCell}}>
                        <span style={{ position: 'relative' }}>
                          {item.requestReference}
                        </span>
                      </td>
                      <td style={{...styles.td, ...styles.dateTimeCell}}>
                        <div>{item.enteredDate}</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '400' }}>{item.enteredTime}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.nameCell}>{item.assignedByName}</div>
                        <div style={styles.designationCell}>{item.assignedByDesignation}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.nameCell}>{item.assignedToName}</div>
                        <div style={styles.designationCell}>{item.assignedToDesignation}</div>
                      </td>
                      <td style={{...styles.td, ...styles.remarkCell}}>
                        {item.remarks ? item.remarks : (
                          <span style={styles.noRemark}>No remarks</span>
                        )}
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
                            style={{...styles.actionButton, ...styles.editButton}}
                            onMouseEnter={(e) => {
                              e.target.style.transform = styles.actionButtonHover.transform;
                              e.target.style.boxShadow = '0 8px 16px rgba(245, 158, 11, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'none';
                              e.target.style.boxShadow = '0 4px 8px rgba(245, 158, 11, 0.2)';
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            style={{...styles.actionButton, ...styles.deleteButton}}
                            onMouseEnter={(e) => {
                              e.target.style.transform = styles.actionButtonHover.transform;
                              e.target.style.boxShadow = '0 8px 16px rgba(239, 68, 68, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'none';
                              e.target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.2)';
                            }}
                          >
                            <FaTrash />
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