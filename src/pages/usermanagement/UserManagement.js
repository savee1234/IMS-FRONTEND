import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import backgroundVideo from '../../assets/Background.mp4';

// Import sub-components
import ComplaintManagement from './ComplaintManagement';
import UserManagementSection from './UserManagementSection';
import Reporting from './Reporting';
import DataAnalysis from './DataAnalysis';
import AccessLogs from './AccessLogs';
import AuditTrails from './AuditTrails';

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('complaintManagement');

  const categories = {
    complaintManagement: 'Complaint Management',
    userManagement: 'User Management',
    reporting: 'Reporting',
    dataAnalysis: 'Data Analysis',
    accessLogs: 'Access Logs',
    auditTrails: 'Audit Trails',
  };

  const categoryIcons = {
    complaintManagement: '📋',
    userManagement: '👥',
    reporting: '📊',
    dataAnalysis: '📈',
    accessLogs: '🔍',
    auditTrails: '📝',
  };

  const renderActiveComponent = () => {
    switch (activeCategory) {
      case 'complaintManagement':
        return <ComplaintManagement />;
      case 'userManagement':
        return <UserManagementSection />;
      case 'reporting':
        return <Reporting />;
      case 'dataAnalysis':
        return <DataAnalysis />;
      case 'accessLogs':
        return <AccessLogs />;
      case 'auditTrails':
        return <AuditTrails />;
      default:
        return <ComplaintManagement />;
    }
  };

  const handleClose = () => {
    navigate('/');
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
          padding: '1rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#000000',
            margin: '0 0 0.4rem 0',
            textAlign: 'center'
          }}>
            User Management Module
          </h1>
          <p style={{ 
            color: '#60a5fa', 
            fontSize: '1rem',
            margin: 0,
            fontWeight: '400'
          }}>
            Manage user privileges and system access
          </p>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#000000',
              padding: '0',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f0f0';
              e.target.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#000000';
            }}
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>
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

export default UserManagement;

