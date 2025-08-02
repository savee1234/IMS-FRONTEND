import React from 'react';

const About = () => {
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    },
    header: {
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '0.5rem',
      marginBottom: '1.5rem'
    },
    subHeader: {
      color: '#3498db',
      margin: '1.5rem 0 1rem 0'
    },
    paragraph: {
      marginBottom: '1.2rem',
      fontSize: '1.05rem'
    },
    featureList: {
      paddingLeft: '1.5rem',
      margin: '1rem 0'
    },
    listItem: {
      marginBottom: '0.8rem',
      paddingLeft: '0.5rem'
    },
    highlight: {
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      borderRadius: '8px',
      margin: '2rem 0',
      borderLeft: '4px solid #3498db'
    },
    imageContainer: {
      textAlign: 'center',
      margin: '2rem 0'
    },
    systemImage: {
      maxWidth: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    tagline: {
      fontStyle: 'italic',
      color: '#7f8c8d',
      textAlign: 'center',
      marginTop: '2rem',
      borderTop: '1px solid #ecf0f1',
      paddingTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Our Incident Management System</h1>

      <div style={styles.imageContainer}>
        {/* Replace with your actual image */}
        <img 
          src="https://via.placeholder.com/800x400?text=IMS+Dashboard" 
          alt="IMS System Overview" 
          style={styles.systemImage}
        />
      </div>

      <p style={styles.paragraph}>
        The <strong>Incident Management System (IMS)</strong> is SLT Digital Platforms Division's centralized platform for efficient incident tracking and resolution, replacing manual processes with automated workflows.
      </p>

      <div style={styles.highlight}>
        <h2 style={styles.subHeader}>Key Benefits</h2>
        <ul style={styles.featureList}>
          <li style={styles.listItem}><strong>Faster Response:</strong> Reduces incident resolution time</li>
          <li style={styles.listItem}><strong>24/7 Availability:</strong> Ensures continuous service monitoring</li>
          <li style={styles.listItem}><strong>Transparent Tracking:</strong> Real-time status updates</li>
          <li style={styles.listItem}><strong>Automated Workflows:</strong> Smart routing to appropriate teams</li>
        </ul>
      </div>

      <h2 style={styles.subHeader}>For All Users</h2>
      <ul style={styles.featureList}>
        <li style={styles.listItem}>Customers report issues easily</li>
        <li style={styles.listItem}>Agents log and track incidents</li>
        <li style={styles.listItem}>Technicians resolve with clear priorities</li>
        <li style={styles.listItem}>Managers monitor performance metrics</li>
      </ul>

      <p style={styles.tagline}>
        Supporting SLT in delivering exceptional digital experiences through smarter incident management.
      </p>
    </div>
  );
};

export default About;