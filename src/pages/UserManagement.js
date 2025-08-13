import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserManagement = () => {
  const navigate = useNavigate();

  const privileges = [
    'Complaint Management',
    'User Management',
    'Reporting',
    'Data Analysis',
    'Access Logs',
    'Audit Trails',
  ];

  const handlePrivilegeClick = (priv) => {
    if (priv === 'Complaint Management') {
      navigate('/complaint-management');
    } else {
      alert(`Clicked: ${priv}`);
    }
  };

  // Navigate to User Management page when button clicked
  const handleUserManagementButton = () => {
    navigate('/user-management');
  };

  // Close button handler example (navigate back)
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
      <div style={{
        width: '700px',
        maxWidth: '90%',
        margin: '40px auto 40px auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflowY: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          cursor: 'default'
        }}>
          Add New User
          <span
            onClick={handleClose}
            style={{ cursor: 'pointer', fontSize: '24px', userSelect: 'none' }}
            aria-label="Close"
            title="Close"
          >
            &times;
          </span>
        </div>

        <div style={{ padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>User Privileges</h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {privileges.map((priv, index) => (
              <button
                key={index}
                style={{
                  padding: '12px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => handlePrivilegeClick(priv)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                {priv}
              </button>
            ))}
          </div>

          {/* Updated button to navigate to /user-management */}
          <button
            onClick={handleUserManagementButton}
            style={{
              padding: '12px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e7e34'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            Go to User Management
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserManagement;
