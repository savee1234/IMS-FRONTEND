import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const ComplaintManagement = () => {
  const navigate = useNavigate();
  const [privileges, setPrivileges] = useState([
    { task: 'Update Task', role: 'Operation', enabled: false },
    { task: 'Update Task', role: 'Grant Privilege', enabled: false },
    { task: 'Update Sub Task', role: 'Operation', enabled: false },
  ]);

  const handleToggle = (index) => {
    const updated = [...privileges];
    updated[index].enabled = !updated[index].enabled;
    setPrivileges(updated);
  };

  const handleBackToUserManagement = () => {
    navigate('/users');
  };

  const styles = {
    container: {
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
    contentContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      marginTop: '64px',
      marginBottom: '64px',
    },
    formContainer: {
      width: '100%',
      maxWidth: '900px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    header: {
      background: 'linear-gradient(135deg, #007bff, #0056b3)',
      color: '#fff',
      padding: '20px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: '22px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    backButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
    },
    backButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateX(-3px)',
    },
    spacer: {
      width: '100px'
    },
    controls: {
      padding: '25px 30px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '15px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
    },
    searchInput: {
      flex: 1,
      minWidth: '250px',
      padding: '12px 15px',
      border: '1px solid #ced4da',
      borderRadius: '8px',
      fontSize: '15px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      backgroundColor: '#fff',
    },
    searchInputFocus: {
      borderColor: '#007bff',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      outline: 'none',
    },
    saveButton: {
      padding: '12px 25px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    saveButtonHover: {
      backgroundColor: '#218838',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
    toggleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: '#fff',
      padding: '8px 15px',
      borderRadius: '30px',
      border: '1px solid #ced4da',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    toggleLabel: {
      fontWeight: '500',
      color: '#495057',
      fontSize: '15px',
    },
    tableContainer: {
      padding: '0 30px 30px 30px',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    tableHeader: {
      padding: '16px 20px',
      textAlign: 'left',
      backgroundColor: '#e9f0ff',
      fontWeight: '600',
      borderBottom: '2px solid #007bff',
      color: '#004085',
      fontSize: '15px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    tableCell: {
      padding: '16px 20px',
      borderBottom: '1px solid #e9ecef',
      fontSize: '15px',
      color: '#495057',
    },
    tableRow: {
      transition: 'background-color 0.2s',
    },
    tableRowHover: {
      backgroundColor: '#f8f9ff',
    },
    toggleSwitch: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    toggleSwitchTrack: (enabled) => ({
      width: '50px',
      height: '26px',
      borderRadius: '30px',
      backgroundColor: enabled ? '#28a745' : '#ced4da',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    toggleSwitchThumb: (enabled) => ({
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '2px',
      left: enabled ? '26px' : '2px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    }),
    statusText: {
      fontWeight: '500',
      fontSize: '14px',
    },
    statusActive: {
      color: '#28a745',
      fontWeight: '600',
    },
    statusInactive: {
      color: '#6c757d',
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      formContainer: {
        margin: '15px',
        maxWidth: 'calc(100% - 30px)',
      },
      controls: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
      searchInput: {
        minWidth: '100%',
      },
      toggleContainer: {
        justifyContent: 'center',
      },
    },
  };

  // State for search input focus
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // State for save button hover
  const [isSaveButtonHovered, setIsSaveButtonHovered] = useState(false);
  // State for back button hover
  const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
  // State for table row hover
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={styles.container}>
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.gradientOverlay}></div>
      
      <Navbar />
      
      <div style={styles.contentContainer}>
        <div style={styles.formContainer}>
          {/* Header */}
          <div style={styles.header}>
            <button
              onClick={handleBackToUserManagement}
              style={{
                ...styles.backButton,
                ...(isBackButtonHovered ? styles.backButtonHover : {}),
              }}
              onMouseEnter={() => setIsBackButtonHovered(true)}
              onMouseLeave={() => setIsBackButtonHovered(false)}
            >
              ← Back to User Management
            </button>
            <span>Complaint Management</span>
            <div style={styles.spacer}></div> {/* Spacer for alignment */}
          </div>

          {/* Controls */}
          <div style={styles.controls}>
            <input
              type="text"
              placeholder="Search tasks, roles or privileges..."
              style={{
                ...styles.searchInput,
                ...(isSearchFocused ? styles.searchInputFocus : {}),
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button
              style={{
                ...styles.saveButton,
                ...(isSaveButtonHovered ? styles.saveButtonHover : {}),
              }}
              onMouseEnter={() => setIsSaveButtonHovered(true)}
              onMouseLeave={() => setIsSaveButtonHovered(false)}
            >
              Save Privileges
            </button>
            <div style={styles.toggleContainer}>
              <span style={styles.toggleLabel}>Global Toggle:</span>
              <div style={{
                width: '50px',
                height: '26px',
                borderRadius: '30px',
                backgroundColor: '#28a745',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: '26px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                }}></div>
              </div>
              <span style={{...styles.statusText, ...styles.statusActive}}>ON</span>
            </div>
          </div>

          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Task</th>
                  <th style={styles.tableHeader}>Authorization Role</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                {privileges.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      ...styles.tableRow,
                      ...(hoveredRow === index ? styles.tableRowHover : {}),
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                    }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={styles.tableCell}>{item.task}</td>
                    <td style={styles.tableCell}>{item.role}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.statusText,
                        ...(item.enabled ? styles.statusActive : styles.statusInactive)
                      }}>
                        {item.enabled ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.toggleSwitch}>
                        <div
                          onClick={() => handleToggle(index)}
                          style={{
                            width: '50px',
                            height: '26px',
                            borderRadius: '30px',
                            backgroundColor: item.enabled ? '#28a745' : '#ced4da',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            position: 'absolute',
                            top: '2px',
                            left: item.enabled ? '26px' : '2px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          }}></div>
                        </div>
                        <span style={{
                          ...styles.statusText,
                          ...(item.enabled ? styles.statusActive : styles.statusInactive)
                        }}>
                          {item.enabled ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ComplaintManagement;
