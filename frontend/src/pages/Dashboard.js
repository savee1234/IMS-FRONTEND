import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './complaint/ComplaintForm.css';

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
    <div className="complaint-onboard-wrapper assignments-page dashboard-page">
      <Navbar />

      <div className="content-wrapper">
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>Dashboard</h1>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1rem', boxShadow: '0 6px 18px rgba(2,6,23,0.10)', border: '1px solid rgba(148,163,184,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Monthly Count</h2>
              <div style={{ width: '48px', height: '3px', background: '#2563eb', borderRadius: '999px', margin: '6px 0 12px 0' }}></div>
              <input type="month" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', border: '1px solid rgba(148,163,184,0.35)', borderRadius: '6px', fontSize: '0.9rem' }} />
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>{getDateRange()}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{loading ? '...' : getMonthlyCount()}</div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1rem', boxShadow: '0 6px 18px rgba(2,6,23,0.10)', border: '1px solid rgba(148,163,184,0.25)' }}>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Counts With Status</h2>
              <div style={{ width: '48px', height: '3px', background: '#06b6d4', borderRadius: '999px', margin: '6px 0 12px 0' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>OPEN</span>
                <div style={{ background: statusInfo.bgColor, padding: '0.75rem 1rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', border: `1px solid ${statusInfo.borderColor}`, width: 'fit-content', boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', lineHeight: '1' }}>{loading ? '...' : getMonthlyCount()}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: statusInfo.textColor }}>{statusInfo.text}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.35rem', fontWeight: 'bold', color: '#0f172a', textAlign: 'center' }}>Top 5 Pending Complaints</h2>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Assigned To</th>
                  <th style={{ textAlign: 'center' }}>Total Pending Duration</th>
                  <th style={{ textAlign: 'center' }}>Assign Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25-10-23-0001</td>
                  <td>015777 - Romaine Murcott</td>
                  <td style={{ textAlign: 'center' }}>22 H 35 M</td>
                  <td style={{ textAlign: 'center' }}>22 H 35 M</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.35rem', fontWeight: 'bold', color: '#0f172a', textAlign: 'center' }}>Complaint Counts Pending With Employees</h2>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th style={{ textAlign: 'center' }}>Pending Count</th>
                  <th style={{ textAlign: 'center' }}>Resolved Count</th>
                  <th style={{ textAlign: 'center' }}>Rejected Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>015777 - Romaine Murcott</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td style={{ textAlign: 'center' }}>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
