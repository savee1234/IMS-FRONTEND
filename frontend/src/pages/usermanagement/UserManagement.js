import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../complaint/ComplaintForm.css';
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
    <div className="um-wrapper">
      <Navbar />
      <div className="um-content">
        <div className="um-card">
          <div className="um-header">
            <h1 className="um-title">System Users</h1>
          </div>
          <div className="um-body">
            <div className="um-table-container">
              <table className="um-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Employee Name</th>
                    <th>Designation</th>
                    <th>Contact No.</th>
                    <th>Email Address</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingEmployees ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center' }}>Loading employees...</td>
                    </tr>
                  ) : employeesError ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', color: '#b91c1c' }}>Error loading employees: {employeesError}</td>
                    </tr>
                  ) : employees.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center' }}>No employees found.</td>
                    </tr>
                  ) : (
                    employees.map((employee, index) => (
                      <tr key={employee.id || index}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.contact}</td>
                        <td>{employee.email || 'N/A'}</td>
                        <td>{employee.address || 'N/A'}</td>
                        <td>
                          <div className="um-actions">
                            <button className="um-btn" title="Update Privileges" onClick={() => handleUpdateEmployee(employee)}>
                              <FaUserCog size={20} />
                            </button>
                            <button className="um-btn" title="View" onClick={() => handleViewEmployee(employee)}>
                              <FaEye size={20} />
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

      <UpdateEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee}
        onUpdate={handleEmployeeUpdate}
      />

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




