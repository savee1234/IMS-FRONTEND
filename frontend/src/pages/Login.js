import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';
import backgroundVideo from '../assets/Background.mp4';
import logo from '../assets/slt-logo.png';

const Login = () => {
  const [serviceNumber, setServiceNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Make API call to backend login endpoint
      const response = await axios.post('http://localhost:44354/Login/login', {
        username: serviceNumber,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.success) {
        // Store user data in localStorage
        const userData = {
          serviceNumber: response.data.user.username,
          userId: response.data.user.id,
          email: response.data.user.email,
          isActive: response.data.user.isActive
        };
        
        localStorage.setItem('staff', JSON.stringify(userData));
        
        navigate('/');
      } else {
        setError(response.data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay for better readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // darker overlay
          zIndex: 0,
        }}
      ></div>

      {/* Logo in top-left corner */}
      <img
        src={logo}
        alt="SLT Logo"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '120px',
          height: 'auto',
          zIndex: 3, // make sure it's above overlay
        }}
      />

      {/* Login Card */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(14px)', // more blur
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          zIndex: 2,
          color: '#fff',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>
            Incident Management System
          </h1>
          <p style={{ fontSize: '14px', color: '#e0e0e0' }}>Secure access to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div style={{ color: '#ffcccc', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <FaUserShield
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#ccc',
              }}
            />
            <input
              type="text"
              placeholder="Service Number"
              value={serviceNumber}
              onChange={(e) => setServiceNumber(e.target.value)}
              required
              autoFocus
              style={{
                width: '100%',
                padding: '10px 10px 10px 35px',
                borderRadius: '8px',
                border: 'none',
              }}
            />
          </div>

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <FaLock
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#ccc',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 35px',
                borderRadius: '8px',
                border: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {isLoading ? 'Signing in...' : <><FaSignInAlt /> Sign In</>}
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <a href="/forgot-password" style={{ color: '#ddd', textDecoration: 'underline' }}>
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
