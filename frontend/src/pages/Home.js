import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import complaintImg from '../assets/complaint.jpg';
import rosterImg from '../assets/RosterManagement.jpg';
import configImg from '../assets/Configuration.jpg';
import pendingImg from '../assets/PendingAssignments.jpg';
import reportsImg from '../assets/Reports.jpg';
import tasksImg from '../assets/MyTasks.jpg';
import notificationImg from '../assets/Notification.jpg';
import userManagementImg from '../assets/UserManagement.jpg';
import attendanceImg from '../assets/AttendanceOT.jpg';
import workflowImg from '../assets/Workflow.jpg';
import backgroundVideo from '../assets/Background.mp4';

const modules = [
  { name: 'Complaint Onboard', img: complaintImg, path: '/complaint' },
  { name: 'Workflow', img: workflowImg, path: '/workflow' },
  { name: 'Roster Management', img: rosterImg, path: '/roster' },
  { name: 'User Management', img: userManagementImg, path: '/users' },
  { name: 'Attendance', img: attendanceImg, path: '/attendance' },
  { name: 'Configuration', img: configImg, path: '/configuration' },
  { name: 'Dashboard', img: notificationImg, path: '/dashboard' },
  { name: 'Reporting', img: reportsImg, path: '/reporting' },
  { name: 'Pending Assignments', img: pendingImg, path: '/pending-assignments' },
  { name: 'View My Tasks', img: tasksImg, path: '/my-tasks' },
  { name: 'Main Assignment', img: pendingImg, path: '/main-assignment' },
  { name: 'Sub Assignment', img: tasksImg, path: '/sub-assignment' },
];

const styles = {
  container: {
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
  contentContainer: {
    flex: 1,
    padding: '2rem 3rem',
    maxWidth: '1600px',
    margin: '0 auto',
    width: '100%',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: 700,
    marginBottom: '2.5rem',
    textAlign: 'center',
    color: '#050608ff',
    position: 'relative',
    display: 'inline-block',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sectionTitleAfter: {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #0a0b0eff)',
    borderRadius: '2px',
  },
  moduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  moduleCard: {
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '20px',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  moduleCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
    background: 'rgba(255, 255, 255, 0.85)',
  },
  moduleCardBefore: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '5px',
  },
  moduleIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '16px',
    objectFit: 'cover',
    marginBottom: '1.5rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    border: '2px solid white',
    transition: 'transform 0.3s ease',
  },
  moduleIconHover: {
    transform: 'scale(1.1)',
  },
  moduleName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    textAlign: 'center',
    margin: 0,
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.container}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        style={styles.videoBackground}
        key={backgroundVideo}
      >
        <source src={backgroundVideo} type="video/mp4" />
        <source src={backgroundVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      

      <div style={styles.gradientOverlay}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <div style={styles.contentContainer}>


          <div style={styles.moduleGrid}>
            {modules.map((mod, index) => (
              <div
                key={index}
                onClick={() => navigate(mod.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  ...styles.moduleCard,
                  ...(hoveredIndex === index ? styles.moduleCardHover : {}),
                }}
              >
                <div style={{ ...styles.moduleCardBefore, background: mod.color }}></div>
                <img
                  src={mod.img}
                  alt={mod.name}
                  style={{
                    ...styles.moduleIcon,
                    ...(hoveredIndex === index ? styles.moduleIconHover : {}),
                  }}
                />
                <h3 style={styles.moduleName}>{mod.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
