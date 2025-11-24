import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import sltLogo from '../assets/slt-logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const dropdownRef = useRef(null);

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
              onMouseOver={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.color = '#93c5fd';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.color = styles.link.color;
                  e.target.style.transform = 'translateY(0)';
                }
              }}
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
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  if (!modulesPaths.includes(location.pathname)) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Modules ▾
              </button>
              {isModulesOpen && (
                <div style={styles.dropdownMenu}>
                  <Link 
                    to="/complaint" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Complaint Onboard
                </Link>
                  <Link 
                    to="/workflow" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Workflow
                </Link>
                  <Link 
                    to="/roster" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Roster Management
                </Link>
                  <Link 
                    to="/users" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  User Management
                </Link>
                  <Link 
                    to="/attendance" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Attendance
                </Link>
                  <Link 
                    to="/configuration" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Configuration
                </Link>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Dashboard
                </Link>
                  <Link 
                    to="/reporting" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Reporting
                </Link>
                  <Link 
                    to="/my-tasks" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  View Tasks
                </Link>
                  <Link 
                    to="/main-assignment" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Main Assignment
                </Link>
                  <Link 
                    to="/sub-assignment" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  Sub Assignment
                </Link>
                  <Link 
                    to="/all-assignments" 
                    onClick={() => setIsModulesOpen(false)} 
                    style={styles.dropdownItem}
                    onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.35)';
                  e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = '#e5e7eb';
                  }}
                >
                  All Assignments
                </Link>
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
              onMouseOver={(e) => {
                if (location.pathname !== '/about') {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== '/about') {
                  e.target.style.backgroundColor = '';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              About
            </Link>

          </div>

          <div style={styles.actions}>
            <div style={styles.userIconContainer}>
              <svg 
                style={styles.userIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" 
                  stroke="#0f172a" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" 
                  stroke="#0f172a" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button 
              onClick={handleLogout} 
              style={styles.logoutBtn}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.3)';
              }}
            >
              Logout
            </button>
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
    backgroundColor: '#ffffff',
    color: '#1f2937',
    padding: '12px 30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1000,
    borderBottom: '1px solid #e5e7eb',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  logo: {
    height: '40px',
    marginRight: '12px',
    borderRadius: '4px',
    flexShrink: 0
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '0.3px',
    color: '#0f172a',
    margin: 0,
    fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Segoe UI', sans-serif",
    whiteSpace: 'nowrap'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginRight: '10px',
    
  },
  link: {
    color: '#374151',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 500,
    transition: 'all 0.3s',
    padding: '8px 16px',
    borderRadius: '6px',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  activeLink: {
    fontWeight: 600,
    color: '#111827',
    backgroundColor: 'transparent',
    border: 'none'
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
    border: '1px solid #e5e7eb',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    lineHeight: 1.2,
    transition: 'all 0.3s',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#ffffff',
    color: '#374151',
    minWidth: '220px',
    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
    borderRadius: '8px',
    padding: '8px 0',
    zIndex: 1001,
    border: '1px solid #e5e7eb'
  },
  dropdownItem: {
    display: 'block',
    padding: '12px 16px',
    color: '#374151',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
  },
  dropdownItemHover: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    color: '#000000'
  },
  userIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(59,130,246,0.15)',
    marginRight: '20px',
  },
  userIcon: {
    width: '20px',
    height: '20px',
  },
  logoutBtn: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    fontWeight: 600,
    fontSize: '14px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif",
    boxShadow: '0 6px 12px rgba(59, 130, 246, 0.35)'
  },
  logoutBtnHover: {
    backgroundColor: '#2563eb',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(59, 130, 246, 0.4)'
  },
  navbarSpacer: {
    height: '68px',
  },
};

export default Navbar;
