import React from 'react';
import './ProgressModal.css';
import { FaChevronDown } from 'react-icons/fa';

export default function ProgressModal({ assignment, onClose }) {
  if (!assignment) return null;

  const statusHistory = assignment.statusHistory || [
    { status: 'OPEN', date: '10/23/2025 12:24:44 PM', from: '015777', to: '015777', remark: '' }
  ];

  return (
    <div className="pm-overlay" role="dialog" aria-modal="true">
      <div className="pm-modal">
        <div className="pm-header">
          <h3>Update Status</h3>
          <button className="pm-close" onClick={onClose}>✕</button>
        </div>

        <div className="pm-body">
          <div className="pm-chip-row">
            {statusHistory.map((s, i) => (
              <div key={i} className={`pm-chip ${s.status.toLowerCase()}`}>
                <div className="pm-chip-title">{s.status}</div>
                <div className="pm-chip-sub">{s.status}</div>
              </div>
            ))}
          </div>

          <div className="pm-detail">
            <div className="pm-detail-row"><div className="pm-detail-key">Assigned From:</div><div className="pm-detail-val">: 015777 - Romaine Murcott</div></div>
            <div className="pm-detail-row"><div className="pm-detail-key">Assigned To</div><div className="pm-detail-val">: 015777 - Romaine Murcott</div></div>
            <div className="pm-detail-row"><div className="pm-detail-key">Status Changed Date/Time</div><div className="pm-detail-val">: {statusHistory[0].date}</div></div>
            <div className="pm-detail-row"><div className="pm-detail-key">Status Change Remark</div><div className="pm-detail-val">: {statusHistory[0].remark || ''}</div></div>
          </div>
        </div>

      </div>
    </div>
  );
}
