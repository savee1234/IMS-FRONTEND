import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundVideo from '../assets/Background.mp4';

const RosterView = () => {
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

      {/* Overlay Content */}
      <div className="content-overlay d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 p-5">
          <div className="container">
            {/* Header with Month Picker */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="text-primary">Roster View</h1>
              <input
                type="month"
                className="form-control w-auto"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>

            {/* Table Card */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle text-center mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Roster Name</th>
                        <th>Month</th>
                        <th>Created By</th>
                        <th>Created By Name</th>
                        <th>Created DTM</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRosters.length > 0 ? (
                        filteredRosters.map((roster) => (
                          <tr key={roster.id}>
                            <td>{roster.rosterName}</td>
                            <td>{roster.month}</td>
                            <td>{roster.createdBy}</td>
                            <td>{roster.createdByName}</td>
                            <td>{roster.createdDTM}</td>
                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-primary">
                                  View
                                </button>
                                <button className="btn btn-sm btn-warning text-white">
                                  Update
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-muted">
                            No rosters found for the selected month.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {filteredRosters.length > 0 && (
              <nav className="mt-4 d-flex justify-content-center">
                <ul className="pagination mb-0">
                  <li className="page-item">
                    <button className="page-link">&laquo;</button>
                  </li>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li
                      key={num}
                      className={`page-item ${num === 1 ? "active" : ""}`}
                    >
                      <button className="page-link">{num}</button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button className="page-link">&raquo;</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </main>
        <Footer />
      </div>

      {/* Video Background CSS */}
      <style jsx>{`
        .video-background-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }
        .video-background {
          position: absolute;
          top: 50%;
          left: 50%;
          width: auto;
          height: 100%;
          min-width: 100%;
          min-height: 100%;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 0;
          opacity: 0.4;
        }
        .content-overlay {
          position: relative;
          z-index: 1;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default RosterView;
