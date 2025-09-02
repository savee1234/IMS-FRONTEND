// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} SLT Incident Management System. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#002b5b',
    color: '#ffffff',
    padding: '16px 0',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 999,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.15)',
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
};

export default Footer;
