import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ConfigurationModern.css';
import '../complaint/ComplaintForm.css'; // Import legacy styles for other components
import Sidebar from '../../components/Sidebar';

// Import sub-components
import OnboardMedium from './OnboardMedium';
import Organization from './Organization';
import Organizations from './Organizations';
import SolutionsProjects from './SolutionsProjects';
import Shifts from './Shifts';



const Configuration = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('onboardMedium');

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const allowed = new Set(['onboardMedium', 'organization', 'organizations', 'solutionsPerProject', 'shifts']);
    if (tab && allowed.has(tab)) {
      setActiveCategory(tab);
    }
  }, [location.search]);

  return (
    <div className="conf-wrapper">
      <Sidebar />
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
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Configuration;
