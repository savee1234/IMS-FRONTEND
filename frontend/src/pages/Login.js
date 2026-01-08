import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaShieldAlt, FaChartLine, FaUserShield } from 'react-icons/fa';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';
import logo from '../assets/slt-logo.png';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
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
        username: username,
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
        
        if (rememberDevice) {
          localStorage.setItem('rememberDevice', 'true');
        }
        
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
    <div className="login-page">
      <div className="login-container">
        {/* Left Panel - Dark Blue */}
        <div className="login-left-panel">
          <div className="login-left-content">
            <div className="login-logo-section">
              <img src={logo} alt="SLTMOBITEL Logo" className="login-logo" />
            </div>
            
            <h1 className="login-left-title">Incident Management System</h1>
            
            <p className="login-left-description">
              Monitor, triage, and resolve incidents with a secure, centralized workspace.
            </p>
            
            <div className="login-features">
              <div className="login-feature-tag">
                <FaShieldAlt className="login-feature-icon" />
                <span>Enterprise security</span>
              </div>
              <div className="login-feature-tag">
                <FaChartLine className="login-feature-icon" />
                <span>Real-time insights</span>
              </div>
              <div className="login-feature-tag">
                <FaUserShield className="login-feature-icon" />
                <span>Role-based access</span>
              </div>
            </div>
            
            <div className="login-copyright">
              © 2026 SLT Incident Management System
            </div>
          </div>
        </div>

        {/* Right Panel - White */}
        <div className="login-right-panel">
          <div className="login-right-content">
            <div className="login-production-badge">Production</div>
            
            <h2 className="login-header">Sign in to continue</h2>
            
            <h3 className="login-welcome">Welcome back</h3>
            
            <p className="login-instructions">
              Use your SLTMOBITEL credentials to access the Incident Management console.
            </p>
            
            <p className="login-security-note">
              For security reasons, make sure you are accessing this page from a trusted device and network.
            </p>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-field-group">
                <div className="login-field-header">
                  <label htmlFor="username" className="login-field-label">Username</label>
                  <span className="login-field-hint">Example: admin</span>
                </div>
                <div className="login-input-wrapper">
                  <FaUser className="login-input-icon" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    placeholder="admin"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="login-field-group">
                <div className="login-field-header">
                  <label htmlFor="password" className="login-field-label">Password</label>
                  <span className="login-field-hint">Minimum 8 characters</span>
                </div>
                <div className="login-input-wrapper">
                  <FaLock className="login-input-icon" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="Enter your password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="login-sso-section">
                <span className="login-sso-text">Single sign-on is enabled for internal users.</span>
                <button type="button" className="login-sso-button">Use SSO</button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="login-submit-button"
              >
                <span>Sign in</span>
                <FaArrowRight className="login-submit-icon" />
              </button>

              <div className="login-options">
                <label className="login-toggle-wrapper">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="login-toggle"
                  />
                  <span className="login-toggle-label">Remember this device</span>
                </label>
                <a href="/forgot-password" className="login-forgot-link">Forgot password?</a>
              </div>
            </form>

            <div className="login-help">
              Need help? Contact the NOC or IT Service Desk.
            </div>

            <div className="login-footer-links">
              <a href="/status" className="login-footer-link">Status page</a>
              <a href="/privacy" className="login-footer-link">Privacy</a>
              <a href="/terms" className="login-footer-link">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
