import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaFileAlt, FaHistory, FaComments, FaCheck } from 'react-icons/fa';

const dummyData = [
  {
    reference: 'REQ/2025/0021',
    created: '2025/06/27',
    requester: 'Software Developer AB - Karunada Poyyatil',
    category: 'Information',
    assignFrom: 'Admin Officer - Nimasha Wijesinghe',
    status: 'Pending',
  },
  {
    reference: 'REQ/2025/0018',
    created: '2025/06/27',
    requester: 'Software Developer AB - Karunada Poyyatil',
    category: 'Information',
    assignFrom: 'Admin Officer - Nimasha Wijesinghe',
    status: 'In Progress',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return { color: '#ef4444', fontWeight: '600' };
    case 'In Progress':
      return { color: '#ca8a04', fontWeight: '600' };
    case 'Resolved':
      return { color: '#16a34a', fontWeight: '600' };
    default:
      return { color: '#4b5563' };
  }
};

const PendingAssignments = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
          Pending Assignments
        </h1>

        <table style={{
          width: '100%',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: '6px',
        }}>
          <thead style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Reference</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Created</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Request From</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Category</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Assign From</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Current Status</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, idx) => (
              <tr key={idx} style={{
                borderBottom: '1px solid #d1d5db',
                backgroundColor: '#fff'
              }}>
                <td style={{ padding: '12px' }}>{item.reference}</td>
                <td style={{ padding: '12px' }}>{item.created}</td>
                <td style={{ padding: '12px' }}>{item.requester}</td>
                <td style={{ padding: '12px' }}>{item.category}</td>
                <td style={{ padding: '12px' }}>{item.assignFrom}</td>
                <td style={{
                  padding: '12px',
                  ...getStatusColor(item.status)
                }}>
                  {item.status}
                </td>
                <td style={{
                  padding: '12px',
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center'
                }}>
                  <button title="Details" style={{
                    color: '#2563eb',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <FaFileAlt />
                  </button>
                  <button title="History" style={{
                    color: '#4b5563',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <FaHistory />
                  </button>
                  <button title="Comments" style={{
                    color: '#7c3aed',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <FaComments />
                  </button>
                  <button title="Done" style={{
                    color: '#059669',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <FaCheck />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default PendingAssignments;
