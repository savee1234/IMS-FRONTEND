import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 

const About = () => {
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
    container: {
      maxWidth: '1000px',
      width: '100%',
      margin: '0 auto',
      padding: '3rem',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#1e293b',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '24px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    containerBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '6px',
      background: 'linear-gradient(90deg, #3498db, #2980b9, #3498db)',
      borderRadius: '24px 24px 0 0',
    },
    header: {
      color: '#1e293b',
      borderBottom: '2px solid #3498db',
      paddingBottom: '0.5rem',
      marginBottom: '1.5rem'
    },
    subHeader: {
      color: '#2563eb',
      margin: '1.5rem 0 1rem 0'
    },
    paragraph: {
      marginBottom: '1.2rem',
      fontSize: '1.05rem',
      color: '#334155'
    },
    featureList: {
      paddingLeft: '1.5rem',
      margin: '1rem 0'
    },
    listItem: {
      marginBottom: '0.8rem',
      paddingLeft: '0.5rem',
      color: '#475569'
    },
    highlight: {
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      padding: '2rem',
      borderRadius: '12px',
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
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    },
    tagline: {
      fontStyle: 'italic',
      color: '#64748b',
      textAlign: 'center',
      marginTop: '2rem',
      borderTop: '1px solid rgba(52, 152, 219, 0.3)',
      paddingTop: '1rem'
    }
  };

  return (
    <div style={styles.page}>
      
      <div style={styles.gradientOverlay}></div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.containerBefore}></div>
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
      <Footer />
    </div>
  );
};

export default About;