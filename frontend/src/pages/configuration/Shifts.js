import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Shifts = () => {
  const [shiftName, setShiftName] = useState('');
  const [fromHours, setFromHours] = useState('09');
  const [fromMinutes, setFromMinutes] = useState('00');
  const [fromAmPm, setFromAmPm] = useState('AM');
  const [toHours, setToHours] = useState('05');
  const [toMinutes, setToMinutes] = useState('00');
  const [toAmPm, setToAmPm] = useState('PM');
  
  // Sample shift data - replace with your actual data
  const [shifts] = useState([
    { id: 1, name: 'Morning', fromTime: '09:00 AM', toTime: '05:00 PM', createdBy: 'Admin', createdDtm: '2023-09-15 10:30 AM' },
    { id: 2, name: 'Night', fromTime: '09:00 PM', toTime: '05:00 AM', createdBy: 'Admin', createdDtm: '2023-09-15 10:30 AM' },
    { id: 3, name: 'Evening', fromTime: '01:00 PM', toTime: '09:00 PM', createdBy: 'Supervisor', createdDtm: '2023-09-16 02:15 PM' },
    { id: 4, name: 'Weekend', fromTime: '08:00 AM', toTime: '04:00 PM', createdBy: 'Manager', createdDtm: '2023-09-17 11:05 AM' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      shiftName,
      fromTime: `${fromHours}:${fromMinutes} ${fromAmPm}`,
      toTime: `${toHours}:${toMinutes} ${toAmPm}`
    });
  };

  const handleReset = () => {
    setShiftName('');
    setFromHours('09');
    setFromMinutes('00');
    setFromAmPm('AM');
    setToHours('05');
    setToMinutes('00');
    setToAmPm('PM');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <div style={styles.addHeader}>
          <h3 style={styles.cardTitle}>Add Shift Time</h3>
          <div style={styles.headerAccent} />
        </div>
        <div style={styles.formRow}>
          <div style={styles.shiftNameContainer}>
            <label style={styles.label}>Shift Name</label>
            <input
              type="text"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              style={styles.input}
              placeholder="Enter shift name"
            />
          </div>

          <div style={styles.timeContainer}>
            <div style={styles.timeGroup}>
              <label style={styles.label}>From Time</label>
              <div style={styles.timeInputs}>
                <select 
                  value={fromHours} 
                  onChange={(e) => setFromHours(e.target.value)}
                  style={styles.timeSelect}
                >
                  {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={`from-${hour}`} value={hour}>{hour}</option>
                  ))}
                </select>
                <span style={styles.timeSeparator}>:</span>
                <select 
                  value={fromMinutes} 
                  onChange={(e) => setFromMinutes(e.target.value)}
                  style={styles.timeSelect}
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={`from-min-${minute}`} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={fromAmPm} 
                  onChange={(e) => setFromAmPm(e.target.value)}
                  style={styles.ampmSelect}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div style={styles.timeGroup}>
              <label style={styles.label}>To Time</label>
              <div style={styles.timeInputs}>
                <select 
                  value={toHours} 
                  onChange={(e) => setToHours(e.target.value)}
                  style={styles.timeSelect}
                >
                  {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={`to-${hour}`} value={hour}>{hour}</option>
                  ))}
                </select>
                <span style={styles.timeSeparator}>:</span>
                <select 
                  value={toMinutes} 
                  onChange={(e) => setToMinutes(e.target.value)}
                  style={styles.timeSelect}
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={`to-min-${minute}`} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={toAmPm} 
                  onChange={(e) => setToAmPm(e.target.value)}
                  style={styles.ampmSelect}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            onClick={handleReset}
            style={styles.resetButton}
          >
            Reset
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            style={styles.saveButton}
          >
            Save
          </button>
        </div>
      </div>

      <div style={styles.tableSection}>
        <div style={styles.listSection}>
          <div style={styles.addHeader}>
            <h3 style={styles.cardTitle}>Shift List</h3>
            <div style={styles.headerAccent} />
          </div>
          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{...styles.th, ...styles.thCenter, ...styles.thFirst}}>Shift Name</th>
                  <th style={{...styles.th, ...styles.thCenter}}>Start Time</th>
                  <th style={{...styles.th, ...styles.thCenter}}>To Time</th>
                  <th style={{...styles.th, ...styles.thCenter}}>Created By Name</th>
                  <th style={{...styles.th, ...styles.thCenter}}>Created DTM</th>
                  <th style={{...styles.th, ...styles.thCenter, ...styles.thLast}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.id} style={styles.tr}>
                    <td style={{...styles.td, ...styles.tdCenter, ...styles.tdBlack, ...styles.tdFirst}}>{shift.name}</td>
                    <td style={{...styles.td, ...styles.tdCenter, ...styles.tdBlack}}>{shift.fromTime}</td>
                    <td style={{...styles.td, ...styles.tdCenter, ...styles.tdBlack}}>{shift.toTime}</td>
                    <td style={{...styles.td, ...styles.tdCenter}}>{shift.createdBy}</td>
                    <td style={{...styles.td, ...styles.tdCenter}}>
                      <span>{shift.createdDtm.split(' ')[0]}</span>
                      <span style={styles.dtmTime}>{shift.createdDtm.split(' ').slice(1).join(' ')}</span>
                    </td>
                    <td style={{...styles.tdAction, ...styles.tdLast}}>
                      <div style={styles.actionIcons}>
                        <button style={{...styles.iconButton, ...styles.viewBtn}} title="View">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3C4.667 3 1.82 5.073 0.666992 8C1.82099 10.927 4.66699 13 8.00033 13C11.3337 13 14.18 10.927 15.3337 8C14.1797 5.073 11.333 3 8 3ZM8 11.3333C6.16004 11.3333 4.66667 9.83996 4.66667 8C4.66667 6.16004 6.16004 4.66667 8 4.66667C9.83996 4.66667 11.3333 6.16004 11.3333 8C11.3333 9.83996 9.83996 11.3333 8 11.3333ZM8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6Z" fill="#FFFFFF"/>
                          </svg>
                        </button>
                        <button style={{...styles.iconButton, ...styles.editBtn}} title="Update">
                          <FaEdit />
                        </button>
                        <button style={{...styles.iconButton, ...styles.deleteBtn}} title="Delete">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.66667 12.6667C4.66667 13.4 5.26667 14 6 14H10C10.7333 14 11.3333 13.4 11.3333 12.6667V5.33333H4.66667V12.6667ZM12.6667 3.33333H10.3333L9.66667 2.66667H6.33333L5.66667 3.33333H3.33333V5H12.6667V3.33333Z" fill="#FFFFFF"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'inherit',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    padding: '20px 30px',
    fontSize: '14px'
  },
  cardHeader: {
    padding: '12px 16px 0',
    borderBottom: '0',
    backgroundColor: '#ffffff'
  },
  addHeader: {
    padding: '12px 8px 0'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '0 10px'
  },
  cardTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#000'
  },
  tableWrapper: {
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
    overflow: 'hidden'
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)'
  },
  tableSection: {
    marginTop: '24px'
  },
  listSection: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
    border: '1px solid #eef2f7',
    marginBottom: '24px',
    width: '100%'
  },
  formRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '30px',
    marginBottom: '30px',
    flexWrap: 'nowrap',
    padding: '20px 0'
  },
  shiftNameContainer: {
    flex: '0 0 200px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  timeContainer: {
    display: 'flex',
    gap: '40px',
    flex: '1',
    minWidth: '500px',
    paddingLeft: '30px',
    borderLeft: '1px solid #eee'
  },
  timeGroup: {
    flex: '1',
    minWidth: '180px'
  },
  timeInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  timeSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    flex: 1
  },
  ampmSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '70px'
  },
  timeSeparator: {
    fontSize: '16px',
    margin: '0 2px'
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    paddingTop: '25px',
    marginTop: '20px',
    borderTop: '1px solid #eee'
  },
  resetButton: {
    padding: '8px 20px',
    backgroundColor: '#6b7280',
    border: '1px solid #6b7280',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'white',
    marginRight: '10px'
  },
  saveButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#1976D2'
    }
  },
  tableResponsive: {
    width: '100%',
    overflowX: 'auto',
    padding: '0 16px 16px',
    marginTop: '24px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    backgroundColor: '#fff',
    border: '1px solid #e3e8ef'
  },
  th: {
    backgroundColor: '#1a237e',
    color: '#ffffff',
    fontWeight: '600',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #e3e8ef',
    borderRight: '1px solid #e3e8ef',
    whiteSpace: 'nowrap'
  },
  thFirst: {
    borderLeft: '1px solid #e3e8ef'
  },
  thLast: {
    borderRight: '1px solid #e3e8ef'
  },
  thCenter: {
    textAlign: 'center'
  },
  tr: {
    borderBottom: '1px solid #e3e8ef'
  },
  td: {
    padding: '12px 15px',
    color: '#333',
    verticalAlign: 'middle',
    borderRight: '1px solid #e3e8ef'
  },
  tdFirst: {
    borderLeft: '1px solid #e3e8ef'
  },
  tdLast: {
    borderRight: '1px solid #e3e8ef'
  },
  tdBlack: {
    color: '#000'
  },
  tdAction: {
    textAlign: 'center'
  },
  dtmTime: {
    marginLeft: '16px'
  },
  tdCenter: {
    textAlign: 'center'
  },
  tableHeaderRow: {
    borderBottom: '2px solid #dee2e6'
  },
  actionIcons: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 8px',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: { backgroundColor: '#10b981' },
  editBtn: { backgroundColor: '#FFB300' },
  deleteBtn: { backgroundColor: '#F44336' }
};

export default Shifts;
