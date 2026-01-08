import React from 'react';

export default function ProgressModal({ assignment, onClose }) {
  if (!assignment) return null;

  const statusHistory = Array.isArray(assignment.statusHistory) && assignment.statusHistory.length > 0
    ? assignment.statusHistory
    : [
        { status: 'OPEN', date: '10/23/2025 12:24:44 PM', from: '015777', to: '015777', remark: '' }
      ];

  const statusColor = (s) => {
    const v = (s || '').toLowerCase();
    if (v.includes('complete')) return '#10b981';
    if (v.includes('progress')) return '#f59e0b';
    if (v.includes('hold')) return '#ef4444';
    if (v.includes('open')) return '#3b82f6';
    return '#6b7280';
  };

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Status Progress</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>

        <div style={styles.modalContent}>
          <div style={styles.timelineRow}>
            {statusHistory.map((s, i) => (
              <div key={i} style={styles.timelineItem}>
                <div style={{ ...styles.timelineBadge, backgroundColor: statusColor(s.status) }}>
                  {s.status}
                </div>
                {i < statusHistory.length - 1 && <div style={styles.timelineConnector} />}
              </div>
            ))}
          </div>

          <div style={styles.section}>
            <div style={styles.historyGrid}>
              {statusHistory.map((s, i) => (
                <div key={`row-${i}`} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={{ ...styles.cardStatus, backgroundColor: statusColor(s.status) }}>{s.status}</span>
                    <span style={styles.cardDate}>{s.date}</span>
                  </div>
                  <div style={styles.cardBody}>
                    <div style={styles.detailRow}>
                      <div style={styles.detailKey}>Assigned From</div>
                      <div style={styles.detailVal}>{s.from || '—'}</div>
                    </div>
                    <div style={styles.detailRow}>
                      <div style={styles.detailKey}>Assigned To</div>
                      <div style={styles.detailVal}>{s.to || '—'}</div>
                    </div>
                    <div style={styles.detailRow}>
                      <div style={styles.detailKey}>Remark</div>
                      <div style={styles.detailVal}>{s.remark || '—'}</div>
                    </div>
                  </div>
                </div>
              ))}
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
  timelineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 0',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  timelineBadge: {
    padding: '6px 12px',
    borderRadius: '9999px',
    color: '#ffffff',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  timelineConnector: {
    width: '32px',
    height: '2px',
    backgroundColor: '#e5e7eb'
  },
  section: {
    marginTop: '8px'
  },
  historyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px'
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(2, 6, 23, 0.06)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderBottom: '1px solid #f1f5f9'
  },
  cardStatus: {
    padding: '6px 10px',
    borderRadius: '9999px',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  cardDate: {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '500'
  },
  cardBody: {
    padding: '12px'
  },
  detailRow: {
    display: 'flex',
    gap: '8px',
    padding: '6px 0'
  },
  detailKey: {
    width: '140px',
    color: '#6b7280',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  detailVal: {
    color: '#111827',
    fontSize: '0.95rem',
    fontWeight: '500'
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
