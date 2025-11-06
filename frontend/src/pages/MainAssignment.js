import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const MainAssignment = () => {
  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    videoBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -2,
    },
    gradientOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(5px)',
      zIndex: -1,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  };

  return (
    <div style={styles.page}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        style={styles.videoBackground}
      >
        <source src={backgroundVideo} type="video/mp4" />
        <source src={backgroundVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      <div style={styles.gradientOverlay}></div>

      <div style={styles.contentWrapper}>
        <Navbar />
        <Footer />
      </div>
    </div>
  );
};

export default MainAssignment;
