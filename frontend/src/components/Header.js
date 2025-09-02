import React from 'react';

const Header = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo/Brand Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
        }}>
          🏢
        </div>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            IMS
          </h1>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '400'
          }}>
            Incident Management System
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <a href="/" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'transparent';
        }}>
          Home
        </a>
        <a href="/configuration" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'transparent';
        }}>
          Configuration
        </a>
        <a href="/workflow" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'transparent';
        }}>
          Workflow
        </a>
        <a href="/reports" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'transparent';
        }}>
          Reports
        </a>
      </nav>

      {/* User Profile Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: 'white'
          }}>
            👤
          </div>
          <span style={{
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
