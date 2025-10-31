import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const Dashboard = () => {
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
        {/* Content area - header and content all together without white bg */}
        <div style={{
          minHeight: '600px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 0.5rem 0'
          }}>
            Dashboard
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: '0 0 3rem 0',
            fontWeight: '400'
          }}>
            Overview and analytics
          </p>
          
          {/* Content will be added here */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
