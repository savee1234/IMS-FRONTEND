import React, { useState } from 'react';
import './UpdateStatusModal.css';

export default function UpdateStatusModal({ assignment, onClose, onSubmit }) {
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [file, setFile] = useState(null);

  const resetForm = () => {
    setStatus('');
    setRemark('');
    setDocumentTitle('');
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      assignmentId: assignment?.id || assignment?.requestRef || null,
      status,
      remark,
      documentTitle,
      file
    };
    if (onSubmit) onSubmit(payload);
  };

  return (
    <div className="us-overlay" role="dialog" aria-modal="true">
      <div className="us-modal">
        <div className="us-header">
          <h3>Update Status</h3>
          <button className="us-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="us-body" onSubmit={handleSubmit}>
          <div className="us-row">
            <label className="us-label">Status</label>
            <select className="us-input" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="us-row">
            <label className="us-label">Remark</label>
            <textarea className="us-input" placeholder="Enter remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
          </div>

          <div className="us-row">
            <label className="us-label">Document Title</label>
            <input className="us-input" placeholder="Enter document title" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} />
          </div>

          <div className="us-row">
            <label className="us-label">Document Reference</label>
            <input type="file" className="us-file" onChange={(e) => setFile(e.target.files[0] || null)} />
          </div>

          <div className="us-actions">
            <button type="button" className="us-btn us-reset" onClick={resetForm}>Reset</button>
            <button type="submit" className="us-btn us-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
