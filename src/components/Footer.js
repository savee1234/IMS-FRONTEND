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
    marginTop: 'auto', // Push footer to bottom in flex layout
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
};

export default Footer;
