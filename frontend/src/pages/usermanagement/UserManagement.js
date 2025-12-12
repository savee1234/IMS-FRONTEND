import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../complaint/ComplaintForm.css';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import ViewEmployeeModal from './ViewEmployeeModal';
import { FaEye, FaUserCog, FaSearch } from 'react-icons/fa';

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

        setEmployees(mapped.slice(0, 3));
      } catch (err) {
        console.error('Failed to load user-management:', err);
        setEmployeesError(err.message || String(err));
        setEmployees([]);
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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = (
      emp.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesSearch;
  });

  

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="ma-wrapper">
      <Sidebar />
      <div className="ma-content">
        <div className="ma-header">
          <h1>System Users</h1>
        </div>

        <div className="ma-table-card">
          <div className="ma-search-bar">
            <FaSearch className="ma-search-icon" />
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ma-search-input"
            />
          </div>

          <div className="ma-table-container">
            <table className="ma-table">
              <thead>
                <tr>
                  <th>USER ID</th>
                  <th>EMPLOYEE NAME</th>
                  <th>DESIGNATION</th>
                  <th>CONTACT NO.</th>
                  <th>EMAIL ADDRESS</th>
                  <th>LOCATION</th>
                  <th>ACTIONS</th>
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
                  filteredEmployees.map((employee, index) => (
                    <tr key={employee.id || index}>
                      <td style={{ color: '#0f172a' }}>{employee.id}</td>
                      <td style={{ color: '#0f172a' }}>{employee.name}</td>
                      <td style={{ color: '#0f172a' }}>{employee.designation}</td>
                      <td style={{ color: '#0f172a' }}>{employee.contact}</td>
                      <td style={{ color: '#0f172a' }}>{employee.email || 'N/A'}</td>
                      <td style={{ color: '#0f172a' }}>{employee.address || 'N/A'}</td>
                      <td>
                        <div className="ma-actions">
                          <button className="ma-btn-action ma-btn-view" title="View" onClick={() => handleViewEmployee(employee)}>
                            <FaEye />
                          </button>
                          <button className="ma-btn-action ma-btn-edit" title="Update Privileges" onClick={() => handleUpdateEmployee(employee)}>
                            <FaUserCog />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="ma-footer-row">
            <button className="ma-pagination-btn">&lt; Previous</button>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Page 1 of 1</span>
            <button className="ma-pagination-btn next">Next &gt;</button>
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




