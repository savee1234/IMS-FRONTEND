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

// Add imports for the new images
import newBgImg from '../assets/newbg.jpg';
import newOneImg from '../assets/newone.jpg';
import imageImg from '../assets/image.jpg';

const slides = [
  {
    id: 1,
    type: 'image',
    content: newBgImg,
    title: 'Incident Management System',
    subtitle: 'Streamline your incident reporting and management processes with our comprehensive platform. Efficiently handle complaints, manage workflows, and track resolutions in real-time.',
  },
  {
    id: 2,
    type: 'image',
    content: newOneImg,
    title: 'Secure Login Portal',
    subtitle: 'Access your personalized dashboard with our secure authentication system. Role-based access ensures data privacy and security.',
  },
  {
    id: 3,
    type: 'image',
    content: imageImg,
    title: 'Complaint Management',
    subtitle: 'Efficiently capture, track, and resolve customer complaints with our streamlined workflow system.',
  }
];

const modules = [
  { 
    name: 'Complaint Onboard', 
    img: complaintImg, 
    path: '/complaint', 
    color: '#3B82F6',
    description: 'Efficiently capture and manage customer complaints with our streamlined workflow system.'
  },
  { 
    name: 'Workflow', 
    img: workflowImg, 
    path: '/workflow', 
    color: '#8B5CF6',
    description: 'Automate and optimize your business processes with customizable workflow solutions.'
  },
  { 
    name: 'Roster Management', 
    img: rosterImg, 
    path: '/roster', 
    color: '#10B981',
    description: 'Manage employee schedules and assignments with our intuitive roster management system.'
  },
  { 
    name: 'User Management', 
    img: userManagementImg, 
    path: '/users', 
    color: '#F59E0B',
    description: 'Control access and permissions with our comprehensive user management system.'
  },
  { 
    name: 'Attendance', 
    img: attendanceImg, 
    path: '/attendance', 
    color: '#EF4444',
    description: 'Track employee attendance and overtime with our advanced monitoring system.'
  },
  { 
    name: 'Configuration', 
    img: configImg, 
    path: '/configuration', 
    color: '#6366F1',
    description: 'Customize system settings and parameters to match your organizational needs.'
  },
  { 
    name: 'Dashboard', 
    img: notificationImg, 
    path: '/dashboard', 
    color: '#EC4899',
    description: 'Get real-time insights and analytics through our comprehensive dashboard.'
  },
  { 
    name: 'Reporting', 
    img: reportsImg, 
    path: '/reporting', 
    color: '#06B6D4',
    description: 'Generate detailed reports and gain valuable insights from your data.'
  },
  { 
    name: 'View My Tasks', 
    img: tasksImg, 
    path: '/my-tasks', 
    color: '#8B5CF6',
    description: 'Monitor and manage your assigned tasks with our task tracking system.'
  },
  { 
    name: 'Main Assignment', 
    img: tasksImg, 
    path: '/main-assignment', 
    color: '#F97316',
    description: 'Handle primary assignments and responsibilities through our assignment system.'
  },
  { 
    name: 'Sub Assignment', 
    img: tasksImg, 
    path: '/sub-assignment', 
    color: '#14B8A6',
    description: 'Manage sub-tasks and delegated responsibilities efficiently.'
  },
  { 
    name: 'All Assignments', 
    img: reportsImg, 
    path: '/all-assignments', 
    color: '#F43F5E',
    description: 'Overview all assignments and track progress across your organization.'
  },
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
    background: 'linear-gradient(135deg, rgba(0, 43, 91, 0.4) 0%, rgba(0, 43, 91, 0.3) 100%)',
    zIndex: -1,
  },
  heroContent: {
    maxWidth: '800px',
    padding: '2rem',
    color: 'white',
    zIndex: 1,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: '1rem',
    lineHeight: 1.2,
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
    fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
  },
  heroSubtitle: {
    fontSize: '1.8rem',
    fontWeight: 400,
    marginBottom: '2rem',
    lineHeight: 1.6,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    fontFamily: "'Open Sans', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
  },
  ctaButton: {
    backgroundColor: '#ffcc00',
    color: '#002b5b',
    border: 'none',
    padding: '1.2rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
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
    padding: '3rem 2rem',
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: 800,
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#0f172a',
    position: 'relative',
    fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
    background: 'linear-gradient(90deg, #1e40af, #3b82f6, #000000)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sectionTitleAfter: {
    content: '""',
    position: 'absolute',
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
    borderRadius: '2px',
  },
  moduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  moduleCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.8rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    position: 'relative',
    overflow: 'hidden',
    transform: 'translateY(0)',
  },
  moduleCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
  },
  moduleCardBefore: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
  },
  moduleIconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    transition: 'all 0.3s ease',
  },
  moduleIconContainerHover: {
    transform: 'scale(1.1)',
  },
  moduleName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#0f172a',
    textAlign: 'center',
    margin: '0 0 0.3rem 0',
    transition: 'color 0.3s ease',
    fontFamily: "'Inter', 'Poppins', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  moduleDescription: {
    fontSize: '0.85rem',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 1.5,
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
    margin: 0,
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

// Function to get modern SVG icons for each module
const getModuleIcon = (moduleName, color) => {
  const iconStyle = {
    width: '30px',
    height: '30px',
    color: color,
  };

  switch (moduleName) {
    case 'Complaint Onboard':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <path d=\"M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
        </svg>`;
    case 'Workflow':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <path d=\"M4 6H20M4 12H20M4 18H11\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
        </svg>`;
    case 'Roster Management':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <path d=\"M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
        </svg>`;
    case 'User Management':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <path d=\"M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z\" stroke=\"currentColor\" stroke-width=\"2\"/>
          <path d=\"M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z\" stroke=\"currentColor\" stroke-width=\"2\"/>
        </svg>`;
    case 'Attendance':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <circle cx=\"12\" cy=\"12\" r=\"9\" stroke=\"currentColor\" stroke-width=\"2\"/>
          <path d=\"M12 6V12L16 14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
        </svg>`;
    case 'Configuration':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <path d=\"M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2142 5.99038 16.224 5.38285C17.7405 4.46744 19.5329 6.25977 18.6175 7.77634C18.0099 8.78612 18.5484 10.0495 19.683 10.3249C21.4394 10.7513 21.4394 13.2493 19.683 13.6756C18.5484 13.951 18.01 15.2144 18.6175 16.2242C19.5329 17.7407 17.7405 19.5331 16.224 18.6177C15.2142 18.0101 13.9508 18.5486 13.6754 19.6832C13.249 21.4396 10.751 21.4396 10.3246 19.6832C10.0492 18.5486 8.7858 18.0101 7.77602 18.6177C6.25945 19.5331 4.46708 17.7407 5.38251 16.2242C5.99004 15.2144 5.45159 13.951 4.31697 13.6756C2.56056 13.2492 2.56056 10.7512 4.31697 10.3249C5.45159 10.0495 5.98999 8.78612 5.38251 7.77634C4.46708 6.25977 6.25945 4.46744 7.77602 5.38285C8.7858 5.99038 10.0492 5.45193 10.3246 4.31731Z\" stroke=\"currentColor\" stroke-width=\"2\"/>
          <circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/>
        </svg>`;
    case 'Dashboard':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
          <path d=\"M4 6H10V18H4V6ZM14 6H20V12H14V6ZM14 16H20V18H14V16Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
        </svg>`;
    case 'Reporting':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <path d=\"M9 17V11M15 17V7M3 21H21M3 3H21V21H3V3Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
          </svg>`;
    case 'View My Tasks':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <path d=\"M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
          </svg>`;
    case 'Main Assignment':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <path d=\"M12 6V12L16 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
          </svg>`;
    case 'Sub Assignment':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <path d=\"M4 21V15M4 9V3M20 21V15M20 9V3M4 15H12M4 9H12M12 15V9M20 15H12M20 9H12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
          </svg>`;
    case 'All Assignments':
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <path d=\"M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
            <path d=\"M9 12H15M9 16H13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
          </svg>`;
    default:
      return `<svg style=\"width:30px;height:30px;color:${color};\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <path d=\"M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
          </svg>`;
  }
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
              <div 
                style={{
                  ...styles.moduleIconContainer,
                  background: `linear-gradient(135deg, ${mod.color}20, ${mod.color}10)`,
                  ...(hoveredIndex === index ? styles.moduleIconContainerHover : {}),
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: getModuleIcon(mod.name, mod.color) }} />
              </div>
              <h3 
                style={{
                  ...styles.moduleName,
                  ...(hoveredIndex === index ? { color: mod.color } : {}),
                }}
              >
                {mod.name}
              </h3>
              <p style={styles.moduleDescription}>
                {mod.description}
              </p>
            </div>
          ))}
        </div>
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
      
      <Footer />
    </div>
  );
};

export default HomeWithSlider;