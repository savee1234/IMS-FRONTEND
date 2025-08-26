import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import backgroundVideo from '../../assets/Background.mp4';

// Import sub-components
import OnboardMedium from './OnboardMedium';
import Organizations from './Organizations';
import ContactInfo from './ContactInfo';
import SolutionsProjects from './SolutionsProjects';
import Shifts from './Shifts';
import EscalationRules from './EscalationRules';
import OperationAvailability from './OperationAvailability';

const Configuration = () => {
  const [activeCategory, setActiveCategory] = useState('onboardMedium');

  const categories = {
    onboardMedium: 'Onboard Medium',
    organizations: 'Organizations',
    contactInfo: 'Customer Contact Info',
    solutionsPerProject: 'Solutions & Projects',
    shifts: 'Roster Shift Periods',
    escalationRules: 'Escalation Rules',
    newFeature: 'Operation Availability',
  };

  const categoryIcons = {
    onboardMedium: '📱',
    organizations: '🏢',
    contactInfo: '👥',
    solutionsPerProject: '🔧',
    shifts: '⏰',
    escalationRules: '🚨',
    newFeature: '⚙️',
  };

  const renderActiveComponent = () => {
    switch (activeCategory) {
      case 'onboardMedium':
        return <OnboardMedium />;
      case 'organizations':
        return <Organizations />;
      case 'contactInfo':
        return <ContactInfo />;
      case 'solutionsPerProject':
        return <SolutionsProjects />;
      case 'shifts':
        return <Shifts />;
      case 'escalationRules':
        return <EscalationRules />;
      case 'newFeature':
        return <OperationAvailability />;
      default:
        return <OnboardMedium />;
    }
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        marginTop: '4rem'
      }}>
        <header className="page-header" style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          <h1><span className="icon">⚙️</span> Configuration Module</h1>
          <p className="subtitle" style={{ color: 'black', fontWeight: '400', marginTop: '0.5rem' }}>Manage system settings and lookup values</p>
        </header>

        <div className="config-tabs" style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '0.5rem',
          padding: '1rem 0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(16, 5, 80, 0.28)',
          backdropFilter: 'blur(5px)',
          borderRadius: '12px',
          margin: '1rem 0 2rem 0',
          width: '100%'
        }}>
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '0.6rem 0.8rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: '1',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                background: activeCategory === key 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                  : 'rgba(255, 255, 255, 0.8)',
                color: activeCategory === key ? 'white' : '#374151',
                boxShadow: activeCategory === key 
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transform: activeCategory === key ? 'translateY(-2px)' : 'translateY(0)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <span style={{ 
                fontSize: '1rem',
                filter: activeCategory === key ? 'brightness(1.2)' : 'none'
              }}>
                {categoryIcons[key]}
              </span>
              {categories[key]}
            </button>
          ))}
        </div>

        <div className="config-content">
          {renderActiveComponent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configuration;
