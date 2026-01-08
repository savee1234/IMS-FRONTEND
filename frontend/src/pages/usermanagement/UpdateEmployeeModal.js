import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const UpdateEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
  
  const [accordionOpen, setAccordionOpen] = useState({});
  const [complaintPrivileges, setComplaintPrivileges] = useState({
    admin: true,
    create: true,
    view: true
  });
  

  const handleSubmit = () => {
    const updatedEmployee = {
      ...(employee || {}),
      privileges: {
        complaintOnboarding: complaintPrivileges
      }
    };
    if (onUpdate) onUpdate(updatedEmployee);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={{ ...styles.modalHeader, position: 'relative', justifyContent: 'center' }}>
          <h2 style={{ ...styles.modalTitle, textAlign: 'center' }}>Update User Privileges</h2>
                  <button onClick={onClose} style={{
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
                    borderRadius: '9999px'
                  }}>×</button>
        </div>
        
        <div style={styles.modalContent}>
          <div style={styles.section}>
            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '8px', marginBottom: '12px' }}></div>
            <div style={styles.accordion}>
              {['Complaint On-boarding', 'Roster Administration', 'User Administration', 'Reporting & Dashboard', 'Configuration Administration'].map((title, index) => (
                <div key={title} style={styles.accordionItem}>
                  <button
                    style={styles.accordionHeader}
                    onClick={() => setAccordionOpen(prev => ({ ...prev, [index]: !prev[index] }))}
                  >
                    <span>{title}</span>
                    <span style={{ transform: accordionOpen[index] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                      <FaChevronDown />
                    </span>
                  </button>
                  {accordionOpen[index] && (index === 0 ? (
                    <div style={styles.accordionContent}>
                        <div style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          backgroundColor: '#ffffff',
                          width: '97%',
                          maxWidth: '900px',
                          margin: '0 auto'
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.6fr 0.9fr 0.7fr',
                            backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.85rem'
                          }}>
                            <div style={{ padding: '6px 8px', textAlign: 'left', marginLeft: '8px' }}>AUTHORIZATION ROLE</div>
                            <div style={{ padding: '6px 8px' }}>STATUS</div>
                            <div style={{ padding: '8px 10px' }}>ACTION</div>
                          </div>
                          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                            {[
                              { key: 'admin', label: 'ADMIN' },
                              { key: 'create', label: 'CREATE' },
                              { key: 'view', label: 'VIEW' }
                            ].map((row, i) => (
                              <div key={row.key} style={{
                                display: 'grid',
                                gridTemplateColumns: '1.6fr 0.9fr 0.7fr',
                                borderBottom: '1px solid #e5e7eb',
                                backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb',
                                fontSize: '0.8rem'
                              }}>
                                <div style={{ padding: '6px 8px', color: '#111827', textAlign: 'left', marginLeft: '8px' }}>{row.label}</div>
                                <div style={{ padding: '6px 8px', color: complaintPrivileges[row.key] ? '#16a34a' : '#6b7280', fontWeight: 600 }}>
                                  {complaintPrivileges[row.key] ? 'ACTIVE' : 'INACTIVE'}
                                </div>
                                <div style={{ padding: '8px 10px' }}>
                                  <label style={styles.toggleSwitch}>
                                    <input
                                      type="checkbox"
                                      checked={complaintPrivileges[row.key]}
                                      onChange={() => setComplaintPrivileges(prev => ({ ...prev, [row.key]: !prev[row.key] }))}
                                      style={styles.toggleInput}
                                    />
                                    <span style={{ ...styles.toggleSlider, ...(complaintPrivileges[row.key] ? styles.toggleSliderActive : {}) }}>
                                      <span style={{ ...styles.toggleCircle, ...(complaintPrivileges[row.key] ? styles.toggleCircleActive : {}) }}></span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                    </div>
                  ) : null)}
                </div>
              ))}
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
    padding: '24px',
    backgroundColor: '#eaebec'
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
    backgroundColor: '#eaebec',
    color: '#1e3a8a'
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
    width: '40px',
    height: '20px',
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
    backgroundColor: '#d1d5db',
    borderRadius: '9999px',
    transition: '0.2s',
    display: 'flex',
    alignItems: 'center'
  },
  toggleSliderActive: {
    backgroundColor: '#22c55e'
  },
  toggleCircle: {
    position: 'absolute',
    height: '16px',
    width: '16px',
    left: '2px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: '0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  toggleCircleActive: {
    transform: 'translateX(20px)'
  },
  modalFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#eaebec'
  },
  cancelButton: {
    padding: '8px 18px',
    backgroundColor: '#475569',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  submitButton: {
    padding: '10px 22px',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 8px 16px rgba(2, 6, 23, 0.18)'
  },
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  accordionItem: {
    border: '1px solid #dbeafe',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(2, 6, 23, 0.06)'
  },
  accordionHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    color: '#111827',
    cursor: 'pointer',
    border: 'none'
  },
  accordionContent: {
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e5e7eb'
  }
};

export default UpdateEmployeeModal;
