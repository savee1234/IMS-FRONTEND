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
    return complaints.filter((complaint) => {
      if (!complaint.createdAt) return false;
      const complaintDate = new Date(complaint.createdAt);
      return (
        complaintDate.getFullYear() === parseInt(year) &&
        complaintDate.getMonth() + 1 === parseInt(month)
      );
    });
  };

  const getMonthlyCount = () => getFilteredComplaints().length;

  // Get status based on count
  const getStatusInfo = () => {
    const count = getMonthlyCount();

    if (count === 0) {
      return {
        text: 'LOW',
        bgColor: '#d4edda',
        borderColor: '#c3e6cb',
        textColor: '#155724',
      };
    } else if (count <= 5) {
      return {
        text: 'MEDIUM',
        bgColor: '#cff4fc',
        borderColor: '#b6effb',
        textColor: '#055160',
      };
    } else {
      return {
        text: 'HIGH',
        bgColor: '#f8d7da',
        borderColor: '#f5c6cb',
        textColor: '#721c24',
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
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Video */}
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
      </video>

      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
          zIndex: -1,
        }}
      ></div>

      <Navbar />

      <div
        className="content-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '1rem',
          marginTop: '1rem',
          maxWidth: '1400px',
          margin: '1rem auto 0 auto',
        }}
      >
        {/* Dashboard Header */}
        <header
          className="page-header"
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            padding: '1rem 1.5rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 0.25rem 0',
              textAlign: 'center',
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              margin: 0,
              fontWeight: '400',
            }}
          >
            Incident Management System
          </p>
        </header>

        {/* Monthly Count and Counts With Status Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Monthly Count Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #d1d5db',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                margin: '0 0 1rem 0',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Monthly Count
            </h2>

            <input
              type="month"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.875rem',
              }}
            />

            <div
              style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              {getDateRange()}
            </div>

            <div
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                marginTop: 'auto',
              }}
            >
              {loading ? '...' : getMonthlyCount()}
            </div>
          </div>

          {/* Counts With Status Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #d1d5db',
            }}
          >
            <h2
              style={{
                margin: '0 0 1rem 0',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#000000',
              }}
            >
              Counts With Status
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#000000',
                }}
              >
                OPEN
              </span>

              <div
                style={{
                  background: statusInfo.bgColor,
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  border: `1px solid ${statusInfo.borderColor}`,
                  width: 'fit-content',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#000000',
                    lineHeight: '1',
                  }}
                >
                  {loading ? '...' : getMonthlyCount()}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: statusInfo.textColor,
                  }}
                >
                  {statusInfo.text}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 5 Pending Complaints Section */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              textAlign: 'center',
            }}
          >
            Top 5 Pending Complaints
          </h2>

          {/* Static Example Table */}
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #d1d5db',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#1a237e',
                  borderBottom: '2px solid #1a237e',
                }}
              >
                <th style={thStyle}>Request Reference</th>
                <th style={thStyle}>Assigned To</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Total Pending Duration</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Assign Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>25-10-23-0001</td>
                <td style={tdStyle}>015777 - Romaine Murcott</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>22 H 35 M</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>22 H 35 M</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Complaint Counts Pending With Employees Section */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h2
            style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              textAlign: 'center',
            }}
          >
            Complaint Counts Pending With Employees
          </h2>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #d1d5db',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#1a237e',
                  borderBottom: '2px solid #1a237e',
                }}
              >
                <th style={thStyle}>Employee</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Pending Count</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Resolved Count</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Rejected Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>015777 - Romaine Murcott</td>
                <td style={tdCenter}>1</td>
                <td style={tdCenter}>0</td>
                <td style={tdCenter}>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Styles for reuse
const thStyle = {
  padding: '1rem',
  textAlign: 'left',
  fontWeight: '600',
  color: '#ffffff',
  fontSize: '0.875rem',
  borderRight: '1px solid #d1d5db',
};

const tdStyle = {
  padding: '1rem',
  color: '#374151',
  fontSize: '0.875rem',
  borderRight: '1px solid #d1d5db',
};

const tdCenter = {
  ...tdStyle,
  textAlign: 'center',
};

export default Dashboard;
