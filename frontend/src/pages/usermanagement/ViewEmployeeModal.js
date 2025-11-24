import React from 'react';

const ViewEmployeeModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen) return null;

  const handleUpdateClick = () => {
    console.log('Update clicked for user', employee?.id);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>User Details</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>

        <div style={styles.modalContent}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}></h3>
            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.label}>User ID:</span>
                <span style={styles.value}>{employee?.id || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Employee Name:</span>
                <span style={styles.value}>{employee?.name || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Calling Name:</span>
                <span style={styles.value}>{employee?.callingName || 'N/A'}</span>
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
                <span style={styles.label}>Email Address:</span>
                <span style={styles.value}>{employee?.email || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Location:</span>
                <span style={styles.value}>{employee?.address || 'N/A'}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Supervisor</span>
                <select style={styles.dropdownSelect} defaultValue="">
                  <option value="" disabled>Select Supervisor</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.closeModalButton}>
            Close
          </button>
          <button onClick={handleUpdateClick} style={styles.updateButton}>
            Update
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    position: 'relative'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e40af',
    margin: 0
  },
  closeButton: {
    position: 'absolute',
    right: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#111827',
    padding: '0',
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
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
    display: 'none'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '2px',
    lineHeight: 1.2
  },
  value: {
    fontSize: '0.95rem',
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
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#f8fafc'
  },
  closeModalButton: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    color: '#111827',
    border: '1px solid #e5e7eb',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  },
  updateButton: {
    padding: '10px 20px',
    backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
    color: 'white',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  dropdownGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  dropdownLabel: {
    color: '#6b7280',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  dropdownSelect: {
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#edf2f7',
    fontSize: '0.9rem',
    color: '#111827'
  }
};

export default ViewEmployeeModal;
