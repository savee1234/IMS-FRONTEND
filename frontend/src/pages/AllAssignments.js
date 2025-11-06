import React, { useState } from 'react';
import { FaEye, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const AllAssignments = () => {
  const [filters, setFilters] = useState({
    employee: '',
    status: '',
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10)
  });

  const [search, setSearch] = useState('');

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intentionally left blank for now (no API). Keeps UI consistent with images.
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
    card: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      padding: '2rem'
    },
    pageTitle: {
      textAlign: 'center',
      margin: 0,
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(240px, 1fr))',
      gap: '1.25rem',
      alignItems: 'end',
      marginBottom: '0.75rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.35rem',
      color: '#374151',
      fontWeight: 600,
      fontSize: '0.95rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.95rem',
      color: '#374151',
      background: 'white'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.95rem',
      color: '#374151',
      background: 'white'
    },
    submitRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '1rem'
    },
    submitBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 600
    },
    tableHeaderRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
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
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '0',
      borderTop: '1px solid #e5e7eb'
    },
    td: {
      padding: '1rem',
      borderRight: '1px solid #f3f4f6',
      color: '#374151',
      fontSize: '0.95rem'
    },
    tableTopBar: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '0.75rem 0'
    },
    searchInput: {
      width: '360px',
      padding: '0.6rem 0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.95rem'
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
    submitRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '1rem',
      paddingRight: '1rem'
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
            <h1 style={styles.pageTitle}>All Assignments</h1>
          </div>

          <div style={styles.card}>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>Employee</label>
                  <select
                    value={filters.employee}
                    onChange={(e) => handleChange('employee', e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select Employees</option>
                    <option value="john.doe">John Doe</option>
                    <option value="jane.smith">Jane Smith</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>From Date</label>
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => handleChange('fromDate', e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>To Date</label>
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => handleChange('toDate', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.submitRow}>
                <button type="submit" style={styles.submitBtn}>Submit</button>
              </div>
            </form>

            <div style={styles.tableTopBar}>
              <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.tableHeaderRow}>
              <div style={styles.th}>Request Reference</div>
              <div style={styles.th}>Entered Date</div>
              <div style={styles.th}>Assigned By Name</div>
              <div style={styles.th}>Assigned To Name</div>
              <div style={styles.th}>Days Pending</div>
              <div style={styles.th}>Actions</div>
            </div>
            <div style={styles.tableBody}>
              <div style={styles.tableRow}>
                <div style={styles.td}>REQ/—</div>
                <div style={styles.td}>—</div>
                <div style={styles.td}>—</div>
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

export default AllAssignments;


