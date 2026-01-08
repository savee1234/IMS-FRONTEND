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
    background: 'rgba(2, 6, 23, 0.6)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '24px'
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '0px',
    boxShadow: '0 24px 48px rgba(2,6,23,0.18)',
    width: '100%',
    maxWidth: '960px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  modalTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#1e3a8a',
    margin: 0
  },
  closeButton: {
    position: 'absolute',
    right: '16px',
    backgroundColor: '#111827',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#ffffff',
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
    padding: '16px 24px',
    backgroundColor: '#eaebec'
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
    gap: '16px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(2, 6, 23, 0.06)'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '6px',
    lineHeight: 1.2
  },
  value: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '10px 12px'
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
    color: '#1e3a8a',
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
    padding: '12px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#eaebec'
  },
  closeModalButton: {
    padding: '10px 20px',
    backgroundColor: '#475569',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  },
  updateButton: {
    padding: '10px 20px',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    boxShadow: '0 8px 16px rgba(2, 6, 23, 0.18)'
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
    borderRadius: '10px',
    backgroundColor: '#f8fafc',
    fontSize: '0.9rem',
    color: '#111827'
  }
};

export default ViewEmployeeModal;
