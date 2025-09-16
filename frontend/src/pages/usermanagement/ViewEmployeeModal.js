import React from 'react';

const ViewEmployeeModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen) return null;

  // Sample privileges data - in real app this would come from employee data
  const hasPrivileges = employee?.privileges && Object.keys(employee.privileges).length > 0;
  
  const samplePrivileges = [
    { section: 'Citizen Management', privileges: ['Add Citizen', 'Update Citizen', 'View Citizen'] },
    { section: 'File Management', privileges: ['Upload File', 'Download File', 'View File'] }
  ];

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Employee Details</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        
        <div style={styles.modalContent}>
          {/* Personal Details Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Details</h3>
            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.label}>Employee ID:</span>
                <span style={styles.value}>{employee?.id || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Employee Name:</span>
                <span style={styles.value}>{employee?.name || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Designation:</span>
                <span style={styles.value}>{employee?.designation || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Contact No.:</span>
                <span style={styles.value}>{employee?.contact || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Status:</span>
                <span style={{
                  ...styles.value,
                  ...styles.statusBadge,
                  backgroundColor: employee?.status === 'Active' ? '#dcfce7' : '#fef2f2',
                  color: employee?.status === 'Active' ? '#166534' : '#dc2626'
                }}>
                  {employee?.status || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Privilege Details Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Privilege Details</h3>
            {hasPrivileges ? (
              <div style={styles.privilegesContainer}>
                {samplePrivileges.map((section, index) => (
                  <div key={index} style={styles.privilegeSection}>
                    <h4 style={styles.privilegeSectionTitle}>{section.section}</h4>
                    <div style={styles.privilegeList}>
                      {section.privileges.map((privilege, privIndex) => (
                        <div key={privIndex} style={styles.privilegeItem}>
                          <span style={styles.privilegeBullet}>•</span>
                          <span style={styles.privilegeText}>{privilege}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.noPrivileges}>
                <p style={styles.noPrivilegesText}>No Privileges Added</p>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.closeModalButton}>
            Close
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
    marginTop: '66px',
    marginBottom: '25px'
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
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '4px'
  },
  value: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
    width: 'fit-content'
  },
  privilegesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  privilegeSection: {
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  privilegeSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: '12px',
    margin: 0
  },
  privilegeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  privilegeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  privilegeBullet: {
    color: '#1e40af',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  privilegeText: {
    fontSize: '0.875rem',
    color: '#374151'
  },
  noPrivileges: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  noPrivilegesText: {
    fontSize: '1.1rem',
    color: '#6b7280',
    fontStyle: 'italic',
    margin: 0
  },
  modalFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f8fafc'
  },
  closeModalButton: {
    padding: '10px 24px',
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

export default ViewEmployeeModal;
