import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaCog, 
  FaInfoCircle, 
  FaSignOutAlt, 
  FaLayerGroup, 
  FaBuilding, 
  FaAddressBook, 
  FaProjectDiagram, 
  FaCalendarAlt 
} from 'react-icons/fa';
import './ConfigurationModern.css';
import '../complaint/ComplaintForm.css'; // Import legacy styles for other components

// Import sub-components
import OnboardMedium from './OnboardMedium';
import Organization from './Organization';
import Organizations from './Organizations';
import SolutionsProjects from './SolutionsProjects';
import Shifts from './Shifts';



const Configuration = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('onboardMedium');
  const [isConfigOpen, setIsConfigOpen] = useState(true); // Configuration menu expanded by default

  const renderActiveComponent = () => {
    switch (activeCategory) {
      case 'onboardMedium':
        return <OnboardMedium />;
      case 'organization':
        return <Organization />;
      case 'organizations':
        return <Organizations />;
      case 'solutionsPerProject':
        return <SolutionsProjects />;
      case 'shifts':
        return <Shifts />;
      default:
        return <OnboardMedium />;
    }
  };

  const getPageTitle = () => {
    switch (activeCategory) {
      case 'onboardMedium': return 'Onboard Medium';
      case 'organization': return 'Organization';
      case 'organizations': return 'Org. Contact Persons';
      case 'solutionsPerProject': return 'Solutions & Projects';
      case 'shifts': return 'Roster Shift Periods';
      default: return 'Configuration';
    }
  };

  return (
    <div className="conf-wrapper">
      {/* Custom Sidebar for Configuration Module */}
      <aside className="conf-sidebar">
        <div className="conf-sidebar-header">
          <div className="conf-logo">IMS</div>
          <div className="conf-brand">IMS</div>
        </div>

        <nav className="conf-nav">
          <div className="conf-nav-item" onClick={() => navigate('/')}>
            <span className="conf-nav-icon"><FaHome /></span>
            <span>Home</span>
          </div>

          <div className="conf-nav-item active" onClick={() => setIsConfigOpen(!isConfigOpen)}>
            <span className="conf-nav-icon"><FaCog /></span>
            <span>Configuration</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>{isConfigOpen ? '▼' : '▶'}</span>
          </div>

          {isConfigOpen && (
            <div className="conf-submenu">
              <div 
                className={`conf-submenu-item ${activeCategory === 'onboardMedium' ? 'active' : ''}`}
                onClick={() => setActiveCategory('onboardMedium')}
              >
                Onboard Medium
              </div>
              <div 
                className={`conf-submenu-item ${activeCategory === 'organization' ? 'active' : ''}`}
                onClick={() => setActiveCategory('organization')}
              >
                Organizations
              </div>
              <div 
                className={`conf-submenu-item ${activeCategory === 'organizations' ? 'active' : ''}`}
                onClick={() => setActiveCategory('organizations')}
              >
                Org. Contact Persons
              </div>
              <div 
                className={`conf-submenu-item ${activeCategory === 'solutionsPerProject' ? 'active' : ''}`}
                onClick={() => setActiveCategory('solutionsPerProject')}
              >
                Solutions & Projects
              </div>
              <div 
                className={`conf-submenu-item ${activeCategory === 'shifts' ? 'active' : ''}`}
                onClick={() => setActiveCategory('shifts')}
              >
                Roster Shift Periods
              </div>
            </div>
          )}

          <div className="conf-nav-item">
            <span className="conf-nav-icon"><FaInfoCircle /></span>
            <span>About</span>
          </div>
        </nav>

        <div className="conf-user-profile">
          <img 
            src="https://ui-avatars.com/api/?name=User+Admin&background=0D8ABC&color=fff" 
            alt="User" 
            className="conf-avatar" 
          />
          <div className="conf-user-info">
            <h4>User</h4>
            <p>Admin</p>
          </div>
        </div>
        
        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
          <button className="conf-logout-btn" onClick={() => navigate('/login')}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="conf-main">
        <div className="conf-header">
          <h1 className="conf-title">{getPageTitle()}</h1>
        </div>

        <div className="conf-animate-fade-in">
          {renderActiveComponent()}
        </div>

        <footer className="conf-footer">
          <div>© 2025 SLT Incident Management System. All rights reserved.</div>
          <div className="conf-footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Configuration;
