import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 7));
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/complaints`);
      const result = await response.json();
      if (result.success) {
        setComplaints(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter complaints by selected month
  const getFilteredComplaints = () => {
    if (!selectedDate || !complaints.length) return [];
    
    const [year, month] = selectedDate.split('-');
    
    return complaints.filter(complaint => {
      if (!complaint.createdAt) return false;
      const complaintDate = new Date(complaint.createdAt);
      return complaintDate.getFullYear() === parseInt(year) && 
             complaintDate.getMonth() + 1 === parseInt(month);
    });
  };

  const getMonthlyCount = () => {
    return getFilteredComplaints().length;
  };

  // Get status based on count
  const getStatusInfo = () => {
    const count = getMonthlyCount();
    
    if (count === 0) {
      return {
        text: 'LOW',
        bgColor: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
        borderColor: '#10b981',
        textColor: '#065f46',
        icon: '✅',
        cardColor: 'linear-gradient(135deg, #10b981, #059669)'
      };
    } else if (count <= 5) {
      return {
        text: 'MEDIUM',
        bgColor: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderColor: '#0ea5e9',
        textColor: '#075985',
        icon: '⚠️',
        cardColor: 'linear-gradient(135deg, #0ea5e9, #0284c7)'
      };
    } else {
      return {
        text: 'HIGH',
        bgColor: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        borderColor: '#ef4444',
        textColor: '#991b1b',
        icon: '🚨',
        cardColor: 'linear-gradient(135deg, #ef4444, #dc2626)'
      };
    }
  };

  const statusInfo = getStatusInfo();

  // Calculate date range for the selected month
  const getDateRange = () => {
    if (!selectedDate) return 'N/A - N/A';
    
    const [year, month] = selectedDate.split('-');
    
    const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
    const lastDay = new Date(parseInt(year), parseInt(month), 0);
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
    
    return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  };

  // Mock data for tables
  const topComplaints = [
    { id: 1, reference: '25-10-23-0001', assignedTo: '015777 - Romaine Murcott', totalHours: 22, totalMinutes: 35, assignHours: 22, assignMinutes: 35 }
  ];

  const employeeStats = [
    { id: 1, employee: '015777 - Romaine Murcott', pending: 1, resolved: 0, rejected: 0 },
    { id: 2, employee: '01599 - Sandun Amarasinghe', pending: 0, resolved: 0, rejected: 0 },
    { id: 3, employee: '011111 - Amalya Dayaratne', pending: 0, resolved: 0, rejected: 0 },
    { id: 4, employee: '014888 - Dinithi Weerasekara', pending: 0, resolved: 0, rejected: 0 },
    { id: 5, employee: '022222 - Dinusha Lakpriya', pending: 0, resolved: 0, rejected: 0 },
    { id: 6, employee: '066666 - Jaya Mohan', pending: 0, resolved: 0, rejected: 0 }
  ];

  return (
    <div className="page-container" style={{ 
      position: 'relative', 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Enhanced Video Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        overflow: 'hidden'
      }}>
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.4) saturate(1.2)'
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(88, 28, 135, 0.8) 100%)',
          zIndex: 1
        }}></div>
      </div>
      
      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 120px)'
      }}>
        {/* Enhanced Dashboard Header */}
        <header className="page-header" style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '3rem 2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)'
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 1rem 0',
              textAlign: 'center',
              letterSpacing: '-0.025em'
            }}>
              Dashboard
            </h1>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '1.25rem',
              margin: 0,
              fontWeight: '400',
              letterSpacing: '0.5px'
            }}>
              Incident Management System
            </p>
          </div>
        </header>

        {/* Stats Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Monthly Count Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2.5rem',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #10b981, #059669)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.5rem',
                boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{ fontSize: '2rem', color: 'white' }}>📊</span>
              </div>
              <div>
                <h2 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.75rem', 
                  fontWeight: '700',
                  color: 'white'
                }}>
                  Monthly Count
                </h2>
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem'
                }}>
                  Complaints for selected period
                </p>
              </div>
            </div>
            
            <input
              type="month"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2rem',
              textAlign: 'center',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              📅 {getDateRange()}
            </div>
            
            <div style={{
              fontSize: '5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              lineHeight: '1',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              {loading ? (
                <div style={{ 
                  display: 'inline-block',
                  width: '80px',
                  height: '80px',
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  borderTop: '4px solid #10b981',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              ) : (
                getMonthlyCount()
              )}
            </div>
          </div>

          {/* Status Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2.5rem',
            backdropFilter: 'blur(20px)',
            border: `1px solid rgba(255, 255, 255, 0.2)`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: statusInfo.cardColor
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: statusInfo.bgColor,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.5rem',
                border: `2px solid ${statusInfo.borderColor}`,
                boxShadow: `0 10px 20px ${statusInfo.borderColor}40`
              }}>
                <span style={{ fontSize: '2rem' }}>{statusInfo.icon}</span>
              </div>
              <div>
                <h2 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.75rem', 
                  fontWeight: '700',
                  color: 'white'
                }}>
                  Status Overview
                </h2>
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem'
                }}>
                  Current complaint priority level
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem'
            }}>
              <div style={{
                background: statusInfo.bgColor,
                padding: '2.5rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                border: `2px solid ${statusInfo.borderColor}`,
                width: '100%',
                maxWidth: '300px',
                boxShadow: `0 15px 30px ${statusInfo.borderColor}30`,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '4rem',
                  fontWeight: '800',
                  color: statusInfo.textColor,
                  lineHeight: '1',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  {loading ? (
                    <div style={{ 
                      display: 'inline-block',
                      width: '60px',
                      height: '60px',
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderTop: `3px solid ${statusInfo.borderColor}`,
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  ) : (
                    getMonthlyCount()
                  )}
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: statusInfo.textColor,
                  padding: '0.75rem 2rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px',
                  border: `1px solid ${statusInfo.borderColor}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  {statusInfo.text} PRIORITY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sections Container */}
        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {/* Top 5 Pending Complaints Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2.5rem',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #f59e0b, #d97706)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.5rem',
                boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)'
              }}>
                <span style={{ fontSize: '2rem', color: 'white' }}>⏳</span>
              </div>
              <div>
                <h2 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.75rem', 
                  fontWeight: '700',
                  color: 'white'
                }}>
                  Top Pending Complaints
                </h2>
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem'
                }}>
                  Most urgent complaints requiring attention
                </p>
              </div>
            </div>
            
            <div style={{
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'transparent'
              }}>
                <thead>
                  <tr style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {['Request Reference', 'Assigned To', 'Total Pending Duration', 'Assign Duration'].map((header, index) => (
                      <th key={header} style={{
                        padding: '1.5rem 2rem',
                        textAlign: index >= 2 ? 'center' : 'left',
                        fontWeight: '600',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topComplaints.map((complaint, index) => (
                    <tr key={complaint.id} style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease',
                      backdropFilter: 'blur(10px)'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)';
                    }}>
                      <td style={{
                        padding: '1.5rem 2rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {complaint.reference}
                      </td>
                      <td style={{
                        padding: '1.5rem 2rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.9rem',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {complaint.assignedTo}
                      </td>
                      <td style={{
                        padding: '1.5rem 2rem',
                        textAlign: 'center',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                            minWidth: '80px'
                          }}>
                            {complaint.totalHours} H
                          </div>
                          <div style={{
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: 'white',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                            minWidth: '80px'
                          }}>
                            {complaint.totalMinutes} M
                          </div>
                        </div>
                      </td>
                      <td style={{
                        padding: '1.5rem 2rem',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                            minWidth: '80px'
                          }}>
                            {complaint.assignHours} H
                          </div>
                          <div style={{
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: 'white',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                            minWidth: '80px'
                          }}>
                            {complaint.assignMinutes} M
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Statistics Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2.5rem',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.5rem',
                boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
              }}>
                <span style={{ fontSize: '2rem', color: 'white' }}>👥</span>
              </div>
              <div>
                <h2 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.75rem', 
                  fontWeight: '700',
                  color: 'white'
                }}>
                  Employee Statistics
                </h2>
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem'
                }}>
                  Performance metrics by team member
                </p>
              </div>
            </div>
            
            <div style={{
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'transparent'
              }}>
                <thead>
                  <tr style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {['Employee', 'Pending', 'Resolved', 'Rejected'].map((header, index) => (
                      <th key={header} style={{
                        padding: '1.5rem 2rem',
                        textAlign: index >= 1 ? 'center' : 'left',
                        fontWeight: '600',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employeeStats.map((employee, index) => (
                    <tr key={employee.id} style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease',
                      backdropFilter: 'blur(10px)'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)';
                    }}>
                      <td style={{
                        padding: '1.5rem 2rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {employee.employee}
                      </td>
                      {['pending', 'resolved', 'rejected'].map((type) => (
                        <td key={type} style={{
                          padding: '1.5rem 2rem',
                          textAlign: 'center',
                          borderRight: type !== 'rejected' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: employee[type] > 0 ? 
                              (type === 'pending' ? 'rgba(245, 158, 11, 0.2)' : 
                               type === 'resolved' ? 'rgba(16, 185, 129, 0.2)' : 
                               'rgba(239, 68, 68, 0.2)') : 'rgba(255, 255, 255, 0.1)',
                            color: employee[type] > 0 ? 
                              (type === 'pending' ? '#f59e0b' : 
                               type === 'resolved' ? '#10b981' : 
                               '#ef4444') : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            border: `1px solid ${employee[type] > 0 ? 
                              (type === 'pending' ? 'rgba(245, 158, 11, 0.3)' : 
                               type === 'resolved' ? 'rgba(16, 185, 129, 0.3)' : 
                               'rgba(239, 68, 68, 0.3)') : 'rgba(255, 255, 255, 0.1)'}`,
                            minWidth: '60px',
                            backdropFilter: 'blur(10px)'
                          }}>
                            {employee[type]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        body {
          margin: 0;
          padding: 0;
          background: #0f172a;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;