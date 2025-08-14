import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sltLogo from '../assets/slt-logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const modulesPaths = [
    '/complaint',
    '/workflow',
    '/roster',
    '/users',
    '/attendance',
    '/configuration',
    '/notification',
    '/reporting',
    '/pending-assignments',
    '/my-tasks',
  ];

  const handleLogout = () => {
    localStorage.removeItem('staff');
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsModulesOpen(false);
      }
    }
    
    if (isModulesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModulesOpen]);

  return (
    <>
      <nav style={styles.navbar}>
        {/* Left: Logo and Title */}
        <div style={styles.leftSection}>
          <img src={sltLogo} alt="SLT Logo" style={styles.logo} />
          <h1 style={styles.title}>Incident Management System</h1>
        </div>

        {/* Right: Navigation Links and Actions */}
        <div style={styles.rightSection}>
          <div style={styles.links}>
            {/* Home */}
            <Link
              to="/"
              style={
                location.pathname === '/'
                  ? { ...styles.link, ...styles.activeLink }
                  : styles.link
              }
            >
              Home
            </Link>

            {/* Modules dropdown */}
            <div
              style={styles.dropdown}
              ref={dropdownRef}
            >
              <button
                type="button"
                style={
                  modulesPaths.includes(location.pathname)
                    ? { ...styles.dropdownButton, ...styles.activeLink }
                    : styles.dropdownButton
                }
                onClick={() => setIsModulesOpen((prev) => !prev)}
              >
                Modules ▾
              </button>
              {isModulesOpen && (
                <div style={styles.dropdownMenu}>
                  <Link to="/complaint" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Complaint Onboard</Link>
                  <Link to="/workflow" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Workflow</Link>
                  <Link to="/roster" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Roster Management</Link>
                  <Link to="/users" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>User Management</Link>
                  <Link to="/attendance" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Attendance</Link>
                  <Link to="/configuration" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Configuration</Link>
                  <Link to="/notification" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Notification</Link>
                  <Link to="/reporting" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Reporting</Link>
                  <Link to="/pending-assignments" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>Pending Assignments</Link>
                  <Link to="/my-tasks" onClick={() => setIsModulesOpen(false)} style={styles.dropdownItem}>View Tasks</Link>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              to="/about"
              style={
                location.pathname === '/about'
                  ? { ...styles.link, ...styles.activeLink }
                  : styles.link
              }
            >
              About
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              style={
                location.pathname === '/contact'
                  ? { ...styles.link, ...styles.activeLink }
                  : styles.link
              }
            >
              Contact
            </Link>
          </div>

          <div style={styles.actions}>
            <span style={styles.userIcon}>👤</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </nav>
      <div style={styles.navbarSpacer} />
    </>
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
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
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
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '0.4px',
    color: '#ffffff',
    margin: 0,
    marginLeft: '8px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginRight: '10px',
    
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
    color: '#ffffff',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  dropdown: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  dropdownButton: {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    padding: 0,
    lineHeight: 1.2,
    transition: 'all 0.3s',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#ffffff',
    color: '#002b5b',
    minWidth: '220px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    borderRadius: '6px',
    padding: '8px 0',
    zIndex: 1001,
  },
  dropdownItem: {
    display: 'block',
    padding: '10px 14px',
    color: '#002b5b',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  userIcon: {
    fontSize: '20px',
    marginRight:'20px',
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
  navbarSpacer: {
    height: '64px',
  },
};

export default Navbar;
