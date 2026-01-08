import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfigurationModern.css';
import '../complaint/ComplaintForm.css'; // Import legacy styles for other components
import Sidebar from '../../components/Sidebar';
import HeaderBar from '../../components/HeaderBar';
import Footer from '../../components/Footer';

// Import sub-components
import OnboardMedium from './OnboardMedium';
import Organization from './Organization';
import Organizations from './Organizations';
import SolutionsProjects from './SolutionsProjects';
import Shifts from './Shifts';



const Configuration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('onboardMedium');

  const tabs = [
    { key: 'onboardMedium', label: 'Onboard Medium' },
    { key: 'organization', label: 'Organizations' },
    { key: 'organizations', label: 'Org. Contact Persons' },
    { key: 'solutionsPerProject', label: 'Solutions & Projects' },
    { key: 'shifts', label: 'Roster Shift Periods' }
  ];

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
        <HeaderBar />
        <div className="conf-header-left">
          <h1 className="conf-title">Configuration</h1>
        </div>
        <div className="conf-tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              className={`conf-tab ${activeCategory === tab.key ? 'active' : ''}`}
              onClick={() => { setActiveCategory(tab.key); navigate(`/configuration?tab=${tab.key}`); }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="conf-content-card conf-animate-fade-in">
          {renderActiveComponent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Configuration;
