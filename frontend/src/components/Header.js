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
      alignItems: 'center',
      fontFamily: "'Poppins', 'Montserrat', 'Inter', 'Segoe UI', 'Roboto', sans-serif"
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
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontFamily: "'Poppins', 'Montserrat', 'Inter', 'Segoe UI', 'Roboto', sans-serif"
          }}>
            IMS
          </h1>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '400',
            fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
          }}>
            Incident Management System
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <a href="/" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '500',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent',
          background: 'rgba(255, 255, 255, 0.05)',
          fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}>
          Home
        </a>
        <a href="/configuration" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '500',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent',
          background: 'rgba(255, 255, 255, 0.05)',
          fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}>
          Configuration
        </a>
        <a href="/workflow" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '500',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent',
          background: 'rgba(255, 255, 255, 0.05)',
          fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}>
          Workflow
        </a>
        <a href="/reports" style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '500',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          border: '1px solid transparent',
          background: 'rgba(255, 255, 255, 0.05)',
          fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
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
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1.2rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
          fontFamily: "'Inter', 'Poppins', 'Montserrat', 'Segoe UI', 'Roboto', sans-serif"
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
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
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;