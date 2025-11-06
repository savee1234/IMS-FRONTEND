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
        bgColor: '#e6f3ff',
        borderColor: '#b3d9ff',
        textColor: '#0066cc',
        accentColor: '#0066cc'
      };
    } else if (count <= 5) {
      return {
        text: 'MEDIUM',
        bgColor: '#fff4e6',
        borderColor: '#ffd9b3',
        textColor: '#cc6600',
        accentColor: '#ff8c00'
      };
    } else {
      return {
        text: 'HIGH',
        bgColor: '#ffe6e6',
        borderColor: '#ffb3b3',
        textColor: '#cc0000',
        accentColor: '#ff4444'
      };
    }
  };

  const statusInfo = getStatusInfo();

  // Calculate date range for the selected month
  const getDateRange = () => {
    if (!selectedDate) return 'N/A - N/A';
    
    const [year, month] = selectedDate.split('-');
    
    // First day of the month
    const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
    // Last day of the month
    const lastDay = new Date(parseInt(year), parseInt(month), 0);
    
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  };

  return (
    <div className="page-container" style={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Enhanced Video Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            filter: 'brightness(0.7) contrast(1.1)'
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(2px)'
        }}></div>
      </div>

      <Navbar />
      
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 2,
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Dashboard Header */}
        <header className="page-header" style={{
          textAlign: 'center',
          marginBottom: '2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 0.5rem 0',
            textAlign: 'center'
          }}>
            Dashboard
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: '500'
          }}>
            Incident Management System
          </p>
        </header>

        {/* Stats Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Monthly Count Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '4px',
                height: '24px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '2px'
              }}></div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Monthly Count
              </h2>
            </div>
            
            <input
              type="month"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                background: 'white',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              marginBottom: '1.5rem',
              textAlign: 'center',
              background: '#f8fafc',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              {getDateRange()}
            </div>
            
            <div style={{
              fontSize: '4rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              marginTop: 'auto',
              lineHeight: '1'
            }}>
              {loading ? '...' : getMonthlyCount()}
            </div>
          </div>

          {/* Counts With Status Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '4px',
                height: '24px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '2px'
              }}></div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Counts With Status
              </h2>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                OPEN
              </span>
              
              <div style={{
                background: statusInfo.bgColor,
                padding: '2rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                border: `2px solid ${statusInfo.borderColor}`,
                width: '100%',
                maxWidth: '200px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  color: statusInfo.accentColor,
                  lineHeight: '1'
                }}>
                  {loading ? '...' : getMonthlyCount()}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: statusInfo.textColor,
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}>
                  {statusInfo.text}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {/* Top 5 Pending Complaints Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '4px',
                height: '24px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '2px'
              }}></div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Top 5 Pending Complaints
              </h2>
            </div>
            
            <div style={{
              overflow: 'hidden',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'white'
              }}>
                <thead>
                  <tr style={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
                  }}>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Request Reference
                    </th>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Assigned To
                    </th>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Total Pending Duration
                    </th>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem'
                    }}>
                      Assign Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{
                    borderBottom: '1px solid #f3f4f6',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <td style={{
                      padding: '1.25rem',
                      color: '#374151',
                      fontSize: '0.9rem',
                      borderRight: '1px solid #f3f4f6',
                      fontWeight: '500'
                    }}>
                      25-10-23-0001
                    </td>
                    <td style={{
                      padding: '1.25rem',
                      color: '#374151',
                      fontSize: '0.9rem',
                      borderRight: '1px solid #f3f4f6'
                    }}>
                      015777 - Romaine Murcott
                    </td>
                    <td style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      borderRight: '1px solid #f3f4f6'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          background: '#10b981',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                        }}>
                          22 H
                        </div>
                        <div style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                        }}>
                          35 M
                        </div>
                      </div>
                    </td>
                    <td style={{
                      padding: '1.25rem',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          background: '#10b981',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                        }}>
                          22 H
                        </div>
                        <div style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                        }}>
                          35 M
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Complaint Counts Pending With Employees Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '4px',
                height: '24px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '2px'
              }}></div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Complaint Counts Pending With Employees
              </h2>
            </div>
            
            <div style={{
              overflow: 'hidden',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'white'
              }}>
                <thead>
                  <tr style={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
                  }}>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Employee
                    </th>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Pending Count
                    </th>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      Resolved Count
                    </th>
                    <th style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '0.9rem'
                    }}>
                      Rejected Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { employee: '015777 - Romaine Murcott', pending: 1, resolved: 0, rejected: 0 },
                    { employee: '01599 - Sandun Amarasinghe', pending: 0, resolved: 0, rejected: 0 },
                    { employee: '011111 - Amalya Dayaratne', pending: 0, resolved: 0, rejected: 0 },
                    { employee: '014888 - Dinithi Weerasekara', pending: 0, resolved: 0, rejected: 0 },
                    { employee: '022222 - Dinusha Lakpriya', pending: 0, resolved: 0, rejected: 0 },
                    { employee: '066666 - Jaya Mohan', pending: 0, resolved: 0, rejected: 0 }
                  ].map((emp, index) => (
                    <tr key={index} style={{
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{
                        padding: '1.25rem',
                        color: '#374151',
                        fontSize: '0.9rem',
                        borderRight: '1px solid #f3f4f6',
                        fontWeight: '500'
                      }}>
                        {emp.employee}
                      </td>
                      <td style={{
                        padding: '1.25rem',
                        textAlign: 'center',
                        color: '#374151',
                        fontSize: '0.9rem',
                        borderRight: '1px solid #f3f4f6',
                        fontWeight: '600'
                      }}>
                        {emp.pending}
                      </td>
                      <td style={{
                        padding: '1.25rem',
                        textAlign: 'center',
                        color: '#374151',
                        fontSize: '0.9rem',
                        borderRight: '1px solid #f3f4f6',
                        fontWeight: '600'
                      }}>
                        {emp.resolved}
                      </td>
                      <td style={{
                        padding: '1.25rem',
                        textAlign: 'center',
                        color: '#374151',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {emp.rejected}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;