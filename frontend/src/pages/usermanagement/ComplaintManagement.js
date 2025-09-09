import React, { useState } from 'react';

const ComplaintManagement = () => {
  const [privileges, setPrivileges] = useState([
    { task: 'Update Task', role: 'Operation', enabled: false },
    { task: 'Update Task', role: 'Grant Privilege', enabled: false },
    { task: 'Update Sub Task', role: 'Operation', enabled: false },
  ]);

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleToggle = (index) => {
    const updated = [...privileges];
    updated[index].enabled = !updated[index].enabled;
    setPrivileges(updated);
  };

  const styles = {
    container: {
      padding: '20px',
    },
    complaintInterface: {
      backgroundColor: 'transparent',
      borderRadius: '0px',
      boxShadow: 'none',
      border: 'none',
      overflow: 'visible',
    },
    controls: {
      padding: '25px 30px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '15px',
      backgroundColor: 'transparent',
      borderBottom: 'none',
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
      borderColor: '#1e40af',
      boxShadow: '0 0 0 0.2rem rgba(30, 64, 175, 0.25)',
      outline: 'none',
    },
    saveButton: {
      padding: '12px 25px',
      backgroundColor: '#1e40af',
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
      backgroundColor: '#1d4ed8',
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
      backgroundColor: 'transparent',
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
      backgroundColor: '#1e40af',
      fontWeight: '600',
      borderBottom: '2px solid #1e40af',
      color: 'white',
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
      backgroundColor: enabled ? '#22c55e' : '#ced4da',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    statusText: {
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    statusActive: {
      color: '#22c55e',
    },
    statusInactive: {
      color: '#6c757d',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.complaintInterface}>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search complaints..."
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = styles.searchInputFocus.borderColor;
              e.target.style.boxShadow = styles.searchInputFocus.boxShadow;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ced4da';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <button
            style={styles.saveButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor;
              e.target.style.transform = styles.saveButtonHover.transform;
              e.target.style.boxShadow = styles.saveButtonHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.saveButton.backgroundColor;
              e.target.style.transform = 'none';
              e.target.style.boxShadow = styles.saveButton.boxShadow;
            }}
          >
            Save Changes
          </button>

          <div style={styles.toggleContainer}>
            <span style={styles.toggleLabel}>Show Active Only:</span>
            <div
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '30px',
                backgroundColor: '#22c55e',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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
                          backgroundColor: item.enabled ? '#22c55e' : '#ced4da',
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
  );
};

export default ComplaintManagement;

