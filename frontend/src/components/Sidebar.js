import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import sltLogo from '../assets/slt-logo.png';

const Sidebar = () => {
  const location = useLocation();
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  

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
          <svg style={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
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
            <svg style={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#ffffff" strokeWidth="1.8" fill="none"/>
              <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#ffffff" strokeWidth="1.8" fill="none"/>
              <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#ffffff" strokeWidth="1.8" fill="none"/>
              <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="#ffffff" strokeWidth="1.8" fill="none"/>
            </svg>
            <span>Modules</span>
            <span style={styles.chevron}>{isModulesOpen ? '▼' : '▶'}</span>
          </button>
          {isModulesOpen && (
            <div style={styles.subNav}>
              <Link to="/complaint" style={location.pathname === '/complaint' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Complaint Onboard</Link>
              <Link to="/roster" style={location.pathname === '/roster' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Roster Management</Link>
              <Link to="/users" style={location.pathname === '/users' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>User Management</Link>
              <button
                type="button"
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                style={{ 
                  ...styles.subNavButton, 
                  ...(location.pathname === '/configuration' ? styles.subNavLinkActive : {}) 
                }}
              >
                <span>Configuration</span>
                <span style={styles.chevron}>{isConfigOpen ? '▼' : '▶'}</span>
              </button>
              {isConfigOpen && (
                <div style={styles.subNavIndentedGroup}>
                  <Link to="/configuration?tab=onboardMedium" style={location.search.includes('onboardMedium') ? { ...styles.subNavLinkIndented, ...styles.subNavLinkActive } : styles.subNavLinkIndented}>Onboard Medium</Link>
                  <Link to="/configuration?tab=organization" style={location.search.includes('organization') ? { ...styles.subNavLinkIndented, ...styles.subNavLinkActive } : styles.subNavLinkIndented}>Organizations</Link>
                  <Link to="/configuration?tab=organizations" style={location.search.includes('organizations') ? { ...styles.subNavLinkIndented, ...styles.subNavLinkActive } : styles.subNavLinkIndented}>Org. Contact Persons</Link>
                  <Link to="/configuration?tab=solutionsPerProject" style={location.search.includes('solutionsPerProject') ? { ...styles.subNavLinkIndented, ...styles.subNavLinkActive } : styles.subNavLinkIndented}>Solutions & Projects</Link>
                  <Link to="/configuration?tab=shifts" style={location.search.includes('shifts') ? { ...styles.subNavLinkIndented, ...styles.subNavLinkActive } : styles.subNavLinkIndented}>Roster Shift Periods</Link>
                </div>
              )}
              <Link to="/dashboard" style={location.pathname === '/dashboard' ? { ...styles.subNavLink, ...styles.subNavLinkActive } : styles.subNavLink}>Dashboard</Link>
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
          <svg style={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.8" fill="none"/>
            <path d="M12 8.5h0" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M11 11.5h2v6h-2z" fill="#ffffff"/>
          </svg>
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
        >
          Logout
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
    background: '#1f2a44',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.12)',
    zIndex: 1000,
    fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', sans-serif",
    overflowY: 'auto',
  },
  sidebarHeader: {
    padding: '1.5rem 1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    background: '#1f2a44',
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
    padding: '2rem 0 1rem',
    overflowY: 'auto',
    background: '#1f2a44',
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
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    borderLeftColor: '#93c5fd',
    fontWeight: 600,
  },
  navIcon: {
    fontSize: '1.1rem',
    width: '20px',
    textAlign: 'center',
  },
  navSection: {
    marginTop: '0.5rem',
    background: '#1f2a44',
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
    background: '#1f2a44',
  },
  subNavLink: {
    display: 'block',
    padding: '0.625rem 1.25rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    borderLeft: '2px solid transparent',
    borderRadius: '0 6px 6px 0',
  },
  subNavLinkIndented: {
    display: 'block',
    padding: '0.5rem 2.5rem',
    color: 'rgba(255, 255, 255, 0.75)',
    textDecoration: 'none',
    fontSize: '0.82rem',
    transition: 'all 0.2s ease',
    borderLeft: '2px solid transparent',
    borderRadius: '0 6px 6px 0',
  },
  subNavLinkActive: {
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.08)',
    borderLeftColor: '#93c5fd',
    fontWeight: 600,
  },
  subNavButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.625rem 1.25rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    borderLeft: '2px solid transparent',
    borderRadius: '0 6px 6px 0',
    width: '100%',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  subNavRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingRight: '1rem',
  },
  subNavLinkFlex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subNavToggle: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
  },
  subNavToggleActive: {
    color: '#ffffff',
  },
  subNavIndentedGroup: {
    paddingLeft: '0.5rem',
  },
  sidebarFooter: {
    padding: '1.25rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
    background: '#1f2a44',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
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
    textAlign: 'center',
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
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    marginTop: '0.5rem',
  },
};

export default Sidebar;
