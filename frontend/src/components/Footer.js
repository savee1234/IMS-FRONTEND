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
    backgroundColor: '#1f2a44',
    color: '#ffffff',
    padding: '12px 0',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 999,
    boxShadow: '0 -2px 10px rgba(2,6,23,0.18)',
    borderTop: 'none',
    marginTop: 'auto'
  },
  content: {
    maxWidth: '1600px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    padding: '0 2rem',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  text: {
    margin: 0,
    fontSize: '14px',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    color: '#ffffff',
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
