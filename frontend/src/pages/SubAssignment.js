import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './complaint/ComplaintForm.css';

const SubAssignment = () => {
  const navigate = useNavigate();
  
  const data = [
    {
      requestReference: '25-11-10-0002',
      enteredDate: '11/10/2025',
      enteredTime: '10:16:01 AM',
      assignedByName: 'Romaine Murcott',
      assignedByDesignation: 'TTO',
      assignedToName: 'Piumi Kaushalya',
      assignedToDesignation: 'TTO',
      remarks: '',
    },
    {
      requestReference: '25-11-10-0003',
      enteredDate: '11/10/2025',
      enteredTime: '11:30:45 AM',
      assignedByName: 'John Smith',
      assignedByDesignation: 'Manager',
      assignedToName: 'Sarah Johnson',
      assignedToDesignation: 'Engineer',
      remarks: 'Urgent follow-up required',
    },
    {
      requestReference: '25-11-10-0004',
      enteredDate: '11/10/2025',
      enteredTime: '02:15:33 PM',
      assignedByName: 'Emily Davis',
      assignedByDesignation: 'Supervisor',
      assignedToName: 'Michael Brown',
      assignedToDesignation: 'Technician',
      remarks: 'Awaiting customer response',
    },
  ];

  const styles = {
    pagination: { display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem' },
    pageInfo: { marginLeft: '0.5rem', color: 'var(--text-primary)' }
  };

  // Example button click handlers
  const handleRefresh = (ref) => {
    alert(`Refreshing request ${ref}`);
  };

  const handleMessage = (ref) => {
    alert(`Opening chat for request ${ref}`);
  };

  return (
    <div className="complaint-onboard-wrapper assignments-page sub-assignment-page">
      <Navbar />
      <div className="content-wrapper">
        <div className="complaint-form-container assignments-wide">
          <div className="page-header">
            <div className="page-header-content">
              <h1>Sub Assignments</h1>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Entered Date & Time</th>
                  <th>Assigned By</th>
                  <th>Assigned To</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.requestReference}</td>
                    <td>
                      <div>{item.enteredDate}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.enteredTime}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>{item.assignedByName}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.assignedByDesignation}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>{item.assignedToName}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 400 }}>{item.assignedToDesignation}</div>
                    </td>
                    <td>
                      {item.remarks ? item.remarks : (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No remarks</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start' }}>
                        <button className="btn" title="View" style={{ backgroundColor: '#2563eb', color: '#fff' }}>
                          <FaEye />
                        </button>
                        <button className="btn" title="Update" style={{ backgroundColor: '#FFB300', color: '#fff' }}>
                          <FaEdit />
                        </button>
                        <button className="btn" title="Delete" style={{ backgroundColor: '#F44336', color: '#fff' }}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.pagination}>
            <button type="button" className="btn btn-primary"><FaChevronLeft /> Previous</button>
            <button type="button" className="btn btn-primary">Next <FaChevronRight /></button>
            <span style={styles.pageInfo}>Page 1 of 1</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubAssignment;