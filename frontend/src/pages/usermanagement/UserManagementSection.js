import React, { useState } from 'react';

const UserManagementSection = () => {
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

  const handleSubmitPrivileges = () => {
    console.log('Privileges saved:', userPrivileges);
    alert('Privileges updated successfully!');
  };

  return (
    <div style={styles.container}>
      {/* User Management Interface */}
      <div style={styles.userManagementInterface}>
        {/* Left Sidebar - Management Sections */}
        <div style={styles.sidebar}>
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
        <div style={styles.mainContent}>
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

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button style={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleSubmitPrivileges} style={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  userManagementInterface: {
    display: 'flex',
    backgroundColor: 'transparent',
    borderRadius: '0px',
    boxShadow: 'none',
    border: 'none',
    overflow: 'visible',
    minHeight: '600px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: 'transparent',
    borderRight: 'none',
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
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  managementTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '20px',
    padding: '8px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  privilegeTable: {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '20px',
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
  emptySection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    backgroundColor: 'transparent',
    borderRadius: '0px',
    border: 'none',
    marginBottom: '20px',
  },
  emptySectionText: {
    color: '#666',
    fontSize: '1rem',
    fontStyle: 'italic',
    margin: 0,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
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
  submitButton: {
    padding: '8px 20px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
};

export default UserManagementSection;
