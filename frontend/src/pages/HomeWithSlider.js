import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import complaintImg from '../assets/complaint.jpg';
import rosterImg from '../assets/RosterManagement.jpg';
import configImg from '../assets/Configuration.jpg';
import reportsImg from '../assets/Reports.jpg';
import tasksImg from '../assets/MyTasks.jpg';
import notificationImg from '../assets/Notification.jpg';
import userManagementImg from '../assets/UserManagement.jpg';
import attendanceImg from '../assets/AttendanceOT.jpg';
import workflowImg from '../assets/Workflow.jpg';
 
import loginImg from '../assets/Login.jpg';
import contactImg from '../assets/contact.jpg';
import pendingImg from '../assets/PendingAssignments.jpg';

const slides = [
  {
    id: 1,
    type: 'image',
    content: pendingImg,
    title: 'Incident Management System',
    subtitle: 'Streamline your incident reporting and management processes with our comprehensive platform. Efficiently handle complaints, manage workflows, and track resolutions in real-time.',
  },
  {
    id: 2,
    type: 'image',
    content: loginImg,
    title: 'Secure Login Portal',
    subtitle: 'Access your personalized dashboard with our secure authentication system. Role-based access ensures data privacy and security.',
  },
  {
    id: 3,
    type: 'image',
    content: complaintImg,
    title: 'Complaint Management',
    subtitle: 'Efficiently capture, track, and resolve customer complaints with our streamlined workflow system.',
  },
  {
    id: 4,
    type: 'image',
    content: rosterImg,
    title: 'Roster Management',
    subtitle: 'Manage employee schedules and assignments with our intuitive roster management system.',
  },
  {
    id: 5,
    type: 'image',
    content: contactImg,
    title: 'Contact Management',
    subtitle: 'Maintain comprehensive contact information for all stakeholders in your incident management process.',
  }
];

const modules = [
  { name: 'Complaint Onboard', img: complaintImg, path: '/complaint', color: '#3B82F6' },
  { name: 'Workflow', img: workflowImg, path: '/workflow', color: '#8B5CF6' },
  { name: 'Roster Management', img: rosterImg, path: '/roster', color: '#10B981' },
  { name: 'User Management', img: userManagementImg, path: '/users', color: '#F59E0B' },
  { name: 'Attendance', img: attendanceImg, path: '/attendance', color: '#EF4444' },
  { name: 'Configuration', img: configImg, path: '/configuration', color: '#6366F1' },
  { name: 'Dashboard', img: notificationImg, path: '/dashboard', color: '#EC4899' },
  { name: 'Reporting', img: reportsImg, path: '/reporting', color: '#06B6D4' },
  { name: 'View My Tasks', img: tasksImg, path: '/my-tasks', color: '#8B5CF6' },
  { name: 'Main Assignment', img: tasksImg, path: '/main-assignment', color: '#F97316' },
  { name: 'Sub Assignment', img: tasksImg, path: '/sub-assignment', color: '#14B8A6' },
  { name: 'All Assignments', img: reportsImg, path: '/all-assignments', color: '#F43F5E' },
];

const styles = {
  // Hero section styles
  heroContainer: {
    position: 'relative',
    height: '80vh',
    overflow: 'hidden',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2,
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(0, 43, 91, 0.85) 0%, rgba(0, 43, 91, 0.7) 100%)',
    zIndex: -1,
  },
  heroContent: {
    maxWidth: '800px',
    padding: '2rem',
    color: 'white',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
    lineHeight: 1.2,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 300,
    marginBottom: '2rem',
    lineHeight: 1.6,
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  ctaButton: {
    backgroundColor: '#ffcc00',
    color: '#002b5b',
    border: 'none',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  ctaButtonHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
  },
  
  // Slider controls
  sliderControls: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 10,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  dotActive: {
    backgroundColor: '#ffcc00',
    transform: 'scale(1.2)',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transition: 'all 0.3s ease',
  },
  arrowLeft: {
    left: '20px',
  },
  arrowRight: {
    right: '20px',
  },
  arrowHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Modules section styles
  modulesContainer: {
    padding: '4rem 2rem',
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#0f172a',
    position: 'relative',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  sectionTitleAfter: {
    content: '""',
    position: 'absolute',
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #002b5b, #3B82F6)',
    borderRadius: '2px',
  },
  moduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  moduleCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    position: 'relative',
    overflow: 'hidden',
  },
  moduleCardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
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
    border: '3px solid white',
    transition: 'transform 0.3s ease',
  },
  moduleIconHover: {
    transform: 'scale(1.1) rotate(5deg)',
  },
  moduleName: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#1e293b',
    textAlign: 'center',
    margin: 0,
    transition: 'color 0.3s ease',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  moduleNameHover: {
    color: '#002b5b',
  },
  
  // Features section styles
  featuresContainer: {
    padding: '5rem 2rem',
    backgroundColor: 'white',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '16px',
    backgroundColor: '#f1f5f9',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#0f172a',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: 1.6,
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
};

const HomeWithSlider = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ctaHover, setCtaHover] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arrowHover, setArrowHover] = useState({ left: false, right: false });

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section with Slider */}
      <section style={styles.heroContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              ...styles.slide,
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === currentSlide ? 1 : -1,
            }}
          >
            {slide.type === 'video' ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                style={styles.videoBackground}
              >
                <source src={slide.content} type="video/mp4" />
                <source src={slide.content} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={slide.content} 
                alt={slide.title}
                style={styles.imageBackground}
              />
            )}
            <div style={styles.heroOverlay}></div>
            
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>{slide.title}</h1>
              <p style={styles.heroSubtitle}>{slide.subtitle}</p>
              <button 
                style={{
                  ...styles.ctaButton,
                  ...(ctaHover ? styles.ctaButtonHover : {})
                }}
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                onClick={() => navigate('/complaint')}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div style={styles.sliderControls}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentSlide ? styles.dotActive : {}),
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          style={{
            ...styles.arrow,
            ...styles.arrowLeft,
            ...(arrowHover.left ? styles.arrowHover : {}),
          }}
          onClick={prevSlide}
          onMouseEnter={() => setArrowHover({ ...arrowHover, left: true })}
          onMouseLeave={() => setArrowHover({ ...arrowHover, left: false })}
        >
          &#10094;
        </button>
        <button
          style={{
            ...styles.arrow,
            ...styles.arrowRight,
            ...(arrowHover.right ? styles.arrowHover : {}),
          }}
          onClick={nextSlide}
          onMouseEnter={() => setArrowHover({ ...arrowHover, right: true })}
          onMouseLeave={() => setArrowHover({ ...arrowHover, right: false })}
        >
          &#10095;
        </button>
      </section>
      
      {/* Features Section */}
      <section style={styles.featuresContainer}>
        <h2 style={{ ...styles.sectionTitle, marginBottom: '4rem' }}>
          Why Choose Our System
          <div style={styles.sectionTitleAfter}></div>
        </h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Real-time Tracking</h3>
            <p style={styles.featureDescription}>
              Monitor incidents and complaints in real-time with our advanced tracking system.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔄</div>
            <h3 style={styles.featureTitle}>Automated Workflows</h3>
            <p style={styles.featureDescription}>
              Streamline your processes with customizable automated workflows and notifications.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Advanced Analytics</h3>
            <p style={styles.featureDescription}>
              Gain insights with comprehensive reporting and analytics dashboards.
            </p>
          </div>
        </div>
      </section>
      
      {/* Modules Section */}
      <section style={styles.modulesContainer}>
        <h2 style={styles.sectionTitle}>
          Available Modules
          <div style={styles.sectionTitleAfter}></div>
        </h2>
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
              <h3 
                style={{
                  ...styles.moduleName,
                  ...(hoveredIndex === index ? styles.moduleNameHover : {}),
                }}
              >
                {mod.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomeWithSlider;