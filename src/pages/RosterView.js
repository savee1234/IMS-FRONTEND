import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundVideo from '../assets/Background.mp4';

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
  ]);

  // Filter rosters by month
  const filteredRosters = month
    ? rosters.filter((r) => r.month === month)
    : rosters;

  return (
    <div className="video-background-wrapper">
      {/* Background Video */}
      <video autoPlay loop muted className="video-background">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>

      {/* Overlay Content */}
      <div className="content-overlay d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1 py-5">
          <div className="container-fluid roster-view-container">
            
            {/* Page Header Section */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="header-card bg-white rounded-4 shadow-lg p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => navigate('/roster')}
                        className="btn btn-outline-primary btn-lg me-4 rounded-pill shadow-sm d-flex align-items-center"
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                      </button>
                      <div>
                        <h1 className="text-primary mb-2 fw-bold">
                          <i className="bi bi-eye me-3"></i>
                          Roster View
                        </h1>
                        <p className="text-muted mb-0 fs-6">View and manage existing rosters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="row mb-4">
              <div className="col-lg-4 col-md-6">
                <div className="filter-card bg-white rounded-4 shadow-sm p-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-funnel text-primary fs-4 me-2"></i>
                    <h5 className="mb-0 fw-semibold">Filter by Month</h5>
                  </div>
                  <input
                    type="month"
                    className="form-control form-control-lg shadow-sm border-2"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Select month to filter..."
                  />
                </div>
              </div>
            </div>

            {/* Roster Table Section */}
            <div className="row">
              <div className="col-12">
                <div className="roster-table-card bg-white rounded-4 shadow-lg p-4 mb-4">
                  <div className="d-flex align-items-center mb-4">
                    <i className="bi bi-list-ul text-success fs-4 me-2"></i>
                    <h4 className="mb-0 fw-semibold text-dark">Available Rosters</h4>
                    <span className="badge bg-primary ms-3 px-3 py-2">
                      {filteredRosters.length} {filteredRosters.length === 1 ? 'Roster' : 'Rosters'}
                    </span>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered text-center align-middle mb-0">
                      <thead className="table-primary">
                        <tr>
                          <th className="py-3">
                            <i className="bi bi-card-text me-1"></i>
                            Roster Name
                          </th>
                          <th className="py-3">
                            <i className="bi bi-calendar-month me-1"></i>
                            Month
                          </th>
                          <th className="py-3">
                            <i className="bi bi-person-badge me-1"></i>
                            Created By ID
                          </th>
                          <th className="py-3">
                            <i className="bi bi-person me-1"></i>
                            Created By Name
                          </th>
                          <th className="py-3">
                            <i className="bi bi-clock me-1"></i>
                            Created Date
                          </th>
                          <th className="py-3">
                            <i className="bi bi-gear me-1"></i>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRosters.length > 0 ? (
                          filteredRosters.map((roster) => (
                            <tr key={roster.id} className="roster-row">
                              <td className="fw-semibold text-primary">{roster.rosterName}</td>
                              <td>
                                <span className="badge bg-info px-3 py-2">
                                  {new Date(roster.month + '-01').toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long' 
                                  })}
                                </span>
                              </td>
                              <td className="fw-bold text-secondary">{roster.createdBy}</td>
                              <td className="text-dark">{roster.createdByName}</td>
                              <td className="text-muted">
                                {new Date(roster.createdDTM).toLocaleDateString('en-GB')} <br/>
                                <small>{new Date(roster.createdDTM).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}</small>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  <button className="btn btn-primary btn-sm px-3 py-2 rounded-pill shadow-sm d-flex align-items-center">
                                    <i className="bi bi-eye me-1"></i>
                                    View
                                  </button>
                                  <button className="btn btn-warning btn-sm px-3 py-2 rounded-pill shadow-sm d-flex align-items-center text-white">
                                    <i className="bi bi-pencil me-1"></i>
                                    Update
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="py-5">
                              <div className="text-center text-muted">
                                <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
                                <h5>No rosters found</h5>
                                <p className="mb-0">
                                  {month 
                                    ? `No rosters available for the selected month.` 
                                    : `No rosters have been created yet.`
                                  }
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Section */}
            {filteredRosters.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="pagination-card bg-white rounded-4 shadow-sm p-4">
                    <nav className="d-flex justify-content-center">
                      <ul className="pagination pagination-lg mb-0">
                        <li className="page-item">
                          <button className="page-link rounded-pill me-2 shadow-sm">
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <li
                            key={num}
                            className={`page-item ${num === 1 ? "active" : ""}`}
                          >
                            <button className={`page-link mx-1 rounded-pill shadow-sm ${num === 1 ? 'bg-primary border-primary' : ''}`}>
                              {num}
                            </button>
                          </li>
                        ))}
                        <li className="page-item">
                          <button className="page-link rounded-pill ms-2 shadow-sm">
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Enhanced Styling */}
      <style jsx>{`
        .video-background-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -2;
        }
        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(245,245,245,0.4) 100%);
          z-index: -1;
        }
        .content-overlay {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .roster-view-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Card Styling */
        .header-card, .filter-card, .roster-table-card, .pagination-card {
          border: none;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95) !important;
          transition: all 0.3s ease;
        }
        .header-card:hover, .filter-card:hover, .roster-table-card:hover, .pagination-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        
        /* Table Styling */
        .roster-row {
          transition: all 0.2s ease;
        }
        .roster-row:hover {
          background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%);
          transform: scale(1.01);
        }
        .table-primary {
          --bs-table-bg: linear-gradient(135deg, #cfe2ff 0%, #b3d9ff 100%);
          --bs-table-hover-bg: #bfd1ec;
          color: #000;
          border-color: #bacbe6;
          font-weight: 600;
        }
        .table-primary th {
          border-bottom: 3px solid #0d6efd;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        /* Form Controls */
        .form-control {
          border: 2px solid #dee2e6;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
          background: rgba(255, 255, 255, 1);
          transform: scale(1.02);
        }
        .form-control-lg {
          padding: 12px 16px;
          font-size: 1.1rem;
        }
        
        /* Button Styling */
        .btn {
          transition: all 0.3s ease;
          border: none;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
        }
        .btn-lg {
          padding: 12px 30px;
          font-size: 1.1rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border: none;
        }
        .btn-warning {
          background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
          border: none;
        }
        .btn-outline-primary {
          border: 2px solid #007bff;
          color: #007bff;
          background: transparent;
        }
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border-color: #007bff;
          color: white;
        }
        
        /* Badge Styling */
        .badge {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 20px;
        }
        .bg-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%) !important;
        }
        .bg-info {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
        }
        
        /* Pagination Styling */
        .pagination-lg .page-link {
          padding: 12px 16px;
          font-size: 1.1rem;
          font-weight: 600;
          border: 2px solid #dee2e6;
          color: #007bff;
          transition: all 0.3s ease;
        }
        .pagination-lg .page-link:hover {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border-color: #007bff;
          color: white;
          transform: translateY(-2px);
        }
        .pagination-lg .page-item.active .page-link {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border-color: #007bff;
        }
        
        /* Icon Styling */
        .bi {
          font-size: inherit;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .roster-view-container {
            padding: 0 10px;
          }
          .header-card .d-flex {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .btn-lg {
            width: 100%;
            margin-bottom: 10px;
          }
          .table-responsive {
            font-size: 0.9rem;
          }
        }
        
        /* Animation for table loading */
        .roster-table-card {
          animation: fadeInUp 0.6s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RosterView;
