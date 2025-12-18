import React, { useEffect, useState } from 'react';
import './UpdateStatusModal.css';

export default function UpdateStatusModal({ assignment, onClose, onSubmit }) {
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    setStatus(assignment?.status || '');
  }, [assignment]);

  const resetForm = () => {
    setStatus('');
    setRemark('');
    setDocumentTitle('');
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      assignmentId: assignment?._id || assignment?.id || assignment?.requestRef || null,
      status,
      remark,
      documentTitle,
      file
    };
    if (onSubmit) onSubmit(payload);
  };

  const ref = assignment?._id || assignment?.requestRef || 'N/A';
  const title = assignment?.title || 'N/A';
  const currentStatus = assignment?.status || 'N/A';
  const priority = assignment?.priority || 'N/A';

  const statusColor = (() => {
    const s = (currentStatus || '').toLowerCase();
    if (s.includes('complete')) return '#10b981';
    if (s.includes('progress')) return '#f59e0b';
    if (s.includes('hold')) return '#ef4444';
    return '#3b82f6';
  })();

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Update Assignment</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>

        <form style={styles.modalContent} onSubmit={handleSubmit}>
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
                <span style={styles.label}>Current Status</span>
                <span style={{...styles.value, display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff'}}>
                  <span style={{...styles.statusBadge, backgroundColor: statusColor, color: '#ffffff'}}>{currentStatus}</span>
                </span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Priority</span>
                <span style={styles.value}>{priority}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Status</label>
                <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Document Title</label>
                <input style={styles.input} placeholder="Enter document title" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} />
              </div>
              <div style={styles.formGroupFull}>
                <label style={styles.formLabel}>Remark</label>
                <textarea style={{...styles.input, minHeight: '100px', resize: 'vertical'}} placeholder="Enter remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
              </div>
              <div style={styles.formGroupFull}>
                <label style={styles.formLabel}>Document Reference</label>
                <input type="file" style={styles.file} onChange={(e) => setFile(e.target.files[0] || null)} />
              </div>
            </div>
          </div>

          <div style={styles.modalFooter}>
            <button type="button" onClick={resetForm} style={styles.secondaryButton}>Reset</button>
            <button type="submit" style={styles.primaryButton}>Update</button>
          </div>
        </form>
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
    marginBottom: '24px'
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
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
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
  formLabel: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
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
  file: {
    padding: '8px 0',
    fontSize: '0.875rem'
  },
  modalFooter: {
    padding: '12px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#eaebec'
  },
  primaryButton: {
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
  secondaryButton: {
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
