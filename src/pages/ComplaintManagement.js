import React, { useState } from 'react';

const ComplaintManagement = () => {
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

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
    }}>
      <div style={{
        width: '750px',
        maxHeight: '90vh',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '16px',
          textAlign: 'center',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          Complaint Management
        </div>

        {/* Controls */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px'
        }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Save Privileges
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '50px',
              height: '25px',
              borderRadius: '30px',
              backgroundColor: '#ddd',
              position: 'relative'
            }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                position: 'absolute',
                top: '1.5px',
                left: '2px',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)'
              }}></div>
            </div>
            <span>OFF</span>
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: '0 20px 20px 20px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '10px'
          }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Task</th>
                <th style={tableHeaderStyle}>Authorization Role</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {privileges.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={tableCellStyle}>{item.task}</td>
                  <td style={tableCellStyle}>{item.role}</td>
                  <td style={tableCellStyle}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <div
                        onClick={() => handleToggle(index)}
                        style={{
                          width: '50px',
                          height: '25px',
                          borderRadius: '30px',
                          backgroundColor: item.enabled ? '#28a745' : '#ddd',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: '0.3s'
                        }}
                      >
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: '#fff',
                          position: 'absolute',
                          top: '1.5px',
                          left: item.enabled ? '26px' : '2px',
                          transition: '0.3s',
                          boxShadow: '0 0 5px rgba(0,0,0,0.3)'
                        }}></div>
                      </div>
                      <span>{item.enabled ? 'ON' : 'OFF'}</span>
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

// Reusable styles
const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  backgroundColor: '#f1f1f1',
  fontWeight: 'bold',
  borderBottom: '1px solid #ccc'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

export default ComplaintManagement;
