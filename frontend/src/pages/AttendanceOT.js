import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';


const mockData = [
  { id: 1, name: 'Kasun Silva', date: '2025-07-06', hours: 2, status: 'Pending', comments: 'Worked remotely on server fix' },
  { id: 2, name: 'Nadeesha Perera', date: '2025-07-05', hours: 1.5, status: 'Approved', comments: 'Urgent bug fix' },
  { id: 3, name: 'Saman Wickramasinghe', date: '2025-07-06', hours: 3, status: 'Pending', comments: 'Network maintenance' }
];

const AttendanceOT = () => {
  const [records, setRecords] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    // Filter mock data according to search & date
    let filtered = [...mockData];
    if (filterDate) {
      filtered = filtered.filter(r => r.date === filterDate);
    }
    if (searchName) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    setRecords(filtered);
  }, [filterDate, searchName]);

  const handleApprove = (id) => {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, status: 'Approved' } : r)));
    // TODO: Backend API call for approve
  };

  const handleReject = (id) => {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, status: 'Rejected' } : r)));
    // TODO: Backend API call for reject
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { color: '#f39c12', fontWeight: '600' };
      case 'Approved': return { color: '#2ecc71', fontWeight: '600' };
      case 'Rejected': return { color: '#e74c3c', fontWeight: '600' };
      default: return {};
    }
  };

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
        Your browser does not support the video tag.
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
        {/* Page Header */}
        <header className="page-header" style={{
          textAlign: 'center',
          marginBottom: '1rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 0.5rem 0',
            textAlign: 'center'
          }}>
            Attendance & Overtime Management
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: '400'
          }}>
            Manage employee attendance and overtime records efficiently
          </p>
        </header>

        {/* Filter Section */}
        <section className="config-section" style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(248, 250, 252, 0.5)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              🔍 Search & Filter
            </h2>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.25rem'
              }}>Filter by Date:</label>
              <input
                type="date"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #cbd5e0',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  minWidth: '200px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
              />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.25rem'
              }}>Search Employee:</label>
              <input
                type="text"
                placeholder="Enter employee name"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #cbd5e0',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  minWidth: '250px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
              />
            </div>
          </div>
        </section>

        {/* Records Table Section */}
        <section className="config-section" style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(248, 250, 252, 0.5)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              📊 Attendance Records
            </h2>
          </div>

          <div style={{
            overflow: 'auto',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{
                    background: '#1e3a8a',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '2px solid #1e3a8a',
                    padding: '12px 14px',
                    textAlign: 'left'
                  }}>Employee Name</th>
                  <th style={{
                    background: '#1e3a8a',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '2px solid #1e3a8a',
                    padding: '12px 14px',
                    textAlign: 'left'
                  }}>Date</th>
                  <th style={{
                    background: '#1e3a8a',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '2px solid #1e3a8a',
                    padding: '12px 14px',
                    textAlign: 'left'
                  }}>OT Hours</th>
                  <th style={{
                    background: '#1e3a8a',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '2px solid #1e3a8a',
                    padding: '12px 14px',
                    textAlign: 'left'
                  }}>Status</th>
                  <th style={{
                    background: '#1e3a8a',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '2px solid #1e3a8a',
                    padding: '12px 14px',
                    textAlign: 'left'
                  }}>Comments</th>
                  <th style={{
                    background: '#1e3a8a',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '2px solid #1e3a8a',
                    padding: '12px 14px',
                    textAlign: 'left'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{
                      textAlign: 'center',
                      padding: '2rem',
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>No records found matching your criteria</td>
                  </tr>
                ) : (
                  records.map(rec => (
                    <tr key={rec.id} style={{
                      transition: 'background-color 0.2s ease',
                      borderBottom: '1px solid #e5e7eb'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid #e5e7eb'
                      }}>{rec.name}</td>
                      <td style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid #e5e7eb'
                      }}>{rec.date}</td>
                      <td style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid #e5e7eb'
                      }}>{rec.hours}</td>
                      <td style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid #e5e7eb',
                        ...getStatusStyle(rec.status)
                      }}>{rec.status}</td>
                      <td style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid #e5e7eb'
                      }}>{rec.comments}</td>
                      <td style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        {rec.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleApprove(rec.id)}
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#2ecc71',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#27ae60';
                                e.target.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#2ecc71';
                                e.target.style.transform = 'translateY(0)';
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(rec.id)}
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#c0392b';
                                e.target.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#e74c3c';
                                e.target.style.transform = 'translateY(0)';
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default AttendanceOT;
