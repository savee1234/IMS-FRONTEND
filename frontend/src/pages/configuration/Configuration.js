import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Settings } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import './ConfigurationModern.css';
import '../complaint/ComplaintForm.css';

// Import sub-components
import OnboardMedium from './OnboardMedium';
import Organization from './Organization';
import Organizations from './Organizations';
import SolutionsProjects from './SolutionsProjects';
import Shifts from './Shifts';

const Configuration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('onboardMedium');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveCategory(tab);
    }
  }, [location.search]);

  const renderActiveComponent = () => {
    switch (activeCategory) {
      case 'onboardMedium': return <OnboardMedium />;
      case 'organization': return <Organization />;
      case 'organizations': return <Organizations />;
      case 'solutionsPerProject': return <SolutionsProjects />;
      case 'shifts': return <Shifts />;
      default: return <OnboardMedium />;
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

  const headerStyle = {
    height: '80px',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '2rem'
  };

  const searchContainerStyle = {
    position: 'relative',
    width: '320px',
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '10px 16px 10px 40px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: '0.95rem',
    color: '#334155',
    outline: 'none',
  };

  const headerActionsStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  };

  const iconButtonStyle = {
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
  };

  const notificationDotStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    border: '2px solid #ffffff',
  };

  return (
    <div className="conf-wrapper" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Sidebar />
      <main className="conf-main" style={{ flex: 1, marginLeft: '260px', padding: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header matching Home page */}
        <header style={headerStyle}>
          <div style={searchContainerStyle}>
            <Search size={20} style={searchIconStyle} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={searchInputStyle}
            />
          </div>
          
          <div style={headerActionsStyle}>
            <button style={iconButtonStyle}>
              <Bell size={20} />
              <span style={notificationDotStyle}></span>
            </button>
            <button style={iconButtonStyle}>
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div style={{ padding: '2rem 3rem 80px 3rem' }}>
          <div className="conf-header">
            <h1 className="conf-title">{getPageTitle()}</h1>
          </div>

          <div className="conf-animate-fade-in">
            {renderActiveComponent()}
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default Configuration;
