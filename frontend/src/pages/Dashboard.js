import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import './Dashboard.css';
import HeaderBar from '../components/HeaderBar';
import { Calendar, PieChart, ArrowUpRight, MoreVertical } from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 7));
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  const fetchComplaints = useCallback(async () => {
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
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

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

  const getStatusCounts = () => {
    const monthly = getFilteredComplaints();
    const norm = (v) => (typeof v === 'string' ? v.toLowerCase() : '');
    let open = 0, resolved = 0, rejected = 0;
    monthly.forEach((c) => {
      const s = norm(c?.status);
      if (s === 'resolved') resolved += 1;
      else if (s === 'rejected') rejected += 1;
      else open += 1;
    });
    return { open, resolved, rejected, total: Math.max(1, monthly.length) };
  };

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
  const statusCounts = getStatusCounts();
  const openPct = Math.round((statusCounts.open / statusCounts.total) * 100);
  const resolvedPct = Math.round((statusCounts.resolved / statusCounts.total) * 100);
  const rejectedPct = Math.round((statusCounts.rejected / statusCounts.total) * 100);
  const totalIncidents = complaints.length;
  const openCases = statusCounts.open;
  const resolvedThisMonth = statusCounts.resolved;
  const avgResolutionHours = 18.5;

  const doughnutData = {
    labels: ['Open', 'Resolved', 'Rejected'],
    datasets: [
      {
        data: [statusCounts.open, statusCounts.resolved, statusCounts.rejected],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
        hoverOffset: 4,
        borderColor: '#ffffff'
      }
    ]
  };
  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { display: false }
    }
  };

  const barData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Count',
        data: [8, 12, 4],
        backgroundColor: ['#f97316', '#f59e0b', '#60a5fa'],
        borderRadius: 8
      }
    ]
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 3 } },
      x: { grid: { display: false } }
    },
    plugins: {
      legend: { display: false }
    }
  };

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
        <HeaderBar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
          <div className="dashboard-metrics-grid">
            <div className="metric-card metric-card--neutral">
              <ArrowUpRight size={18} className="metric-icon" />
              <div className="metric-number">{totalIncidents}</div>
              <div className="metric-label">Total Incidents</div>
            </div>
            <div className="metric-card metric-card--blue">
              <ArrowUpRight size={18} className="metric-icon" />
              <div className="metric-number">{openCases}</div>
              <div className="metric-label">Open Cases</div>
            </div>
            <div className="metric-card metric-card--green">
              <ArrowUpRight size={18} className="metric-icon" />
              <div className="metric-number">{resolvedThisMonth}</div>
              <div className="metric-label">Resolved This Month</div>
            </div>
            <div className="metric-card metric-card--purple">
              <ArrowUpRight size={18} className="metric-icon" />
              <div className="metric-number">{avgResolutionHours}<span style={{ fontSize: '1.25rem', marginLeft: 6 }}>Hours</span></div>
              <div className="metric-label">Average Resolution</div>
            </div>
          </div>

          <div className="dashboard-charts-grid">
            <div className="dashboard-chart-card">
              <h3 className="dashboard-chart-title">Status Distribution</h3>
              <div style={{ width: 220, height: 220, margin: '0 auto' }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="chart-legend">
                <span className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }}></span>Open ({openPct}%)</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }}></span>Resolved ({resolvedPct}%)</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }}></span>Rejected ({rejectedPct}%)</span>
              </div>
            </div>
            <div className="dashboard-chart-card">
              <h3 className="dashboard-chart-title">Priority Breakdown</h3>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="dashboard-cards-grid">
            <div className="dashboard-card">
              <h2 className="dashboard-card-title">Monthly Count</h2>
              <div className="dashboard-card-divider dashboard-card-divider-blue"></div>
              <div className="month-input-wrapper">
                <input 
                  type="month" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="dashboard-month-input"
                />
                <Calendar size={18} className="month-input-icon" />
              </div>
              <div className="dashboard-date-range">{getDateRange()}</div>
              <div className="dashboard-count-number">{loading ? '...' : getMonthlyCount()}</div>
            </div>

            <div className="dashboard-card">
              <h2 className="dashboard-card-title">Counts With Status</h2>
              <div className="dashboard-card-divider dashboard-card-divider-teal"></div>
              <PieChart size={20} className="dashboard-card-icon" />
              <div className="dashboard-progress-row">
                <span className="dashboard-progress-label">Open</span>
                <div className="dashboard-progress-track">
                  <div className="dashboard-progress-fill" style={{ width: `${openPct}%` }} />
                </div>
              </div>
              <div className="dashboard-progress-row">
                <span className="dashboard-progress-label">Resolved</span>
                <div className="dashboard-progress-track">
                  <div className="dashboard-progress-fill" style={{ width: `${resolvedPct}%`, opacity: 0.7 }} />
                </div>
              </div>
              <div className="dashboard-progress-row">
                <span className="dashboard-progress-label">Rejected</span>
                <div className="dashboard-progress-track">
                  <div className="dashboard-progress-fill" style={{ width: `${rejectedPct}%`, opacity: 0.5 }} />
                </div>
              </div>
              <div className="dashboard-status-container">
                <span className="dashboard-status-label">OPEN</span>
                <div className="dashboard-status-pill">
                  <span>{loading ? '...' : statusCounts.open}</span>
                  <span className="dashboard-chip pending">
                    {statusInfo.text.charAt(0) + statusInfo.text.slice(1).toLowerCase()}
                  </span>
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
                    <th>Status</th>
                    <th className="text-center">Pending Duration</th>
                    <th className="text-center">Priority</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ref: '25-10-23-0001', emp: '015777 - Romaine Murcott', code: 'Rc', status: 'Pending', total: '22 H 35 M', priority: 'High' },
                    { ref: '25-10-23-0002', emp: '015577 - Ahma Soka', code: 'At', status: 'Pending', total: '21 H 12 M', priority: 'Medium' },
                    { ref: '25-10-23-0003', emp: '015777 - Romaine Murcott', code: 'Rc', status: 'Resolved', total: '03 H 42 M', priority: 'Low' },
                    { ref: '25-10-23-0004', emp: '015888 - John Smith', code: 'Jc', status: 'Pending', total: '18 H 20 M', priority: 'High' },
                    { ref: '25-10-23-0005', emp: '015999 - Sarah Johnson', code: 'Se', status: 'Pending', total: '12 H 45 M', priority: 'Medium' },
                  ].map((row) => (
                    <tr key={row.ref}>
                      <td>{row.ref}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 28, height: 28, borderRadius: 999, background: '#e2e8f0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#111827' }}>{row.code}</span>
                          {row.emp}
                        </span>
                      </td>
                      <td>
                        <span className={`dashboard-chip ${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <Calendar size={16} style={{ color: '#94a3b8' }} />
                          {row.total}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={`priority-chip ${row.priority.toLowerCase()}`}>{row.priority}</span>
                      </td>
                      <td className="text-center">
                        <MoreVertical size={18} style={{ color: '#64748b' }} />
                      </td>
                    </tr>
                  ))}
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
        <div className="dashboard-action-bar">
          <button className="action-btn">Export Report</button>
          <button className="action-btn">Create Incident</button>
          <button className="action-btn">View Analytics</button>
          <button className="action-btn">Filter Data</button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
