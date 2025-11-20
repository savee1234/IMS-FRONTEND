import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../complaint/ComplaintForm.css';

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

  const categoryIcons = {};

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
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>Configuration</h1>
              <p>Manage system settings and lookup values</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            {Object.keys(categories).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="btn"
                style={{
                  backgroundImage: activeCategory === key ? 'linear-gradient(90deg, var(--accent-teal), var(--primary-blue))' : 'none',
                  backgroundColor: activeCategory === key ? 'var(--primary-blue)' : 'var(--white)',
                  color: activeCategory === key ? 'var(--white)' : 'var(--text-primary)',
                  border: activeCategory === key ? 'none' : '2px solid var(--light-gray)'
                }}
              >
                {categories[key]}
              </button>
            ))}
          </div>

          

          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--medium-gray)', boxShadow: 'var(--shadow-sm)' }}>
            {renderActiveComponent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Configuration;
