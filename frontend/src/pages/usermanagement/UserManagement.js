import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import ViewEmployeeModal from './ViewEmployeeModal';
import { FaEye, FaUserCog } from 'react-icons/fa';

const UserManagement = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeesError, setEmployeesError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      setEmployeesError(null);
      try {
        const res = await fetch('http://localhost:44354/api/user-management');
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();

        // Assume API returns { success: true, data: [...] } or directly an array
        const raw = Array.isArray(data) ? data : (data.data || []);

        // Map API fields to the table shape. Adjust field names if your API differs.
        const mapped = raw.map(u => ({
          id: u.userId || u.id || u._id || u.empNo || '',
          name: u.userName,
          designation: u.Designation,
          contact: u.ContactNumber,
          status: u.ActiveStatus ? 'Active' : 'Inactive',
          email: u.email || u.userEmail || '',
          department: u.department || u.unit || '',
          joiningDate: u.joiningDate || u.createdAt || '',
          address: u.address || '',
          callingName: u.callingName || u.CallingName || u.calling_name || ''
        }));

        setEmployees(mapped);
      } catch (err) {
        console.error('Failed to load user-management:', err);
        setEmployeesError(err.message || String(err));
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

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

  

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      

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
            System Users
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

          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            
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
                    <th style={{ ...tableHeaderStyle, padding: '0.6rem 0.5rem' }}>User ID</th>
                    <th style={{ ...tableHeaderStyle, padding: '0.6rem 0.5rem' }}>Employee Name</th>
                    <th style={{ ...tableHeaderStyle, padding: '0.6rem 0.5rem' }}>Designation</th>
                    <th style={tableHeaderStyle}>Contact No.</th>
                    <th style={tableHeaderStyle}>Email Address</th>
                    <th style={tableHeaderStyle}>Location</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingEmployees ? (
                    <tr>
                      <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center' }}>Loading employees...</td>
                    </tr>
                  ) : employeesError ? (
                    <tr>
                      <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', color: '#b91c1c' }}>Error loading employees: {employeesError}</td>
                    </tr>
                  ) : employees.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center' }}>No employees found.</td>
                    </tr>
                  ) : (
                    employees.map((employee, index) => (
                      <tr key={employee.id || index} style={{
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        <td style={{ ...tableCellStyle, padding: '0.6rem 0.5rem' }}>{employee.id}</td>
                        <td style={{ ...tableCellStyle, padding: '0.6rem 0.5rem' }}>{employee.name}</td>
                        <td style={{ ...tableCellStyle, padding: '0.6rem 0.5rem' }}>{employee.designation}</td>
                        <td style={tableCellStyle}>{employee.contact}</td>
                        <td style={tableCellStyle}>{employee.email || 'N/A'}</td>
                        <td style={tableCellStyle}>{employee.address || 'N/A'}</td>
                        <td style={tableCellStyle}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button title="Update Privileges" className="btn btn-sm" style={{ backgroundColor: '#FFB300', color: '#fff' }} onClick={() => handleUpdateEmployee(employee)}>
                              <FaUserCog size={14} />
                            </button>
                            <button title="View" className="btn btn-sm" style={{ backgroundColor: '#4CAF50', color: '#fff' }} onClick={() => handleViewEmployee(employee)}>
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
  padding: '0.85rem',
  border: '1px solid #d1d5db',
  textAlign: 'center',
  fontWeight: '600',
  color: 'white',
  fontSize: '0.95rem'
};

const tableCellStyle = {
  padding: '0.85rem',
  border: '1px solid #d1d5db',
  textAlign: 'center',
  fontSize: '0.95rem',
  color: '#374151'
};


export default UserManagement;




