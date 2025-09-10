import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import ViewEmployeeModal from './ViewEmployeeModal';
import backgroundVideo from '../../assets/Background.mp4';

// Import sub-components
import ComplaintManagement from './ComplaintManagement';
import Reporting from './Reporting';
import DataAnalysis from './DataAnalysis';
import AccessLogs from './AccessLogs';
import AuditTrails from './AuditTrails';

const UserManagement = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'John Doe', designation: 'Manager', contact: '+94 11 234 5678', status: 'Active', email: 'john.doe@company.com', department: 'IT', joiningDate: '2023-01-15', address: '123 Main St, Colombo' },
    { id: 'EMP002', name: 'Jane Smith', designation: 'Developer', contact: '+94 11 234 5679', status: 'Active', email: 'jane.smith@company.com', department: 'IT', joiningDate: '2023-02-20', address: '456 Oak Ave, Kandy' },
    { id: 'EMP003', name: 'Mark Taylor', designation: 'Analyst', contact: '+94 11 234 5680', status: 'Inactive', email: 'mark.taylor@company.com', department: 'Finance', joiningDate: '2022-11-10', address: '789 Pine Rd, Galle' },
  ]);

  const sections = [
    { key: 'complaintManagement', title: 'Complaint Management', component: ComplaintManagement },
    { key: 'reporting', title: 'Reporting', component: Reporting },
    { key: 'dataAnalysis', title: 'Data Analysis', component: DataAnalysis },
    { key: 'accessLogs', title: 'Access Logs', component: AccessLogs },
    { key: 'auditTrails', title: 'Audit Trails', component: AuditTrails },
  ];

  const handleUpdateEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeUpdate = (updatedEmployee) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    console.log('Employee updated:', updatedEmployee);
  };

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '1rem',
        marginTop: '1rem',
        maxWidth: '1200px',
        margin: '1rem auto 0 auto'
      }}>
        {/* Main White Container */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {/* Header Section */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
              color: '#1e3a8a',
              margin: '0',
            textAlign: 'center'
          }}>
            User Management Module
          </h1>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#f3f4f6',
              border: 'none',
                fontSize: '18px',
              cursor: 'pointer',
                color: '#374151',
              padding: '0',
                width: '32px',
                height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
            }}
            aria-label="Close"
            title="Close"
          >
              ×
          </button>
          </div>

          {/* Personal Details Section */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 1rem 0',
              textDecoration: 'underline'
            }}>
              Personal Details
            </h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #d1d5db',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#1e40af',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    <th style={tableHeaderStyle}>User ID</th>
                    <th style={tableHeaderStyle}>Employee Name</th>
                    <th style={tableHeaderStyle}>Designation</th>
                    <th style={tableHeaderStyle}>Contact No.</th>
                    <th style={tableHeaderStyle}>Active Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id} style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <td style={tableCellStyle}>{employee.id}</td>
                      <td style={tableCellStyle}>{employee.name}</td>
                      <td style={tableCellStyle}>{employee.designation}</td>
                      <td style={tableCellStyle}>{employee.contact}</td>
                      <td style={tableCellStyle}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          backgroundColor: employee.status === 'Active' ? '#dcfce7' : '#fef2f2',
                          color: employee.status === 'Active' ? '#166534' : '#dc2626'
                        }}>
                          {employee.status}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button 
                            style={viewButtonStyle}
                            onClick={() => handleViewEmployee(employee)}
                          >
                            👁️ View
                          </button>
                          <button 
                            style={updateButtonStyle}
                            onClick={() => handleUpdateEmployee(employee)}
                          >
                            ✏️ Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div style={{ padding: '1.5rem' }}>
            {sections.map((section, index) => (
              <div key={section.key} style={{ 
                marginBottom: index < sections.length - 1 ? '0.5rem' : '0'
              }}>
                {/* Section Button */}
            <button
                  onClick={() => toggleSection(section.key)}
              style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    background: '#3b82f6',
                    border: 'none',
                    color: 'white',
                    fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                    borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                  }}
                >
                  {section.title}
            </button>

                {/* Collapsible Content */}
                {expandedSections[section.key] && (
        <div style={{
                    padding: '1.5rem',
                    background: '#f8fafc',
                    borderTop: '1px solid #e5e7eb',
                    marginTop: '0.5rem',
                    borderRadius: '0 0 8px 8px'
                  }}>
                    <section.component />
                  </div>
                )}
              </div>
            ))}
        </div>
        </div>
      </div>
      <Footer />
      
      {/* Update Employee Modal */}
      <UpdateEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee}
        onUpdate={handleEmployeeUpdate}
      />
      
      {/* View Employee Modal */}
      <ViewEmployeeModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        employee={selectedEmployee}
      />
    </div>
  );
};

// Table Styles
const tableHeaderStyle = {
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  textAlign: 'center',
  fontWeight: '600',
  color: 'white',
  fontSize: '0.875rem'
};

const tableCellStyle = {
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: '#374151'
};

const viewButtonStyle = {
  padding: '0.375rem 0.75rem',
  backgroundColor: '#22c55e',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem'
};

const updateButtonStyle = {
  padding: '0.375rem 0.75rem',
  backgroundColor: '#f59e0b',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem'
};

export default UserManagement;




