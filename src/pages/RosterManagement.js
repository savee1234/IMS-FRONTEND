import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundVideo from "../assets/Background.mp4";

const employees = [
  "John Doe",
  "Jane Smith",
  "Mark Taylor",
  "Alice Moore",
  "David Clark",
];

const RosterManagement = () => {
  const [month, setMonth] = useState("");
  const [roster, setRoster] = useState([]);
  const navigate = useNavigate();

  const generateMonthData = (selectedMonth) => {
    const [year, monthNum] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, monthNum, 0).getDate();
    const newRoster = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, monthNum - 1, day);
      const dateStr = dateObj.toISOString().split("T")[0];
      const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });

      const shifts = ["Shift 01", "Shift 02"].map((shift) => ({
        shift,
        employees: Array(5).fill(""),
      }));

      newRoster.push({
        date: dateStr,
        dayName: weekday,
        shifts,
      });
    }
    setRoster(newRoster);
  };

  const handleEmployeeSelect = (dayIndex, shiftIndex, empIndex, value) => {
    const updated = [...roster];
    updated[dayIndex].shifts[shiftIndex].employees[empIndex] = value;
    setRoster(updated);
  };

  const resetRoster = () => {
    setRoster((prev) =>
      prev.map((day) => ({
        ...day,
        shifts: day.shifts.map((shift) => ({
          ...shift,
          employees: Array(5).fill(""),
        })),
      }))
    );
  };

  const submitRoster = () => {
    console.log("Roster Data:", roster);
    alert("✅ Roster submitted! Check console for data.");
  };

  const handleRosterView = () => {
    navigate("/roster-view");
  };

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
          <div className="container-fluid roster-container">
            
            {/* Page Header Section */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="header-card bg-white rounded-4 shadow-lg p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h1 className="text-primary mb-2 fw-bold">
                        <i className="bi bi-calendar3 me-3"></i>
                        Roster Management
                      </h1>
                      <p className="text-muted mb-0 fs-6">Create and manage employee work schedules</p>
                    </div>
                    <button
                      onClick={handleRosterView}
                      className="btn btn-info btn-lg px-4 py-2 rounded-pill shadow-sm d-flex align-items-center"
                    >
                      <i className="bi bi-eye me-2"></i>
                      View Roster
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Month Selection Section */}
            <div className="row mb-4">
              <div className="col-lg-4 col-md-6">
                <div className="month-picker-card bg-white rounded-4 shadow-sm p-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-calendar-month text-primary fs-4 me-2"></i>
                    <h5 className="mb-0 fw-semibold">Select Month</h5>
                  </div>
                  <input
                    type="month"
                    className="form-control form-control-lg shadow-sm border-2"
                    value={month}
                    onChange={(e) => {
                      setMonth(e.target.value);
                      generateMonthData(e.target.value);
                    }}
                    placeholder="Choose month..."
                  />
                </div>
              </div>
            </div>

            {/* Roster Table Section */}
            {roster.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="roster-table-card bg-white rounded-4 shadow-lg p-4 mb-4">
                    <div className="d-flex align-items-center mb-4">
                      <i className="bi bi-table text-success fs-4 me-2"></i>
                      <h4 className="mb-0 fw-semibold text-dark">Monthly Roster Schedule</h4>
                    </div>
                    
                    <div className="table-responsive">
                      <table className="table table-hover table-bordered text-center align-middle mb-0">
                        <thead className="table-primary">
                          <tr>
                            <th className="date-col py-3">
                              <i className="bi bi-calendar-date me-1"></i>
                              Date
                            </th>
                            <th className="day-col py-3">
                              <i className="bi bi-calendar-week me-1"></i>
                              Day
                            </th>
                            <th className="shift-col py-3">
                              <i className="bi bi-clock me-1"></i>
                              Shift
                            </th>
                            <th className="emp-col py-3">Employee 1</th>
                            <th className="emp-col py-3">Employee 2</th>
                            <th className="emp-col py-3">Employee 3</th>
                            <th className="emp-col py-3">Employee 4</th>
                            <th className="emp-col py-3">Employee 5</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roster.map((day, dayIndex) => (
                            <React.Fragment key={day.date}>
                              {day.shifts.map((shift, shiftIndex) => (
                                <tr key={`${day.date}-${shift.shift}`} className="roster-row">
                                  {shiftIndex === 0 && (
                                    <>
                                      <td rowSpan={2} className="date-cell fw-bold text-primary">
                                        {new Date(day.date).toLocaleDateString('en-GB')}
                                      </td>
                                      <td rowSpan={2} className="day-cell fw-semibold text-secondary">
                                        {day.dayName}
                                      </td>
                                    </>
                                  )}
                                  <td className="shift-cell fw-semibold">
                                    <span className={`badge ${shift.shift === 'Shift 01' ? 'bg-info' : 'bg-warning'} px-3 py-2`}>
                                      {shift.shift}
                                    </span>
                                  </td>
                                  {shift.employees.map((emp, empIndex) => (
                                    <td key={empIndex} className="emp-cell p-2">
                                      <select
                                        className="form-select form-select-sm shadow-sm border-2"
                                        value={emp}
                                        onChange={(e) =>
                                          handleEmployeeSelect(
                                            dayIndex,
                                            shiftIndex,
                                            empIndex,
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="">Select Employee</option>
                                        {employees.map((employee, i) => (
                                          <option key={i} value={employee}>
                                            {employee}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons Section */}
            {roster.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="action-buttons-card bg-white rounded-4 shadow-sm p-4">
                    <div className="d-flex justify-content-center gap-4">
                      <button 
                        className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-pill shadow-sm d-flex align-items-center" 
                        onClick={resetRoster}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Reset Roster
                      </button>
                      <button 
                        className="btn btn-success btn-lg px-5 py-3 rounded-pill shadow-sm d-flex align-items-center" 
                        onClick={submitRoster}
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Submit Roster
                      </button>
                    </div>
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
        .roster-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Card Styling */
        .header-card, .month-picker-card, .roster-table-card, .action-buttons-card {
          border: none;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95) !important;
          transition: all 0.3s ease;
        }
        .header-card:hover, .month-picker-card:hover, .roster-table-card:hover, .action-buttons-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        
        /* Table Styling */
        .date-col, .day-col {
          width: 12%;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          font-weight: 600;
        }
        .shift-col {
          width: 10%;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        }
        .emp-col {
          width: 11%;
          background: rgba(248, 249, 250, 0.5);
        }
        .roster-row {
          transition: all 0.2s ease;
        }
        .roster-row:hover {
          background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%);
          transform: scale(1.01);
        }
        .date-cell, .day-cell, .shift-cell, .emp-cell {
          padding: 15px 10px;
          vertical-align: middle;
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
        .form-control, .form-select {
          border: 2px solid #dee2e6;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        .form-control:focus, .form-select:focus {
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
        .btn-info {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
          border: none;
        }
        .btn-success {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          border: none;
        }
        .btn-outline-secondary {
          border: 2px solid #6c757d;
          color: #6c757d;
          background: transparent;
        }
        .btn-outline-secondary:hover {
          background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
          border-color: #6c757d;
          color: white;
        }
        
        /* Badge Styling */
        .badge {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 20px;
        }
        .bg-info {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
        }
        .bg-warning {
          background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%) !important;
          color: #000 !important;
        }
        
        /* Icon Styling */
        .bi {
          font-size: inherit;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .roster-container {
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

export default RosterManagement;
