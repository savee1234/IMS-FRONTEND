// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.text}>© {new Date().getFullYear()} SLT Incident Management System. All rights reserved.</p>
        <div style={styles.links}>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
          <a href="/terms" style={styles.link}>Terms of Service</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '20px 0',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    zIndex: 999,
    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
    borderTop: '1px solid #e2e8f0',
    marginTop: 'auto'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    padding: '0 2rem',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  text: {
    margin: 0,
    fontSize: '14px',
    color: '#1e293b',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  }
};

export default Footer;