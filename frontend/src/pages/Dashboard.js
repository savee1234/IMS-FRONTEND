import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import './Dashboard.css';

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
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main-content">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          <div className="dashboard-cards-grid">
            <div className="dashboard-card">
              <h2 className="dashboard-card-title">Monthly Count</h2>
              <div className="dashboard-card-divider dashboard-card-divider-blue"></div>
              <input 
                type="month" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="dashboard-month-input"
              />
              <div className="dashboard-date-range">{getDateRange()}</div>
              <div className="dashboard-count-number">{loading ? '...' : getMonthlyCount()}</div>
            </div>

            <div className="dashboard-card">
              <h2 className="dashboard-card-title">Counts With Status</h2>
              <div className="dashboard-card-divider dashboard-card-divider-teal"></div>
              <div className="dashboard-status-container">
                <span className="dashboard-status-label">OPEN</span>
                <div 
                  className="dashboard-status-badge"
                  style={{
                    background: statusInfo.bgColor,
                    borderColor: statusInfo.borderColor,
                  }}
                >
                  <div className="dashboard-status-number">{loading ? '...' : getMonthlyCount()}</div>
                  <div 
                    className="dashboard-status-text"
                    style={{ color: statusInfo.textColor }}
                  >
                    {statusInfo.text}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Top 5 Pending Complaints</h2>
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Request Reference</th>
                    <th>Assigned To</th>
                    <th className="text-center">Total Pending Duration</th>
                    <th className="text-center">Assign Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>25-10-23-0001</td>
                    <td>015777 - Romaine Murcott</td>
                    <td className="text-center">22 H 35 M</td>
                    <td className="text-center">22 H 35 M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Complaint Counts Pending With Employees</h2>
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th className="text-center">Pending Count</th>
                    <th className="text-center">Resolved Count</th>
                    <th className="text-center">Rejected Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>015777 - Romaine Murcott</td>
                    <td className="text-center">1</td>
                    <td className="text-center">0</td>
                    <td className="text-center">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
