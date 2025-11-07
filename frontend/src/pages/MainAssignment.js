import React from 'react';
import { FaEye, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const MainAssignment = () => {
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
    },
    container: {
      position: 'relative',
      zIndex: 1,
      padding: '1.5rem',
      marginTop: '1rem',
      width: '95vw',
      maxWidth: 'none',
      margin: '1rem auto 0 auto'
    },
    headerCard: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      padding: '1.25rem 1.5rem',
      marginBottom: '1rem'
    },
    pageTitle: {
      textAlign: 'center',
      margin: 0,
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      padding: '2rem'
    },
    tableHeaderRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '0',
      border: '1px solid #d1d5db',
      backgroundColor: '#1a237e',
      color: '#ffffff'
    },
    th: {
      padding: '1rem',
      borderRight: '1px solid #d1d5db',
      fontWeight: 600,
      fontSize: '0.95rem'
    },
    tableBody: {
      border: '1px solid #d1d5db',
      borderTop: 'none'
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '0',
      borderTop: '1px solid #e5e7eb'
    },
    td: {
      padding: '1rem',
      borderRight: '1px solid #f3f4f6',
      color: '#374151',
      fontSize: '0.95rem'
    },
    actionsCell: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    actionBtn: {
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 8px',
      color: 'white'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 0'
    },
    pagerBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5rem 0.9rem',
      cursor: 'pointer',
      fontWeight: 600
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

        <div style={styles.container}>
          <div style={styles.headerCard}>
            <h1 style={styles.pageTitle}>Main Assignment</h1>
          </div>

          <div style={styles.card}>
            <div style={styles.tableHeaderRow}>
              <div style={styles.th}>Main Assigner</div>
              <div style={styles.th}>Status</div>
              <div style={styles.th}>Actions</div>
            </div>
            <div style={styles.tableBody}>
              <div style={styles.tableRow}>
                <div style={styles.td}>—</div>
                <div style={styles.td}>—</div>
                <div style={{ ...styles.td, borderRight: 'none' }}>
                  <div style={styles.actionsCell}>
                    <button title="View" style={{ ...styles.actionBtn, backgroundColor: '#4CAF50' }}>
                      <FaEye />
                    </button>
                    <button title="Status" style={{ ...styles.actionBtn, backgroundColor: '#10b981' }}>
                      <FaInfoCircle />
                    </button>
                    <button title="Update" style={{ ...styles.actionBtn, backgroundColor: '#FFB300' }}>
                      <FaEdit />
                    </button>
                    <button title="Delete" style={{ ...styles.actionBtn, backgroundColor: '#F44336' }}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.pagination}>
              <button type="button" style={styles.pagerBtn}>Previous</button>
              <button type="button" style={styles.pagerBtn}>Next</button>
              <span style={{ marginLeft: '0.5rem', color: '#374151' }}>Page 1 of 0</span>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainAssignment;
