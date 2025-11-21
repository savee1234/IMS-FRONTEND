import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 
import { Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement 
} from 'chart.js';
import '../App.css';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Reports = () => {
  const [stats, setStats] = useState({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchReportData = async () => {
      try {
        // In a real app, this would be an actual API call
        // const response = await fetch('/api/reports');
        // const data = await response.json();
        
        // Mock data - replace with your actual API call
        const mockData = {
          totalReported: 124,
          totalResolved: 95,
          workHours: 180,
          afterHours: 40,
          completionRatio: '76.6%',
          issuesByType: [
            { type: 'Network', count: 42 },
            { type: 'Billing', count: 28 },
            { type: 'Application', count: 35 },
            { type: 'Service', count: 19 }
          ],
          resolutionTrend: [
            { month: 'Jan', resolved: 15, reported: 20 },
            { month: 'Feb', resolved: 18, reported: 22 },
            { month: 'Mar', resolved: 22, reported: 25 },
            { month: 'Apr', resolved: 25, reported: 28 },
            { month: 'May', resolved: 30, reported: 32 },
            { month: 'Jun', resolved: 35, reported: 38 }
          ],
          teamPerformance: [
            { team: 'Network', resolved: 42, target: 38 },
            { team: 'Billing', resolved: 28, target: 30 },
            { team: 'Support', resolved: 35, target: 32 },
            { team: 'Development', resolved: 19, target: 20 }
          ]
        };

        setStats({
          loading: false,
          error: null,
          data: mockData
        });
      } catch (error) {
        setStats({
          loading: false,
          error: 'Failed to load report data',
          data: null
        });
      }
    };

    fetchReportData();
  }, []);

  if (stats.loading) {
    return (
      <div>
        <Navbar />
        <div className="reports-container">
          <h1>📊 DP Division - Reports & Dashboard</h1>
          <div className="loading-message">Loading dashboard data...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (stats.error || !stats.data) {
    return (
      <div>
        <Navbar />
        <div className="reports-container">
          <h1>📊 DP Division - Reports & Dashboard</h1>
          <div className="error-message">{stats.error || 'No data available'}</div>
        </div>
        <Footer />
      </div>
    );
  }

  const { 
    totalReported, 
    totalResolved, 
    workHours, 
    afterHours, 
    completionRatio,
    issuesByType,
    resolutionTrend,
    teamPerformance
  } = stats.data;

  // Chart data configurations
  const issuesByTypeChart = {
    labels: issuesByType.map(item => item.type),
    datasets: [
      {
        label: 'Number of Issues',
        data: issuesByType.map(item => item.count),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444'
        ],
        borderColor: [
          '#2563eb',
          '#059669',
          '#d97706',
          '#dc2626'
        ],
        borderWidth: 1,
      },
    ],
  };

  const resolutionTrendChart = {
    labels: resolutionTrend.map(item => item.month),
    datasets: [
      {
        label: 'Issues Reported',
        data: resolutionTrend.map(item => item.reported),
        borderColor: '#ef4444',
        backgroundColor: '#fee2e2',
        tension: 0.1,
        fill: true
      },
      {
        label: 'Issues Resolved',
        data: resolutionTrend.map(item => item.resolved),
        borderColor: '#10b981',
        backgroundColor: '#d1fae5',
        tension: 0.1,
        fill: true
      },
    ],
  };

  const teamPerformanceChart = {
    labels: teamPerformance.map(item => item.team),
    datasets: [
      {
        label: 'Resolved',
        data: teamPerformance.map(item => item.resolved),
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Target',
        data: teamPerformance.map(item => item.target),
        backgroundColor: '#94a3b8',
      },
    ],
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Video */}
      
      
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
      <div className="reports-container" style={{ position: 'relative', zIndex: 1 }}>
        <h1>📊 DP Division - Reports & Dashboard</h1>
        
        <div className="summary-cards">
          <div className="card">
            <h3>Total Issues Reported</h3>
            <p>{totalReported}</p>
          </div>
          <div className="card">
            <h3>Issues Resolved</h3>
            <p>{totalResolved}</p>
          </div>
          <div className="card">
            <h3>Working Hours (Roster)</h3>
            <p>{workHours} hrs</p>
          </div>
          <div className="card">
            <h3>After Office Hours</h3>
            <p>{afterHours} hrs</p>
          </div>
          <div className="card">
            <h3>Completion Ratio</h3>
            <p>{completionRatio}</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h2>Issues by Type</h2>
            <div className="chart-wrapper">
              <Pie 
                data={issuesByTypeChart} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="chart-container">
            <h2>Resolution Trend (Last 6 Months)</h2>
            <div className="chart-wrapper">
              <Line 
                data={resolutionTrendChart} 
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-container">
            <h2>Team Performance vs Targets</h2>
            <div className="chart-wrapper">
              <Bar
                data={teamPerformanceChart}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      stacked: false,
                    },
                    y: {
                      stacked: false,
                      beginAtZero: true
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="chart-container">
            <h2>Completion Ratio</h2>
            <div className="completion-gauge">
              <div 
                className="gauge-fill" 
                style={{ width: completionRatio }}
              >
                <span>{completionRatio}</span>
              </div>
            </div>
            <div className="chart-legend">
              <span>Completion percentage of reported issues</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;