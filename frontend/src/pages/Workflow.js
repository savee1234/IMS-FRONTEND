// src/pages/Workflow.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import './Workflow.css';

const Workflow = () => {
  return (
    <div className="workflow-page-wrapper">
      <Sidebar />
      <div className="workflow-main-content">
        <div className="page-container">
          <div className="page-header">
            <h1 className="page-title">Workflow & Process Module</h1>
            <p className="page-subtitle">Manage workflow by tracking and assigning tasks to relevant officers</p>
          </div>

          <div className="card">
            <p className="workflow-description">
              Once a complaint is lodged, this module manages the workflow by tracking and assigning tasks to relevant officers.
            </p>
            <ul className="workflow-list">
              <li>✅ Officers can view capable employees and those in the current roster.</li>
              <li>✅ Tasks can be assigned to multiple employees, but only one is the <strong>Accountable Officer</strong>.</li>
              <li>✅ Only the Accountable Officer can mark an issue as <strong>Resolved</strong> or <strong>Rejected</strong>.</li>
              <li>🕑 Assigned employees can update progress/comments, visible on their <strong>Pending Assignments</strong> page.</li>
              <li>📊 Supervisors can view all assignments and their due-date color-coded statuses in a hierarchy.</li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Workflow;
