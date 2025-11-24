import React from 'react';
import './AssignmentView.css';

const FieldRow = ({ label, value }) => (
  <div className="av-row">
    <div className="av-label">{label}</div>
    <div className="av-value">{value ?? '—'}</div>
  </div>
);

export default function AssignmentView({ assignment, onClose }) {
  if (!assignment) return null;

  const ref = assignment.requestRef || assignment.requestReference || assignment.reference || '—';
  const contactName = assignment.contactPerson || assignment.contactName || assignment.contact?.name || '—';
  const org = assignment.organization || assignment.organizationName || assignment.organization?.organization || '—';

  const mainAssign = assignment.mainAssignment || assignment.mainAssignments || [];
  const subAssign = assignment.subAssignments || assignment.subAssignmentsList || [];

  return (
    <div className="av-overlay" role="dialog" aria-modal="true">
      <div className="av-modal">
        <div className="av-header">
          <h2>Request Reference: {ref}</h2>
          <button className="av-close" onClick={onClose}>Back</button>
        </div>

        <div className="av-card">
          <div className="av-left">
            <FieldRow label="Category Type" value={assignment.categoryType} />
            <FieldRow label="Document Subject" value={assignment.documentSubject || assignment.subject} />
            <FieldRow label="Incident/Task" value={assignment.incidentTask} />
            <FieldRow label="Medium Source" value={assignment.mediumSource} />
            <FieldRow label="Project Type" value={assignment.projectType} />
            <FieldRow label="Contact Person" value={contactName} />
          </div>

          <div className="av-right">
            <FieldRow label="Criticality" value={assignment.criticality} />
            <FieldRow label="Document Reference" value={assignment.documentReference} />
            <FieldRow label="Medium" value={assignment.medium} />
            <FieldRow label="Organization" value={org} />
            <FieldRow label="Project Name" value={assignment.projectName} />
            <FieldRow label="Remarks" value={assignment.remarks} />
          </div>
        </div>

        <div className="av-section">
          <h3>Main Assignment</h3>
          <div className="av-table">
            <div className="av-tr av-th">
              <div>Emp No</div>
              <div>Name</div>
              <div>Designation</div>
              <div>Remarks</div>
            </div>
            {(mainAssign.length ? mainAssign : [{ empNo: assignment.empNo, name: contactName, designation: assignment.designation, remarks: assignment.remarks }]).map((r, idx) => (
              <div key={idx} className="av-tr">
                <div>{r.empNo ?? '—'}</div>
                <div>{r.name ?? '—'}</div>
                <div>{r.designation ?? '—'}</div>
                <div>{r.remarks ?? '—'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="av-section">
          <h3>Sub Assignments</h3>
          <div className="av-sub-list">
            {subAssign.length === 0 && (
              <div className="av-empty">No sub assignments</div>
            )}

            {subAssign.map((r, idx) => (
              <div key={idx} className="av-sub-card">
                <div className="av-sub-left">
                  <div className="av-badge">{r.empNo ?? '—'}</div>
                </div>
                <div className="av-sub-main">
                  <div className="av-sub-name">{r.name ?? r.contactName ?? '—'}</div>
                  <div className="av-sub-designation">{r.designation ?? '—'}</div>
                </div>
                <div className="av-sub-remarks">{r.remarks ?? ''}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
