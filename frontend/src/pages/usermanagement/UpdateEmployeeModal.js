import React, { useState, useEffect } from 'react';

const UpdateEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    contact: '',
    status: 'Active'
  });

  // Update form data when employee prop changes
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id || '',
        name: employee.name || '',
        designation: employee.designation || '',
        contact: employee.contact || '',
        status: employee.status || 'Active'
      });
    }
  }, [employee]);

  const [selectedSection, setSelectedSection] = useState('citizenManagement');
  const [userPrivileges, setUserPrivileges] = useState({
    citizenManagement: {
      addCitizen: true,
      updateCitizen: true,
      deleteCitizen: false,
      viewCitizen: true,
      subsidyManagement: false,
      citizenPayment: false,
      administration: false,
      smeManagement: false
    },
    serviceManagement: {
      addService: false,
      updateService: false,
      deleteService: false,
      viewService: true
    },
    storesManagement: {
      addStore: false,
      updateStore: false,
      deleteStore: false,
      viewStore: true
    },
    fileManagement: {
      uploadFile: true,
      downloadFile: true,
      deleteFile: false,
      viewFile: true
    },
    recordRoomManagement: {
      addRecord: false,
      updateRecord: false,
      deleteRecord: false,
      viewRecord: true
    },
    postalManagement: {
      sendMail: false,
      receiveMail: true,
      trackMail: true,
      manageMail: false
    },
    userManagement: {
      addUser: false,
      updateUser: false,
      deleteUser: false,
      viewUser: true
    },
    planningManagement: {
      createPlan: false,
      updatePlan: false,
      deletePlan: false,
      viewPlan: true
    },
    trainingManagement: {
      scheduleTraining: false,
      conductTraining: false,
      viewTraining: true,
      manageTraining: false
    },
    certificateManagement: {
      issueCertificate: false,
      verifyCertificate: true,
      revokeCertificate: false,
      viewCertificate: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = () => {
    const updatedEmployee = {
      ...formData,
      privileges: userPrivileges
    };
    onUpdate(updatedEmployee);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Update Employee Details</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        
        <div style={styles.modalContent}>
          {/* Personal Details Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Details</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter employee name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter designation"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Contact No.</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter contact number"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={styles.select}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Privileges Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>User Privileges</h3>
            <div style={styles.privilegesContainer}>
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
              <div style={styles.privilegeContent}>
                <h4 style={styles.privilegeTitle}>{getSectionDisplayName(selectedSection)}</h4>
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
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.modalFooter}>
          <button onClick={handleCancel} style={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    width: '95%',
    maxWidth: '1167px',
    height: '77vh',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginTop:'66px',
    marginBottom:'25px'
  },
  modalHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e40af',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease'
  },
  modalContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px'
  },
  section: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #1e40af'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroupFull: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1 / -1'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    backgroundColor: 'white',
    outline: 'none'
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    resize: 'vertical',
    outline: 'none'
  },
  privilegesContainer: {
    display: 'flex',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '350px'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#f8fafc',
    borderRight: '1px solid #e5e7eb',
    overflowY: 'auto'
  },
  sidebarItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    color: '#374151'
  },
  sidebarItemActive: {
    backgroundColor: '#1e40af',
    color: 'white',
    fontWeight: '500'
  },
  privilegeContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto'
  },
  privilegeTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e5e7eb'
  },
  privilegeTable: {
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 100px',
    backgroundColor: '#1e40af',
    color: 'white'
  },
  tableHeaderCell: {
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '0.875rem'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 100px',
    borderBottom: '1px solid #e5e7eb'
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    color: '#374151'
  },
  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px',
    cursor: 'pointer'
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0
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
    alignItems: 'center'
  },
  toggleSliderActive: {
    backgroundColor: '#22c55e'
  },
  toggleCircle: {
    position: 'absolute',
    height: '18px',
    width: '18px',
    left: '3px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: '0.3s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  toggleCircleActive: {
    transform: 'translateX(26px)'
  },
  modalFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#f8fafc'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  }
};

export default UpdateEmployeeModal;
