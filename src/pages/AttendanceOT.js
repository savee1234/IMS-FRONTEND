import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mockData = [
  { id: 1, name: 'Kasun Silva', date: '2025-07-06', hours: 2, status: 'Pending', comments: 'Worked remotely on server fix' },
  { id: 2, name: 'Nadeesha Perera', date: '2025-07-05', hours: 1.5, status: 'Approved', comments: 'Urgent bug fix' },
  { id: 3, name: 'Saman Wickramasinghe', date: '2025-07-06', hours: 3, status: 'Pending', comments: 'Network maintenance' }
];

const AttendanceOT = () => {
  const [records, setRecords] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    // Filter mock data according to search & date
    let filtered = [...mockData];
    if (filterDate) {
      filtered = filtered.filter(r => r.date === filterDate);
    }
    if (searchName) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    setRecords(filtered);
  }, [filterDate, searchName]);

  const handleApprove = (id) => {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, status: 'Approved' } : r)));
    // TODO: Backend API call for approve
  };

  const handleReject = (id) => {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, status: 'Rejected' } : r)));
    // TODO: Backend API call for reject
  };

  // Styles
  const styles = {
    container: {
      padding: '2rem',
      marginLeft: '220px', // Adjust for sidebar width if you have one, else set to 0
      maxWidth: '1200px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '80vh',
      backgroundColor: '#f4f7fa',
    },
    header: {
      color: '#2c3e50',
      marginBottom: '1.5rem',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '0.5rem',
      fontSize: '1.8rem',
      fontWeight: '700',
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    filterLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      color: '#34495e'
    },
    filterInput: {
      padding: '0.5rem',
      border: '1px solid #bdc3c7',
      borderRadius: '4px',
      fontSize: '0.9rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeader: {
      backgroundColor: '#3498db',
      color: 'white',
      textAlign: 'left',
      padding: '0.75rem',
      fontWeight: '600'
    },
    tableCell: {
      padding: '0.75rem',
      borderBottom: '1px solid #ecf0f1',
      verticalAlign: 'middle',
    },
    tableRow: {
      transition: 'background-color 0.2s',
      cursor: 'default',
    },
    tableRowHover: {
      backgroundColor: '#f8f9fa',
    },
    noRecords: {
      textAlign: 'center',
      padding: '1rem',
      color: '#7f8c8d'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      marginRight: '0.5rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.8rem',
      transition: 'background-color 0.2s'
    },
    approveButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
    },
    approveButtonHover: {
      backgroundColor: '#27ae60',
    },
    rejectButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    rejectButtonHover: {
      backgroundColor: '#c0392b',
    },
    statusPending: {
      color: '#f39c12',
      fontWeight: '600'
    },
    statusApproved: {
      color: '#2ecc71',
      fontWeight: '600'
    },
    statusRejected: {
      color: '#e74c3c',
      fontWeight: '600'
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return styles.statusPending;
      case 'Approved': return styles.statusApproved;
      case 'Rejected': return styles.statusRejected;
      default: return {};
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.header}>Attendance & Overtime Management</h2>

        <div style={styles.filterContainer}>
          <label style={styles.filterLabel}>
            Filter by Date:
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              style={styles.filterInput}
            />
          </label>

          <label style={styles.filterLabel}>
            Search Employee:
            <input
              type="text"
              placeholder="Enter name"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              style={styles.filterInput}
            />
          </label>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Employee Name</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>OT Hours</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Comments</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noRecords}>No records found matching your criteria</td>
              </tr>
            ) : (
              records.map(rec => (
                <tr key={rec.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{rec.name}</td>
                  <td style={styles.tableCell}>{rec.date}</td>
                  <td style={styles.tableCell}>{rec.hours}</td>
                  <td style={{ ...styles.tableCell, ...getStatusStyle(rec.status) }}>{rec.status}</td>
                  <td style={styles.tableCell}>{rec.comments}</td>
                  <td style={styles.tableCell}>
                    {rec.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(rec.id)}
                          style={{ ...styles.actionButton, ...styles.approveButton }}
                          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.approveButtonHover.backgroundColor}
                          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.approveButton.backgroundColor}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(rec.id)}
                          style={{ ...styles.actionButton, ...styles.rejectButton }}
                          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.rejectButtonHover.backgroundColor}
                          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.rejectButton.backgroundColor}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AttendanceOT;
