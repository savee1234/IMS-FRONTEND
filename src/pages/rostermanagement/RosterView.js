import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import backgroundVideo from '../../assets/Background.mp4';

const RosterView = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [rosters] = useState([
    {
      id: 1,
      rosterName: "January Roster",
      month: "2025-01",
      createdBy: "EMP001",
      createdByName: "John Doe",
      createdDTM: "2025-01-05 14:30",
    },
    {
      id: 2,
      rosterName: "February Roster",
      month: "2025-02",
      createdBy: "EMP002",
      createdByName: "Jane Smith",
      createdDTM: "2025-02-02 09:15",
    },
    {
      id: 3,
      rosterName: "March Roster",
      month: "2025-03",
      createdBy: "EMP003",
      createdByName: "Mike Johnson",
      createdDTM: "2025-03-01 10:20",
    },
    {
      id: 4,
      rosterName: "April Roster",
      month: "2025-04",
      createdBy: "EMP004",
      createdByName: "Sarah Wilson",
      createdDTM: "2025-04-01 08:45",
    },
  ]);

  // Filter rosters by month
  const filteredRosters = month
    ? rosters.filter((r) => r.month === month)
    : rosters;

  const handleView = (roster) => {
    console.log('View roster:', roster);
  };

  const handleUpdate = (roster) => {
    console.log('Update roster:', roster);
  };

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
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
      
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: -1
      }}></div>

      <Navbar />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        marginTop: '4rem'
      }}>
        
        {/* Header with Back Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <button
            onClick={() => navigate('/roster')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back
          </button>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            borderBottom: '2px solid #3b82f6',
            paddingBottom: '0.5rem',
            margin: 0
          }}>
            Roster View
          </h2>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          
          {/* Month Picker */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Select Month
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                width: '300px',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #d1d5db'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    border: '1px solid #d1d5db',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Roster Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    border: '1px solid #d1d5db',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Month
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    border: '1px solid #d1d5db',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Created By
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    border: '1px solid #d1d5db',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Created By Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    border: '1px solid #d1d5db',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Created DTM
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'center',
                    border: '1px solid #d1d5db',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRosters.map((roster) => (
                  <tr key={roster.id}>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      color: '#374151'
                    }}>
                      {roster.rosterName}
                    </td>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      color: '#374151'
                    }}>
                      {new Date(roster.month + '-01').toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </td>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      color: '#374151'
                    }}>
                      {roster.createdBy}
                    </td>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      color: '#374151'
                    }}>
                      {roster.createdByName}
                    </td>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      color: '#374151'
                    }}>
                      {roster.createdDTM}
                    </td>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      textAlign: 'center'
                    }}>
                      <button
                        onClick={() => handleView(roster)}
                        style={{
                          padding: '0.5rem 1rem',
                          marginRight: '0.5rem',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleUpdate(roster)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
            gap: '0.5rem'
          }}>
            <button style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              &lt;
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  backgroundColor: num === 1 ? '#3b82f6' : 'white',
                  color: num === 1 ? 'white' : '#374151',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  minWidth: '40px'
                }}
              >
                {num}
              </button>
            ))}
            <button style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RosterView;
