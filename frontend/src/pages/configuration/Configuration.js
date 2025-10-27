import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import backgroundVideo from '../../assets/Background.mp4';

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
    onboardMedium: '📱',
    organization: '🏛️',
    organizations: '🏢',
    solutionsPerProject: '🔧',
    shifts: '⏰',
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
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          justifyContent: 'center'
        }}>
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '0.75rem 1.25rem',
                border: activeCategory === key ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: activeCategory === key ? '#eff6ff' : 'white',
                color: activeCategory === key ? '#1d4ed8' : '#374151',
                boxShadow: activeCategory === key 
                  ? '0 4px 12px rgba(59, 130, 246, 0.15)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.05)',
                transform: activeCategory === key ? 'translateY(-2px)' : 'translateY(0)',
                minWidth: 'fit-content',
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.borderColor = '#9ca3af';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              <span style={{
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                {categoryIcons[key]}
              </span>
              <span style={{
                fontWeight: '500',
                letterSpacing: '0.025em'
              }}>
                {categories[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Category Indicator */}
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem 1.5rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.375rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            letterSpacing: '0.025em'
          }}>
            <span style={{
              fontSize: '1.5rem',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}>
              {categoryIcons[activeCategory]}
            </span>
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
