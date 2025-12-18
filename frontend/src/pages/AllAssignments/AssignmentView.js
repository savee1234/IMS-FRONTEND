import React from 'react';

export default function AssignmentView({ assignment, onClose }) {
  if (!assignment) return null;

  const ref = assignment.requestRef || assignment.requestReference || assignment.reference || assignment._id || 'N/A';
  const title = assignment.title || 'N/A';
  const description = assignment.description || 'N/A';
  const status = assignment.status || 'Pending';
  const priority = assignment.priority || 'Medium';
  const assignedBy = assignment.assignedBy || 'N/A';
  const createdAt = assignment.createdAt ? new Date(assignment.createdAt).toLocaleString('en-GB') : 'N/A';
  const contactName = assignment.contactPerson || assignment.contactName || assignment.contact?.name || 'N/A';
  const org = assignment.organization || assignment.organizationName || assignment.organization?.organization || 'N/A';
  const categoryType = assignment.categoryType || 'N/A';
  const documentSubject = assignment.documentSubject || assignment.subject || 'N/A';
  const medium = assignment.medium || 'N/A';
  const mediumSource = assignment.mediumSource || 'N/A';
  const projectType = assignment.projectType || 'N/A';
  const projectName = assignment.projectName || 'N/A';
  const remarks = assignment.remarks || 'N/A';

  const assignedList = Array.isArray(assignment.assignedTo) ? assignment.assignedTo : [];
  const mainAssign = assignedList.filter(a => (a.assignmentType || '').toLowerCase().includes('main'));
  const subAssign = assignedList.filter(a => (a.assignmentType || '').toLowerCase().includes('sub'));

  const statusColor = (() => {
    const s = status.toLowerCase();
    if (s.includes('complete')) return '#10b981';
    if (s.includes('progress')) return '#f59e0b';
    if (s.includes('hold')) return '#ef4444';
    return '#3b82f6';
  })();

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Assignment Details</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>

        <div style={styles.modalContent}>
          <div style={styles.section}>
            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.label}>Request Reference</span>
                <span style={styles.value}>{ref}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Title</span>
                <span style={styles.value}>{title}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Description</span>
                <span style={styles.value}>{description}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Status</span>
                <span style={{...styles.value, display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff'}}>
                  <span style={{...styles.statusBadge, backgroundColor: statusColor, color: '#ffffff'}}>{status}</span>
                </span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Priority</span>
                <span style={styles.value}>{priority}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Assigned By</span>
                <span style={styles.value}>{assignedBy}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Created At</span>
                <span style={styles.value}>{createdAt}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Organization</span>
                <span style={styles.value}>{org}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Category Type</span>
                <span style={styles.value}>{categoryType}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Document Subject</span>
                <span style={styles.value}>{documentSubject}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Medium</span>
                <span style={styles.value}>{medium}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Medium Source</span>
                <span style={styles.value}>{mediumSource}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Project Type</span>
                <span style={styles.value}>{projectType}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Project Name</span>
                <span style={styles.value}>{projectName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Contact Person</span>
                <span style={styles.value}>{contactName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Remarks</span>
                <span style={styles.value}>{remarks}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.privilegesContainer}>
              <div style={styles.privilegeSection}>
                <h3 style={styles.privilegeSectionTitle}>Main Assigners</h3>
                <div style={styles.privilegeList}>
                  {mainAssign.length === 0 && (
                    <div style={styles.noPrivileges}>
                      <p style={styles.noPrivilegesText}>None</p>
                    </div>
                  )}
                  {mainAssign.map((a, i) => {
                    const name = a.user?.userName || a.user?.name || 'Unknown';
                    return (
                      <div key={`main-${i}`} style={styles.privilegeItem}>
                        <span style={{...styles.statusBadge, backgroundColor: '#4f46e5', color: '#ffffff'}}>Main</span>
                        <span style={styles.privilegeText}>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={styles.privilegeSection}>
                <h3 style={styles.privilegeSectionTitle}>Sub Assigners</h3>
                <div style={styles.privilegeList}>
                  {subAssign.length === 0 && (
                    <div style={styles.noPrivileges}>
                      <p style={styles.noPrivilegesText}>None</p>
                    </div>
                  )}
                  {subAssign.map((a, i) => {
                    const name = a.user?.userName || a.user?.name || 'Unknown';
                    return (
                      <div key={`sub-${i}`} style={styles.privilegeItem}>
                        <span style={{...styles.statusBadge, backgroundColor: '#0ea5e9', color: '#ffffff'}}>Sub</span>
                        <span style={styles.privilegeText}>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.closeModalButton}>Close</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(2, 6, 23, 0.3)',
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
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  privilegesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  privilegeSection: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(2, 6, 23, 0.06)'
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
  privilegeText: {
    fontSize: '0.875rem',
    color: '#374151'
  },
  noPrivileges: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  noPrivilegesText: {
    fontSize: '1rem',
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
  }
};
