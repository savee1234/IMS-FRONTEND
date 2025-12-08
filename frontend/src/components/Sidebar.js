import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import sltLogo from '../assets/slt-logo.png';

const Sidebar = () => {
  const location = useLocation();
  const [isModulesOpen, setIsModulesOpen] = useState(false);

  const modulesPaths = [
    '/complaint',
    '/workflow',
    '/roster',
    '/users',
    '/attendance',
    '/configuration',
    '/dashboard',
    '/reporting',
    '/my-tasks',
    '/main-assignment',
    '/sub-assignment',
    '/all-assignments',
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <aside style={styles.sidebar}>
      {/* Logo and Title */}
      <div style={styles.sidebarHeader}>
        <img src={sltLogo} alt="SLT Logo" style={styles.logo} />
        <h2 style={styles.sidebarTitle}>IMS</h2>
      </div>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        <Link
          to="/"
          style={
            location.pathname === '/'
              ? { ...styles.navLink, ...styles.navLinkActive }
              : styles.navLink
          }
        >
          <span style={styles.navIcon}>🏠</span>
          <span>Home</span>
        </Link>

        {/* Modules Section */}
        <div style={styles.navSection}>
        <button
          type="button"
          style={{
            ...styles.navSectionButton,
            ...(isModulesOpen ? styles.navSectionButtonHover : {})
          }}
          onClick={() => setIsModulesOpen(!isModulesOpen)}
          onMouseEnter={(e) => {
            if (!isModulesOpen) {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (!isModulesOpen) {
              e.target.style.background = 'transparent';
              e.target.style.color = 'rgba(255, 255, 255, 0.8)';
            }
          }}
        >
            <span style={styles.navIcon}>📦</span>
            <span>Modules</span>
            <span style={styles.chevron}>{isModulesOpen ? '▼' : '▶'}</span>
          </button>
          {isModulesOpen && (
            <div style={styles.subNav}>
              <Link to="/complaint" style={location.pathname === '/complaint' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Complaint Onboard</Link>
              <Link to="/workflow" style={location.pathname === '/workflow' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Workflow</Link>
              <Link to="/roster" style={location.pathname === '/roster' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Roster Management</Link>
              <Link to="/users" style={location.pathname === '/users' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>User Management</Link>
              <Link to="/attendance" style={location.pathname === '/attendance' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Attendance</Link>
              <Link to="/configuration" style={location.pathname === '/configuration' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Configuration</Link>
              <Link to="/dashboard" style={location.pathname === '/dashboard' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Dashboard</Link>
              <Link to="/reporting" style={location.pathname === '/reporting' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Reporting</Link>
              <Link to="/my-tasks" style={location.pathname === '/my-tasks' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>View Tasks</Link>
              <Link to="/main-assignment" style={location.pathname === '/main-assignment' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Main Assignment</Link>
              <Link to="/sub-assignment" style={location.pathname === '/sub-assignment' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Sub Assignment</Link>
              <Link to="/all-assignments" style={location.pathname === '/all-assignments' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>All Assignments</Link>
            </div>
          )}
        </div>

        <Link
          to="/about"
          style={
            location.pathname === '/about'
              ? { ...styles.navLink, ...styles.navLinkActive }
              : styles.navLink
          }
        >
          <span style={styles.navIcon}>ℹ️</span>
          <span>About</span>
        </Link>
      </nav>

      {/* User Section */}
      <div style={styles.sidebarFooter}>
        <div style={styles.userInfo}>
          <div style={styles.userIcon}>👤</div>
          <div style={styles.userDetails}>
            <div style={styles.userName}>User</div>
            <div style={styles.userRole}>Admin</div>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          style={styles.logoutBtn}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <span style={styles.navIcon}>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '260px',
    height: '100vh',
    background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', sans-serif",
    overflowY: 'auto',
  },
  sidebarHeader: {
    padding: '1.5rem 1.25rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  logo: {
    height: '40px',
    borderRadius: '8px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
  },
  sidebarTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: 0,
    fontFamily: "'Poppins', 'Inter', sans-serif",
    background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  nav: {
    flex: 1,
    padding: '1rem 0',
    overflowY: 'auto',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.25rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    borderLeft: '3px solid transparent',
    borderRadius: '0 8px 8px 0',
  },
  navLinkActive: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    borderLeftColor: '#60a5fa',
    fontWeight: 600,
  },
  navIcon: {
    fontSize: '1.1rem',
    width: '20px',
    textAlign: 'center',
  },
  navSection: {
    marginTop: '0.5rem',
  },
  navSectionButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.25rem',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderLeft: '3px solid transparent',
    borderRadius: '0 8px 8px 0',
    fontFamily: 'inherit',
  },
  navSectionButtonHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  },
  chevron: {
    marginLeft: 'auto',
    fontSize: '0.75rem',
  },
  subNav: {
    paddingLeft: '2rem',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  subNavLink: {
    display: 'block',
    padding: '0.625rem 1.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    borderLeft: '2px solid transparent',
    borderRadius: '0 6px 6px 0',
  },
  subNavLinkActive: {
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
    borderLeftColor: '#60a5fa',
    fontWeight: 600,
  },
  sidebarFooter: {
    padding: '1.25rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  userIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  userRole: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
  logoutBtnHover: {
    background: 'rgba(239, 68, 68, 0.3)',
    transform: 'translateY(-1px)',
  },
};

export default Sidebar;

