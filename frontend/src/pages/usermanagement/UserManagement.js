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
  const [expandedSections, setExpandedSections] = useState({});

  const sections = [
    { key: 'complaintManagement', title: 'Complaint Management', component: ComplaintManagement },
    { key: 'userManagement', title: 'User Management', component: UserManagementSection },
    { key: 'reporting', title: 'Reporting', component: Reporting },
    { key: 'dataAnalysis', title: 'Data Analysis', component: DataAnalysis },
    { key: 'accessLogs', title: 'Access Logs', component: AccessLogs },
    { key: 'auditTrails', title: 'Audit Trails', component: AuditTrails },
  ];

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
        maxWidth: '1000px',
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
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e3a8a',
            margin: '0',
            textAlign: 'center'
          }}>
            User Management Module
          </h1>
          
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

        {/* Collapsible Sections */}
        <div className="collapsible-sections" style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '1.5rem'
        }}>
          {sections.map((section, index) => (
            <div key={section.key} style={{ 
              borderBottom: index < sections.length - 1 ? '1px solid #e5e7eb' : 'none',
              marginBottom: index < sections.length - 1 ? '8px' : '0'
            }}>
              {/* Section Button */}
              <button
                onClick={() => toggleSection(section.key)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: '#3b82f6',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                }}
              >
                {section.title}
              </button>
              
              {/* Collapsible Content */}
              {expandedSections[section.key] && (
                <div style={{
                  padding: '1.5rem',
                  background: '#f8fafc',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <section.component />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserManagement;




