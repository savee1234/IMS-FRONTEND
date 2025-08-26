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
        background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '1rem',
        marginTop: '1rem',
        maxWidth: '1400px',
        margin: '1rem auto 0 auto'
      }}>
        {/* Page Header */}
        <header className="page-header" style={{
          textAlign: 'center',
          marginBottom: '1rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 0.5rem 0',
            textAlign: 'center'
          }}>
            Configuration Module
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: '400'
          }}>
            Manage system settings and lookup values
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="config-tabs" style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '0.5rem',
          marginBottom: '1rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '0.6rem 0.8rem',
                border: activeCategory === key ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: activeCategory === key ? '#eff6ff' : 'white',
                color: activeCategory === key ? '#1d4ed8' : '#374151',
                boxShadow: activeCategory === key 
                  ? '0 4px 12px rgba(59, 130, 246, 0.15)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.05)',
                transform: activeCategory === key ? 'translateY(-2px)' : 'translateY(0)',
                flex: '1',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.borderColor = '#9ca3af';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ 
                fontSize: '1.2rem'
              }}>
                {categoryIcons[key]}
              </span>
              <span>
                {categories[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Category Indicator */}
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span>{categoryIcons[activeCategory]}</span>
            {categories[activeCategory]}
          </h2>
        </div>

        {/* Content Area */}
        <div className="config-content" style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {renderActiveComponent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configuration;
