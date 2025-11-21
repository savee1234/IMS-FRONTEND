import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img11 from '../assets/11.jpg';
import img10 from '../assets/10.jpg';

const HomeModern = () => {
  const navigate = useNavigate();

  // State for email subscription
  const [email, setEmail] = useState('');

  // State for hero button hover
  const [heroButtonHover, setHeroButtonHover] = useState(false);
  const [moduleHoverIndex, setModuleHoverIndex] = useState(null);
  
  // State for CTA button hover
  const [ctaButtonHover, setCtaButtonHover] = useState(false);

  const slides = [
    {
      title: 'We Solve Incidents Fast',
      subtitle: 'Modern UI, analytics, and workflows in one platform.',
      imageUrl: img12
    },
    {
      title: 'Blue & Bold Experience',
      subtitle: 'A colorful, engaging hero that matches your brand.',
      imageUrl: img13
    },
    {
      title: 'Technology That Empowers',
      subtitle: 'Coordinate teams, track tasks, and report with ease.',
      imageUrl: img11
    },
    {
      title: 'Act Fast, Resolve Faster',
      subtitle: 'Real-time insights to reduce response times.',
      imageUrl: img10
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! We'll contact you at ${email}`);
    setEmail('');
  };

  // Modules data
  const modules = [
    { 
      name: 'Complaint Onboard', 
      path: '/complaint', 
      color: '#3B82F6',
      description: 'Efficiently capture and manage customer complaints with our streamlined workflow system.'
    },
    { 
      name: 'Workflow', 
      path: '/workflow', 
      color: '#8B5CF6',
      description: 'Automate and optimize your business processes with customizable workflow solutions.'
    },
    { 
      name: 'Roster Management', 
      path: '/roster', 
      color: '#10B981',
      description: 'Manage employee schedules and assignments with our intuitive roster management system.'
    },
    { 
      name: 'User Management', 
      path: '/users', 
      color: '#F59E0B',
      description: 'Control access and permissions with our comprehensive user management system.'
    },
    { 
      name: 'Attendance', 
      path: '/attendance', 
      color: '#EF4444',
      description: 'Track employee attendance and overtime with our advanced monitoring system.'
    },
    { 
      name: 'Configuration', 
      path: '/configuration', 
      color: '#6366F1',
      description: 'Customize system settings and parameters to match your organizational needs.'
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      color: '#EC4899',
      description: 'Get real-time insights and analytics through our comprehensive dashboard.'
    },
    { 
      name: 'Reporting', 
      path: '/reporting', 
      color: '#06B6D4',
      description: 'Generate detailed reports and gain valuable insights from your data.'
    },
    { 
      name: 'View My Tasks', 
      path: '/my-tasks', 
      color: '#8B5CF6',
      description: 'Monitor and manage your assigned tasks with our task tracking system.'
    },
    { 
      name: 'Main Assignment', 
      path: '/main-assignment', 
      color: '#F97316',
      description: 'Handle primary assignments and responsibilities through our assignment system.'
    },
    { 
      name: 'Sub Assignment', 
      path: '/sub-assignment', 
      color: '#14B8A6',
      description: 'Manage sub-tasks and delegated responsibilities efficiently.'
    },
    { 
      name: 'All Assignments', 
      path: '/all-assignments', 
      color: '#F43F5E',
      description: 'Overview all assignments and track progress across your organization.'
    },
  ];

  // Function to get SVG icons for each module
  const getModuleIcon = (moduleName, color) => {
    const iconStyle = {
      width: '30px',
      height: '30px',
      color: color,
    };

    switch (moduleName) {
      case 'Complaint Onboard':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Workflow':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Roster Management':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'User Management':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Attendance':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Configuration':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2142 5.99038 16.224 5.38285C17.7405 4.46744 19.5329 6.25977 18.6175 7.77634C18.0099 8.78612 18.5484 10.0495 19.683 10.3249C21.4394 10.7513 21.4394 13.2493 19.683 13.6756C18.5484 13.951 18.01 15.2144 18.6175 16.2242C19.5329 17.7407 17.7405 19.5331 16.224 18.6177C15.2142 18.0101 13.9508 18.5486 13.6754 19.6832C13.249 21.4396 10.751 21.4396 10.3246 19.6832C10.0492 18.5486 8.7858 18.0101 7.77602 18.6177C6.25945 19.5331 4.46708 17.7407 5.38251 16.2242C5.99004 15.2144 5.45159 13.951 4.31697 13.6756C2.56056 13.2492 2.56056 10.7512 4.31697 10.3249C5.45159 10.0495 5.98999 8.78612 5.38251 7.77634C4.46708 6.25977 6.25945 4.46744 7.77602 5.38285C8.7858 5.99038 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Dashboard':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H10V18H4V6ZM14 6H20V12H14V6ZM14 16H20V18H14V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Reporting':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17V11M15 17V7M3 21H21M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'View My Tasks':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Main Assignment':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V12L16 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Sub Assignment':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 21V15M4 9V3M20 21V15M20 9V3M4 15H12M4 9H12M12 15V9M20 15H12M20 9H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'All Assignments':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12H15M9 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      

      {/* Hero Section */}
      <section style={{
        ...styles.heroSection,
        backgroundImage: `url('${slides[currentSlide].imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{slides[currentSlide].title}</h1>
          <p style={styles.heroSubtitle}>{slides[currentSlide].subtitle}</p>
          <button
            style={{
              ...styles.heroButton,
              ...(heroButtonHover ? styles.heroButtonHover : {})
            }}
            onClick={() => navigate('/complaint')}
            onMouseEnter={() => setHeroButtonHover(true)}
            onMouseLeave={() => setHeroButtonHover(false)}
          >
            Get Started
          </button>
          <button
            style={styles.heroButtonSecondary}
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </button>
          <div style={styles.sliderControls}>
            <button aria-label="Previous" style={styles.sliderNavButton} onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}>
              ‹
            </button>
            <div style={styles.sliderDots}>
              {slides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    ...styles.sliderDot,
                    ...(currentSlide === i ? styles.sliderDotActive : {})
                  }}
                />
              ))}
            </div>
            <button aria-label="Next" style={styles.sliderNavButton} onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}>
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Available Modules Section */}
      <section style={styles.modulesSection}>
        <div style={styles.modulesContent}>
          <h2 style={styles.sectionTitle}>Available Modules</h2>
          <p style={styles.modulesSubtitle}>
            Explore our comprehensive suite of tools designed to streamline your incident management workflow
          </p>
          <div style={styles.modulesGrid}>
            {modules.map((module, index) => (
              <div 
                key={index}
                onClick={() => navigate(module.path)}
                onMouseEnter={() => setModuleHoverIndex(index)}
                onMouseLeave={() => setModuleHoverIndex(null)}
                style={{
                  ...styles.moduleCard,
                  background: `linear-gradient(180deg, ${module.color}18, #ffffff 70%)`,
                  border: `1px solid ${module.color}66`,
                  outline: 'none',
                  boxShadow: '0 8px 24px rgba(2,6,23,0.12)',
                  ...(moduleHoverIndex === index
                    ? { transform: 'translateY(-6px)', boxShadow: `0 24px 48px ${module.color}40`, borderColor: `${module.color}` }
                    : {})
                }}
              >
                <div style={{ ...styles.moduleIconContainer, background: `linear-gradient(135deg, ${module.color}1F, ${module.color}0D)` }}>
                  {getModuleIcon(module.name, module.color)}
                </div>
                <h3 style={{ ...styles.moduleName, color: module.color }}>
                  {module.name}
                </h3>
                <p style={styles.moduleDescription}>
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <div style={styles.aboutImage}>
            <img src={img13} alt="Team Collaboration" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
          <div style={styles.aboutText}>
            <h2 style={styles.sectionTitle}>About Our System</h2>
            <p style={styles.aboutDescription}>
              The SLT Incident Management System is a comprehensive platform designed to streamline 
              incident reporting and resolution processes. With over 10 years of continuous improvement, 
              we've helped organizations reduce incident response time by 65% and improve customer 
              satisfaction scores significantly.
            </p>
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <div style={styles.statIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={styles.statNumber}>500+</h3>
                  <p style={styles.statLabel}>Organizations Trust Us</p>
                </div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={styles.statNumber}>10 Years</h3>
                  <p style={styles.statLabel}>Of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesContent}>
          <div style={styles.valuesHeader}>
            <h2 style={styles.sectionTitle}>Our Core Principles</h2>
            <p style={styles.valuesSubtitle}>
              Fundamental values that guide our approach to incident management and customer satisfaction
            </p>
          </div>
          <div style={styles.valuesGrid}>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={styles.valueTitle}>Our Vision</h3>
              <p style={styles.valueDescription}>
                To be the leading incident management platform, empowering organizations to resolve issues 
                efficiently and enhance customer satisfaction through innovative technology solutions.
              </p>
            </div>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={styles.valueTitle}>Our Mission</h3>
              <p style={styles.valueDescription}>
                To deliver exceptional incident management solutions through advanced technology, 
                streamlined processes, and unwavering commitment to our clients' operational excellence.
              </p>
            </div>
          </div>
          <div style={styles.countersContainer}>
            <div style={styles.counterItem}>
              <h3 style={styles.counterNumber}>2,847</h3>
              <p style={styles.counterLabel}>Incidents Resolved</p>
            </div>
            <div style={styles.counterItem}>
              <h3 style={styles.counterNumber}>92%</h3>
              <p style={styles.counterLabel}>First-Time Resolution</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Call to Action Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaOverlay}></div>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Need Assistance with Incident Management?</h2>
          <p style={styles.ctaSubtitle}>Contact Our Support Team for a System Demo</p>
          <button 
            style={{
              ...styles.ctaButton,
              ...(ctaButtonHover ? styles.ctaButtonHover : {})
            }}
            onClick={() => navigate('/contact')}
            onMouseEnter={() => setCtaButtonHover(true)}
            onMouseLeave={() => setCtaButtonHover(false)}
          >
            Contact Support
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  
  // Top Contact Strip
  topStrip: {
    backgroundColor: '#0E3A7C',
    padding: '8px 0',
    color: 'white',
  },
  stripContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    flexWrap: 'wrap'
  },
  contactInfo: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  contactIcon: {
    width: '16px',
    height: '16px',
    color: 'white'
  },
  socialIcons: {
    display: 'flex',
    gap: '15px'
  },
  socialIcon: {
    color: 'white',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  
  // Hero Section
  heroSection: {
    position: 'relative',
    height: '60vh',
    marginTop: '-68px',
    paddingTop: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingLeft: '5%',
    color: 'white',
    overflow: 'hidden'
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'none',
    zIndex: 1
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 20px',
    alignSelf: 'center'
  },
  heroTitle: {
    fontSize: '2.6rem',
    fontWeight: 800,
    marginBottom: '12px',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textShadow: '0 8px 32px rgba(0,0,0,0.45)',
    fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', sans-serif",
    color: '#ffffff',
    whiteSpace: 'normal'
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    margin: '0 auto 24px',
    lineHeight: 1.7,
    maxWidth: '720px',
    color: '#e5e7eb',
    fontFamily: "'Inter', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif"
  },
  heroButton: {
    backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
    color: '#ffffff',
    border: 'none',
    padding: '14px 36px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 24px rgba(59, 130, 246, 0.35)',
    fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', sans-serif"
  },
  heroButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 16px 32px rgba(59, 130, 246, 0.45)'
  },
  heroButtonSecondary: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '2px solid rgba(255,255,255,0.8)',
    padding: '14px 26px',
    fontSize: '1.05rem',
    fontWeight: 600,
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '12px'
  },
  sliderControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '24px'
  },
  sliderDots: {
    display: 'flex',
    gap: '10px'
  },
  sliderDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  sliderDotActive: {
    backgroundColor: '#ffffff',
    transform: 'scale(1.2)'
  },
  sliderNavButton: {
    background: 'rgba(255,255,255,0.15)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '999px',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },

  // Modules Section
  modulesSection: {
    padding: '80px 20px',
    backgroundColor: '#ffffff'
  },
  modulesContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  modulesSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '700px',
    margin: '0 auto 50px',
    lineHeight: 1.6
  },
  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px'
  },
  moduleCard: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '30px 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 8px 24px rgba(2,6,23,0.12)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    transform: 'translateY(0)',
    fontFamily: "'Inter', 'Poppins', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  moduleCardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 24px 48px rgba(59,130,246,0.25)'
  },
  moduleIconContainer: {
    width: '72px',
    height: '72px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 0 0 1px rgba(148,163,184,0.25), 0 8px 24px rgba(59,130,246,0.15)'
  },
  moduleName: {
    fontSize: '1.25rem',
    fontWeight: 700,
    textAlign: 'center',
    margin: '0 0 12px 0',
    transition: 'color 0.3s ease',
    color: '#0f172a',
    fontFamily: "'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  moduleDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 1.6,
    margin: 0,
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  
  // About Section
  aboutSection: {
    padding: '80px 20px',
    backgroundImage: `linear-gradient(180deg, rgba(219,234,254,0.85) 0%, rgba(191,219,254,0.85) 50%, rgba(203,213,225,0.85) 100%), url(${img11})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  aboutContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'center'
  },
  aboutImage: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  imagePlaceholder: {
    height: '400px',
    backgroundColor: '#f0f4f8',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0E3A7C',
    fontSize: '1.2rem',
    fontWeight: 500
  },
  aboutText: {
    padding: '20px 0'
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#1e3a8a',
    marginBottom: '20px',
    position: 'relative',
    display: 'inline-block',
    fontFamily: "'Poppins', 'Inter', 'Segoe UI', 'Roboto', sans-serif"
  },
  sectionTitleLight: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: 'white',
    marginBottom: '20px',
    position: 'relative',
    display: 'inline-block',
    fontFamily: "'Poppins', 'Inter', 'Segoe UI', 'Roboto', sans-serif"
  },
  aboutDescription: {
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#334155',
    marginBottom: '30px',
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  statItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  },
  statIcon: {
    width: '40px',
    height: '40px',
    color: '#0E3A7C',
    flexShrink: 0
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#0E3A7C',
    margin: 0
  },
  statLabel: {
    fontSize: '1rem',
    color: '#666',
    margin: '5px 0 0 0'
  },
  
  // Values Section
  valuesSection: {
    padding: '80px 20px',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    color: '#0f172a',
    position: 'relative',
    overflow: 'hidden'
  },
  valuesContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  },
  valuesHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  valuesSubtitle: {
    fontSize: '1.1rem',
    maxWidth: '700px',
    margin: '0 auto',
    color: '#334155',
    lineHeight: 1.7,
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  valueCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px 30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    boxShadow: '0 8px 24px rgba(2,6,23,0.12)'
  },
  valueIcon: {
    width: '60px',
    height: '60px',
    color: '#F8991D',
    margin: '0 auto 20px'
  },
  valueTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '15px',
    color: '#0f172a',
    fontFamily: "'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  valueDescription: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#64748b',
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  countersContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    flexWrap: 'wrap'
  },
  counterItem: {
    textAlign: 'center'
  },
  counterNumber: {
    fontSize: '3rem',
    fontWeight: 800,
    margin: '0 0 10px 0',
    color: '#2563eb'
  },
  counterLabel: {
    fontSize: '1.1rem',
    color: '#64748b',
    margin: 0,
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  
  // Team Section
  teamSection: {
    padding: '80px 20px',
    backgroundColor: '#f8fafc'
  },
  teamContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  teamSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '700px',
    margin: '0 auto 50px',
    lineHeight: 1.6,
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  teamMember: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px 20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', 'Poppins', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  memberImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0E3A7C',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  memberName: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#0E3A7C',
    margin: '0 0 10px 0',
    fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif"
  },
  memberRole: {
    fontSize: '1rem',
    color: '#666',
    margin: 0,
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  
  // CTA Section
  ctaSection: {
    position: 'relative',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img12})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: 'white'
  },
  ctaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(14, 58, 124, 0.5) 0%, rgba(14, 58, 124, 0.4) 100%)',
    zIndex: 1
  },
  ctaContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 20px'
  },
  ctaTitle: {
    fontSize: '2.8rem',
    fontWeight: 800,
    marginBottom: '15px',
    lineHeight: 1.2,
    fontFamily: "'Poppins', 'Inter', 'Segoe UI', 'Roboto', sans-serif"
  },
  ctaSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    color: '#e2e8f0',
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  ctaButton: {
    backgroundColor: '#F8991D',
    color: '#0E3A7C',
    border: 'none',
    padding: '18px 50px',
    fontSize: '1.2rem',
    fontWeight: 700,
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', sans-serif",
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
  },
  ctaButtonHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
  }

};

export default HomeModern;