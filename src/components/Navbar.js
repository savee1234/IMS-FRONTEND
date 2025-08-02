// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sltLogo from '../assets/slt-logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('staff');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      {/* Left: Logo and Title */}
      <div style={styles.leftSection}>
        <img src={sltLogo} alt="SLT Logo" style={styles.logo} />
        <h1 style={styles.title}>Incident Management System</h1>
      </div>

      {/* Right: Navigation Links and Actions */}
      <div style={styles.rightSection}>
        <div style={styles.links}>
          {['/', '/about', '/contact'].map((path, index) => (
            <Link
              key={index}
              to={path}
              style={
                location.pathname === path
                  ? { ...styles.link, ...styles.activeLink }
                  : styles.link
              }
            >
              {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          ))}
        </div>

        <div style={styles.actions}>
          <span style={styles.userIcon}>👤</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#002b5b',
    color: '#fff',
    padding: '10px 30px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '45px',
    marginRight: '14px',
    borderRadius: '4px',
  },
  title: {
    fontSize: '18px', // ↓ smaller title size
    fontWeight: 600,
    letterSpacing: '0.4px',
    color: '#ffffff',
    margin: 0,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    gap: '24px',
    marginRight: '20px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.3s',
  },
  activeLink: {
    fontWeight: 600,
    color: '#ffffff', // keep Home white when active
    // underline removed
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userIcon: {
    fontSize: '18px',
  },
  logoutBtn: {
    backgroundColor: '#ffcc00',
    color: '#002b5b',
    border: 'none',
    padding: '6px 14px',
    fontWeight: 600,
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  },
};

export default Navbar;
