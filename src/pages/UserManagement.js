import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const UserManagement = () => {
  const navigate = useNavigate();
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState('citizenManagement');
  const [userPrivileges, setUserPrivileges] = useState({
    citizenManagement: {
      addCitizen: true,
      updateCitizen: true,
      deleteCitizen: true,
      viewCitizen: true,
      subsidyManagement: false,
      citizenPayment: false,
      administration: false,
      smeManagement: false
    },
    serviceManagement: {},
    storesManagement: {},
    fileManagement: {},
    recordRoomManagement: {},
    postalManagement: {},
    userManagement: {},
    planningManagement: {},
    trainingManagement: {},
    certificateManagement: {}
  });

  const privilegeModules = [
    'Complaint Management',
    'User Management',
    'Reporting',
    'Data Analysis',
    'Access Logs',
    'Audit Trails',
  ];

  const handlePrivilegeClick = (priv) => {
    if (priv === 'User Management') {
      setShowPrivilegeModal(true);
    } else if (priv === 'Complaint Management') {
      navigate('/complaint-management');
    } else {
      alert(`Clicked: ${priv}`);
    }
  };

  const handleTogglePrivilege = (module, privilege) => {
    setUserPrivileges(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [privilege]: !prev[module][privilege]
      }
    }));
  };

  const getDisplayName = (key) => {
    const nameMap = {
      addCitizen: 'Add Citizen',
      updateCitizen: 'Update Citizen',
      deleteCitizen: 'Delete Citizen',
      viewCitizen: 'View Citizen',
      subsidyManagement: 'Subsidy Management',
      citizenPayment: 'Citizen Payment',
      administration: 'Administration',
      smeManagement: 'SME Management',
      addService: 'Add Service',
      updateService: 'Update Service',
      deleteService: 'Delete Service',
      viewService: 'View Service',
      addStore: 'Add Store',
      updateStore: 'Update Store',
      deleteStore: 'Delete Store',
      viewStore: 'View Store',
      uploadFile: 'Upload File',
      downloadFile: 'Download File',
      deleteFile: 'Delete File',
      viewFile: 'View File',
      addRecord: 'Add Record',
      updateRecord: 'Update Record',
      deleteRecord: 'Delete Record',
      viewRecord: 'View Record',
      sendMail: 'Send Mail',
      receiveMail: 'Receive Mail',
      trackMail: 'Track Mail',
      manageMail: 'Manage Mail',
      addUser: 'Add User',
      updateUser: 'Update User',
      deleteUser: 'Delete User',
      viewUser: 'View User',
      createPlan: 'Create Plan',
      updatePlan: 'Update Plan',
      deletePlan: 'Delete Plan',
      viewPlan: 'View Plan',
      scheduleTraining: 'Schedule Training',
      conductTraining: 'Conduct Training',
      viewTraining: 'View Training',
      manageTraining: 'Manage Training',
      issueCertificate: 'Issue Certificate',
      verifyCertificate: 'Verify Certificate',
      revokeCertificate: 'Revoke Certificate',
      viewCertificate: 'View Certificate'
    };
    return nameMap[key] || key;
  };

  const getSectionDisplayName = (section) => {
    const sectionMap = {
      citizenManagement: 'Citizen Management',
      serviceManagement: 'Service Management',
      storesManagement: 'Stores Management',
      fileManagement: 'File Management',
      recordRoomManagement: 'Record Room Management',
      postalManagement: 'Postal Management',
      userManagement: 'User Management',
      planningManagement: 'Planning Management',
      trainingManagement: 'Training Management',
      certificateManagement: 'Certificate Management'
    };
    return sectionMap[section] || section;
  };

  const handleCloseModal = () => {
    setShowPrivilegeModal(false);
  };

  const handleSubmitPrivileges = () => {
    console.log('Privileges saved:', userPrivileges);
    setShowPrivilegeModal(false);
    alert('Privileges updated successfully!');
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
              {privilegeModules.map((priv, index) => (
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

      {/* Privilege Details Modal */}
      {showPrivilegeModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Privilege Details</h2>
              <button onClick={handleCloseModal} style={styles.modalCloseButton}>
                ×
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {/* Left Sidebar - Management Sections */}
              <div style={styles.modalSidebar}>
                {Object.keys(userPrivileges).map((sectionKey) => (
                  <div
                    key={sectionKey}
                    style={{
                      ...styles.sidebarItem,
                      ...(selectedSection === sectionKey ? styles.sidebarItemActive : {})
                    }}
                    onClick={() => setSelectedSection(sectionKey)}
                  >
                    {getSectionDisplayName(sectionKey)}
                  </div>
                ))}
              </div>

              {/* Right Content - Selected Section Details */}
              <div style={styles.modalMainContent}>
                <h3 style={styles.managementTitle}>{getSectionDisplayName(selectedSection)}</h3>
                {selectedSection === 'citizenManagement' ? (
                  <div style={styles.privilegeTable}>
                    <div style={styles.tableHeader}>
                      <div style={styles.tableHeaderCell}>Location</div>
                      <div style={styles.tableHeaderCell}>Privilege</div>
                      <div style={styles.tableHeaderCell}>Active</div>
                    </div>
                    
                    {Object.entries(userPrivileges[selectedSection]).map(([key, value]) => (
                      <div key={key} style={styles.tableRow}>
                        <div style={styles.tableCell}>{getSectionDisplayName(selectedSection)}</div>
                        <div style={styles.tableCell}>{getDisplayName(key)}</div>
                        <div style={styles.tableCell}>
                          <label style={styles.toggleSwitch}>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleTogglePrivilege(selectedSection, key)}
                              style={styles.toggleInput}
                            />
                            <span style={{...styles.toggleSlider, ...(value ? styles.toggleSliderActive : {})}}>
                              <span style={{...styles.toggleCircle, ...(value ? styles.toggleCircleActive : {})}}></span>
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.emptySection}>
                    <p style={styles.emptySectionText}>
                      No privileges configured for {getSectionDisplayName(selectedSection)} yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalActions}>
              <button onClick={handleCloseModal} style={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleSubmitPrivileges} style={styles.submitModalButton}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
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
    marginTop: '16px',
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

  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '85%',
    maxWidth: '900px',
    height: '76vh',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    backgroundColor: 'rgba(6, 26, 66, 0.96)',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 3,
    fontSize: '1.40rem',
    fontWeight: 500,
    color:'white'
  },
  modalCloseButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    display: 'flex',
    height: 'calc(70vh - 95px)',
    overflow: 'hidden',
  },
  modalSidebar: {
    width: '250px',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #e0e0e0',
    overflowY: 'auto',
  },
  sidebarItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  sidebarItemActive: {
    backgroundColor: '#1e40af',
    color: 'white',
    fontWeight: 500,
  },
  modalMainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  managementSection: {
    marginBottom: '20px',
  },
  managementTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '10px',
    padding: '8px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  privilegeTable: {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 100px',
    backgroundColor: '#1e40af',
    color: 'white',
  },
  tableHeaderCell: {
    padding: '12px 16px',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 100px',
    borderBottom: '1px solid #e0e0e0',
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
  },
  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px',
    cursor: 'pointer',
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    borderRadius: '24px',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
  },
  toggleSliderActive: {
    backgroundColor: '#22c55e',
  },
  toggleCircle: {
    position: 'absolute',
    height: '18px',
    width: '18px',
    left: '3px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: '0.3s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  toggleCircleActive: {
    transform: 'translateX(26px)',
  },
  modalActions: {
    padding: '16px 20px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  cancelButton: {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  submitModalButton: {
    padding: '8px 20px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  emptySection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  emptySectionText: {
    color: '#666',
    fontSize: '1rem',
    fontStyle: 'italic',
    margin: 0,
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
