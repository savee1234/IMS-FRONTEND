import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
 

const employees = [
  { empNo: 'E001', name: 'Alice Johnson', designation: 'Technician', status: 'Available', solutions: ['Reset Password', 'Check Connectivity', 'Assign Engineer'] },
  { empNo: 'E002', name: 'Bob Lee', designation: 'Engineer', status: 'Rostered', solutions: ['Remote Support', 'Upgrade Plan'] },
  { empNo: 'E003', name: 'Charlie Kim', designation: 'Support Staff', status: 'Absent', solutions: ['Reinstall App', 'Update Billing Info'] },
  { empNo: 'E004', name: 'Diana Smith', designation: 'Engineer', status: 'Available', solutions: ['Assign Engineer', 'Remote Support'] },
];

const SelectAssigner = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { solution, formData } = state || {};

  const [roleMap, setRoleMap] = useState({}); // {E001: 'main' or 'sub'}

  const filtered = employees.filter(e => e.solutions.includes(solution));

  const handleRoleChange = (empNo, role) => {
    setRoleMap(prev => ({ ...prev, [empNo]: role }));
  };

  const handleSelect = (empNo) => {
    const role = roleMap[empNo];
    if (!role) return;

    let updatedForm = { ...formData };

    if (role === 'main') {
      updatedForm.mainRoster = empNo;
    } else if (role === 'sub') {
      updatedForm.subRosters = [...(updatedForm.subRosters || []), empNo];
    }

    navigate('/complaint', { state: { formData: updatedForm } });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh'
    }}>
      
      
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: -1
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 1
      }}>
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: '#0d6efd',
          fontSize: '24px',
          fontWeight: '600'
        }}>
          Select Assigners for: <span style={{ color: '#212529' }}>{solution}</span>
        </h2>

        <div style={{
          overflowX: 'auto',
          marginBottom: '20px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px'
          }}>
            <thead style={{
              backgroundColor: '#1e3a8a',
              borderBottom: '1px solid #1e3a8a'
            }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #1e3a8a', color: '#ffffff' }}>Emp No</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #1e3a8a', color: '#ffffff' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #1e3a8a', color: '#ffffff' }}>Designation</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #1e3a8a', color: '#ffffff' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #1e3a8a', color: '#ffffff' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #1e3a8a', color: '#ffffff' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{
                    padding: '16px',
                    textAlign: 'center',
                    color: '#6c757d',
                    border: '1px solid #dee2e6'
                  }}>
                    No available employees for this solution.
                  </td>
                </tr>
              ) : (
                filtered.map(emp => (
                  <tr key={emp.empNo} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{emp.empNo}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{emp.name}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{emp.designation}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: '500',
                        backgroundColor: emp.status === 'Available' ? '#198754' :
                                        emp.status === 'Rostered' ? '#ffc107' : '#dc3545',
                        color: emp.status === 'Rostered' ? '#212529' : 'white'
                      }}>
                        {emp.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <select
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ced4da',
                          fontSize: '14px'
                        }}
                        value={roleMap[emp.empNo] || ''}
                        onChange={(e) => handleRoleChange(emp.empNo, e.target.value)}
                      >
                        <option value="">-- Select --</option>
                        <option value="main">Main Assigner</option>
                        <option value="sub">Sub Assigner</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <button
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#0d6efd',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          opacity: !roleMap[emp.empNo] ? '0.65' : '1',
                          pointerEvents: !roleMap[emp.empNo] ? 'none' : 'auto'
                        }}
                        onClick={() => handleSelect(emp.empNo)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <button 
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onClick={() => navigate('/complaint', { state: { formData } })}
          >
            Back to Form
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SelectAssigner;