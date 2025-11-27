import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../complaint/ComplaintForm.css';
import { FaLayerGroup, FaBuilding, FaAddressBook, FaProjectDiagram, FaCalendarAlt } from 'react-icons/fa';

// Import sub-components
import OnboardMedium from './OnboardMedium';
import Organization from './Organization';
import Organizations from './Organizations';
import SolutionsProjects from './SolutionsProjects';
import Shifts from './Shifts';

const Configuration = () => {
  const [activeCategory, setActiveCategory] = useState('onboardMedium');

  const categories = {
    onboardMedium: 'Onboard Medium',
    organization: 'Organization',
    organizations: 'Organizations Contact Persons',
    solutionsPerProject: 'Solutions & Projects',
    shifts: 'Roster Shift Periods',
  };

  const categoryIcons = {
    onboardMedium: <FaLayerGroup />,
    organization: <FaBuilding />,
    organizations: <FaAddressBook />,
    solutionsPerProject: <FaProjectDiagram />,
    shifts: <FaCalendarAlt />,
  };

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

  return (
    <div className="complaint-onboard-wrapper assignments-page">
      <Navbar />
      <div className="content-wrapper">
        <div className="config-layout">
          <aside className="config-sidebar">
            <ul className="config-nav">
              {Object.keys(categories).map((key) => (
                <li key={key} className={`config-nav-item ${activeCategory === key ? 'active' : ''}`}>
                  <button className="config-nav-button" onClick={() => setActiveCategory(key)}>
                    <span className="config-nav-icon">{categoryIcons[key]}</span>
                    <span>{categories[key]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="config-content">
            <div className="config-card">
              {renderActiveComponent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configuration;
