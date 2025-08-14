// src/pages/Workflow.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const Workflow = () => {
  
  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    videoBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -2,
    },
    gradientOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%)',
      zIndex: -1,
    },
  };
  const containerStyle = {
    padding: '2rem',
    marginTop: '4rem',
    fontFamily: 'Arial, sans-serif',
    minHeight: '80vh',
    backgroundColor: '#f4f7fa',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  };

  const paragraphStyle = {
    marginBottom: '1rem',
    lineHeight: '1.7',
    color: '#34495e',
  };

  const listStyle = {
    paddingLeft: '1.5rem',
  };

  const listItemStyle = {
    marginBottom: '0.5rem',
  };

  return (
    <div style={styles.page}>
              <video autoPlay loop muted style={styles.videoBackground}>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div style={styles.gradientOverlay}></div>
      <Navbar />
      <div style={containerStyle}>
        <h2 style={titleStyle}>Workflow & Process Module</h2>

        <div style={cardStyle}>
          <p style={paragraphStyle}>
            Once a complaint is lodged, this module manages the workflow by tracking and assigning tasks to relevant officers.
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              ✅ Officers can view capable employees and those in the current roster.
            </li>
            <li style={listItemStyle}>
              ✅ Tasks can be assigned to multiple employees, but only one is the **Accountable Officer**.
            </li>
            <li style={listItemStyle}>
              ✅ Only the Accountable Officer can mark an issue as <strong>Resolved</strong> or <strong>Rejected</strong>.
            </li>
            <li style={listItemStyle}>
              🕑 Assigned employees can update progress/comments, visible on their <strong>Pending Assignments</strong> page.
            </li>
            <li style={listItemStyle}>
              📊 Supervisors can view all assignments and their due-date color-coded statuses in a hierarchy.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Workflow;
