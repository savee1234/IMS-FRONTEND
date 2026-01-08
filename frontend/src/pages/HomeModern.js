import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Search, Bell, Settings, ArrowRight, CheckSquare, Calendar, Users, Settings as ConfigIcon, BarChart, ClipboardList, ClipboardCheck, List } from 'lucide-react';

const HomeModern = () => {
  const navigate = useNavigate();
  const [hoveredModule, setHoveredModule] = useState(null);

  const modules = [
    {
      name: 'Complaint Onboard',
      path: '/complaint',
      icon: <Bell size={24} />,
      color: '#3b82f6', // blue
      bgColor: '#eff6ff',
      description: 'Efficiently capture and manage customer complaints'
    },
    {
      name: 'Roster Management',
      path: '/roster',
      icon: <Calendar size={24} />,
      color: '#10b981', // green
      bgColor: '#ecfdf5',
      description: 'Manage employee schedules and assignments'
    },
    {
      name: 'User Management',
      path: '/users',
      icon: <Users size={24} />,
      color: '#f59e0b', // amber
      bgColor: '#fffbeb',
      description: 'Control access and permissions'
    },
    {
      name: 'Configuration',
      path: '/configuration',
      icon: <ConfigIcon size={24} />,
      color: '#6366f1', // indigo
      bgColor: '#eef2ff',
      description: 'Customize system settings and parameters'
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart size={24} />,
      color: '#ec4899', // pink
      bgColor: '#fdf2f8',
      description: 'Get real-time insights and analytics'
    },
    {
      name: 'View My Tasks',
      path: '/my-tasks',
      icon: <CheckSquare size={24} />,
      color: '#8b5cf6', // violet
      bgColor: '#f5f3ff',
      description: 'Monitor and manage your assigned tasks'
    },
    {
      name: 'Main Assignment',
      path: '/main-assignment',
      icon: <ClipboardCheck size={24} />,
      color: '#f97316', // orange
      bgColor: '#fff7ed',
      description: 'Handle primary assignments and responsibilities'
    },
    {
      name: 'Sub Assignment',
      path: '/sub-assignment',
      icon: <List size={24} />,
      color: '#14b8a6', // teal
      bgColor: '#f0fdfa',
      description: 'Manage sub-tasks and delegated responsibilities'
    },
    {
      name: 'All Assignments',
      path: '/all-assignments',
      icon: <ClipboardList size={24} />,
      color: '#f43f5e', // rose
      bgColor: '#fff1f2',
      description: 'Overview all assignments and track progress'
    }
  ];

  return (
    <div style={styles.pageContainer}>
      <Sidebar />
      
      <main style={styles.mainContent}>
        {/* Top Header */}
        <header style={styles.header}>
          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.headerActions}>
            <button style={styles.iconButton}>
              <Bell size={20} />
              <span style={styles.notificationDot}></span>
            </button>
            <button style={styles.iconButton}>
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div style={styles.contentWrapper}>
          {/* Hero Section */}
          <section style={styles.heroCard}>
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>Incident Management System</h1>
              <p style={styles.heroDescription}>
                Modern workflows for IT incidents, tracking and resolution. 
                Streamline your operations with our intelligent platform.
              </p>
              
              <div style={styles.heroButtons}>
                <button 
                  style={styles.primaryButton}
                  onClick={() => navigate('/complaint')}
                >
                  Get Started <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
                <button 
                  style={styles.secondaryButton}
                  onClick={() => navigate('/dashboard')}
                >
                  View Dashboard
                </button>
              </div>
            </div>
            
            <div style={styles.heroImageContainer}>
              {/* Abstract 3D Cube Representation using CSS/SVG */}
              <div style={styles.abstractShapes}>
                <div style={styles.shapeCube1}></div>
                <div style={styles.shapeCube2}></div>
                <div style={styles.shapeCube3}></div>
                <div style={styles.shapeCube4}></div>
              </div>
            </div>
          </section>

          {/* Modules Section */}
          <section style={styles.modulesSection}>
            <h2 style={styles.sectionTitle}>Available Modules</h2>
            <p style={styles.sectionSubtitle}>
              Explore our comprehensive suite of tools designed to streamline your incident management workflow
            </p>
            
            <div style={styles.modulesGrid}>
              {modules.map((module, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.moduleCard,
                    ...(hoveredModule === index ? styles.moduleCardHover : {})
                  }}
                  onMouseEnter={() => setHoveredModule(index)}
                  onMouseLeave={() => setHoveredModule(null)}
                  onClick={() => navigate(module.path)}
                >
                  <div style={{...styles.moduleIconBox, color: module.color, background: module.bgColor}}>
                    {module.icon}
                  </div>
                  <h3 style={{...styles.moduleTitle, color: hoveredModule === index ? module.color : '#1e293b'}}>
                    {module.name}
                  </h3>
                  <p style={styles.moduleDesc}>
                    {module.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#eff6ff',
    fontFamily: "'Inter', 'Poppins', sans-serif",
  },
  mainContent: {
    flex: 1,
    marginLeft: '260px', // Matches sidebar width
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '80px',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff', // Or transparent if needed, but usually white
    position: 'sticky',
    top: 0,
    zIndex: 10,
    // borderBottom: '1px solid #e2e8f0', // Optional, remove if cleaner look desired
  },
  searchContainer: {
    position: 'relative',
    width: '320px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 40px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: '0.95rem',
    color: '#334155',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  headerActions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  iconButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#64748b',
    position: 'relative',
    transition: 'all 0.2s',
  },
  notificationDot: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    border: '2px solid #ffffff',
  },
  contentWrapper: {
    padding: '20px 40px 40px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  
  // Hero Section
  heroCard: {
    background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', // Purple to Blue gradient
    borderRadius: '24px',
    padding: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#ffffff',
    marginBottom: '60px',
    boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '320px',
  },
  heroContent: {
    maxWidth: '550px',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
    fontFamily: "'Poppins', sans-serif",
  },
  heroDescription: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '32px',
    maxWidth: '480px',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 28px',
    backgroundColor: '#ffffff',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '100px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  secondaryButton: {
    padding: '12px 28px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '100px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'background-color 0.2s',
  },
  heroImageContainer: {
    position: 'relative',
    width: '400px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Abstract shapes to mimic the 3D illustration
  abstractShapes: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  shapeCube1: {
    position: 'absolute',
    top: '20%',
    right: '20%',
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    borderRadius: '24px',
    transform: 'rotate(-15deg) translateZ(0)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    zIndex: 2,
  },
  shapeCube2: {
    position: 'absolute',
    bottom: '15%',
    right: '40%',
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
    borderRadius: '16px',
    transform: 'rotate(20deg)',
    opacity: 0.9,
    zIndex: 3,
    boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
  },
  shapeCube3: {
    position: 'absolute',
    top: '10%',
    right: '50%',
    width: '60px',
    height: '60px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    backdropFilter: 'blur(5px)',
    transform: 'rotate(45deg)',
    zIndex: 1,
  },
  shapeCube4: {
    position: 'absolute',
    bottom: '30%',
    right: '10%',
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
    borderRadius: '12px',
    transform: 'rotate(-10deg)',
    zIndex: 1,
    opacity: 0.8,
  },

  // Modules Section
  modulesSection: {
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
    fontFamily: "'Poppins', sans-serif",
  },
  sectionSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '48px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '32px',
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    border: '1px solid #f1f5f9', // Very subtle border
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', // Subtle shadow
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  moduleCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  moduleIconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'background-color 0.3s',
  },
  moduleTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1e293b',
    transition: 'color 0.3s',
  },
  moduleDesc: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    lineHeight: 1.5,
  },
};

export default HomeModern;
