import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

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
    <div style={styles.page}>
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.gradientOverlay}></div>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Add New User</h2>
            <button
              onClick={handleClose}
              style={styles.closeButton}
              aria-label="Close"
              title="Close"
            >
              &times;
            </button>
          </div>

          <div style={styles.cardContent}>
            <h3 style={styles.sectionTitle}>User Privileges</h3>
            <p style={styles.sectionDescription}>
              Select the privileges to assign to this user
            </p>

            <div style={styles.privilegesGrid}>
              {privileges.map((priv, index) => (
                <button
                  key={index}
                  style={styles.privilegeButton}
                  onClick={() => handlePrivilegeClick(priv)}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = styles.privilegeButtonHover.backgroundColor;
                    e.currentTarget.style.transform = styles.privilegeButtonHover.transform;
                    e.currentTarget.style.boxShadow = styles.privilegeButtonHover.boxShadow;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = styles.privilegeButton.backgroundColor;
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = styles.privilegeButton.boxShadow;
                  }}
                >
                  {priv}
                </button>
              ))}
            </div>

            <div style={styles.actions}>
              <button
                onClick={handleUserManagementButton}
                style={styles.submitButton}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor;
                  e.currentTarget.style.transform = styles.submitButtonHover.transform;
                  e.currentTarget.style.boxShadow = styles.submitButtonHover.boxShadow;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor;
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = styles.submitButton.boxShadow;
                }}
              >
                Go to User Management
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const styles = {
  page: {
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
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '64px',
    marginBottom: '64px',
  },
  card: {
    width: '100%',
    maxWidth: '700px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#002b5b',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#999',
    padding: '0',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  },
  closeButtonHover: {
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  cardContent: {
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#002b5b',
    margin: '0 0 8px 0',
  },
  sectionDescription: {
    color: '#666',
    margin: '0 0 24px 0',
    fontSize: '0.95rem',
  },
  privilegesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  privilegeButton: {
    padding: '16px 20px',
    backgroundColor: '#f8f9fa',
    color: '#333',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    fontWeight: 500,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  privilegeButtonHover: {
    backgroundColor: '#0056b3',
    color: '#fff',
    borderColor: '#0056b3',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 86, 179, 0.2)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitButton: {
    padding: '14px 28px',
    backgroundColor: '#002b5b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 43, 91, 0.2)',
  },
  submitButtonHover: {
    backgroundColor: '#007bff',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 123, 255, 0.3)',
  },

  // Responsive styles
  '@media (max-width: 768px)': {
    container: {
      padding: '15px',
      marginTop: '64px',
      marginBottom: '64px',
    },
    card: {
      maxWidth: '100%',
    },
    cardHeader: {
      padding: '16px 20px',
    },
    cardContent: {
      padding: '20px',
    },
    cardTitle: {
      fontSize: '1.35rem',
    },
    privilegesGrid: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '12px',
    },
    privilegeButton: {
      padding: '14px 16px',
      fontSize: '0.9rem',
    },
    submitButton: {
      padding: '12px 24px',
      fontSize: '0.9rem',
    },
  },

  '@media (max-width: 480px)': {
    privilegesGrid: {
      gridTemplateColumns: '1fr',
    },
    actions: {
      justifyContent: 'center',
    },
    submitButton: {
      width: '100%',
    },
  },
};

export default UserManagement;
