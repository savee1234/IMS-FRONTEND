import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MainAssignment = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const assignments = [
    {
      requestReference: '25-10-23-0001',
      enteredDate: '10/23/2025 12:24:44 PM',
      assignedBy: 'Romaine Murcott',
      assignedTo: 'Romaine Murcott',
      remark: '',
    },
    {
      requestReference: '25-10-23-0002',
      enteredDate: '10/24/2025 09:15:32 AM',
      assignedBy: 'John Smith',
      assignedTo: 'Sarah Johnson',
      remark: 'Urgent follow-up required',
    },
    {
      requestReference: '25-10-23-0003',
      enteredDate: '10/24/2025 02:45:17 PM',
      assignedBy: 'Emily Davis',
      assignedTo: 'Michael Brown',
      remark: 'Awaiting customer response',
    },
  ];

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Poppins', 'Roboto', sans-serif",
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e0eafc 100%)',
    },
    contentSection: {
      padding: '60px 20px',
      flex: 1,
      background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M0 50c0-27.614 22.386-50 50-50s50 22.386 50 50-22.386 50-50 50S0 77.614 0 50z"/%3E%3C/g%3E%3C/svg%3E")',
    },
    contentContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    formCard: {
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      padding: '48px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
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
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '18px',
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      fontSize: '0.95rem',
    },
    thead: {
      background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
      color: 'white',
      textTransform: 'none',
      fontWeight: 600,
    },
    th: {
      padding: '20px 28px',
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '0.4px',
      textAlign: 'left',
      whiteSpace: 'nowrap',
    },
    td: {
      padding: '18px 28px',
      borderBottom: '1px solid #e2e8f0',
      color: '#1e293b',
      fontSize: '0.95rem',
      transition: 'background 0.25s ease',
    },
    trHover: {
      background: 'linear-gradient(to right, #f8fafc, #f1f5f9)',
    },
    referenceCell: {
      fontWeight: 700,
      color: '#2563eb',
      fontSize: '1rem',
    },
    remarkCell: {
      fontStyle: 'italic',
      color: '#475569',
      maxWidth: '240px',
      wordBreak: 'break-word',
      lineHeight: '1.5',
    },
    noRemark: {
      color: '#94a3b8',
      fontStyle: 'italic',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    actionButton: {
      border: 'none',
      borderRadius: '12px',
      padding: '10px',
      width: '44px',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      color: 'white',
      fontSize: '1rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    viewButton: {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    },
    editButton: {
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    },
    pagination: {
      marginTop: '48px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
    },
    pageButton: {
      background: 'linear-gradient(135deg, #2563eb, #1e40af)',
      color: '#fff',
      border: 'none',
      borderRadius: '14px',
      padding: '14px 28px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
      fontFamily: 'inherit',
    },
    pageButtonHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 28px rgba(37, 99, 235, 0.4)',
    },
    pageInfo: {
      color: '#1e293b',
      fontWeight: 700,
      fontSize: '1.05rem',
      padding: '14px 32px',
      backgroundColor: '#eff6ff',
      borderRadius: '14px',
      border: '1px solid #bfdbfe',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />

      <section style={styles.contentSection}>
        <div style={styles.contentContainer}>
          <div style={styles.formCard}>
            {/* Modern Header */}
            <div style={styles.formHeader}>
              <div style={styles.topicBadge}>Main Assignments</div>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Request Reference</th>
                    <th style={styles.th}>Entered Date</th>
                    <th style={styles.th}>Assigned By</th>
                    <th style={styles.th}>Assigned To</th>
                    <th style={styles.th}>Remark</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((item, index) => (
                    <tr
                      key={index}
                      onMouseEnter={(e) => (e.currentTarget.style.background = styles.trHover.background)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ ...styles.td, ...styles.referenceCell }}>{item.requestReference}</td>
                      <td style={styles.td}>{item.enteredDate}</td>
                      <td style={styles.td}>{item.assignedBy}</td>
                      <td style={styles.td}>{item.assignedTo}</td>
                      <td style={{ ...styles.td, ...styles.remarkCell }}>
                        {item.remark ? item.remark : <span style={styles.noRemark}>No remarks</span>}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <button
                            style={{ ...styles.actionButton, ...styles.viewButton }}
                            onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
                            onMouseLeave={(e) => (e.target.style.opacity = 1)}
                          >
                            <FaEye />
                          </button>
                          <button
                            style={{ ...styles.actionButton, ...styles.editButton }}
                            onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
                            onMouseLeave={(e) => (e.target.style.opacity = 1)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            style={{ ...styles.actionButton, ...styles.deleteButton }}
                            onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
                            onMouseLeave={(e) => (e.target.style.opacity = 1)}
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
                  e.target.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)';
                }}
              >
                <FaChevronLeft /> Previous
              </button>

              <div style={styles.pageInfo}>Page {currentPage} of 1</div>

              <button
                style={styles.pageButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.pageButtonHover.transform;
                  e.target.style.boxShadow = styles.pageButtonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)';
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

export default MainAssignment;