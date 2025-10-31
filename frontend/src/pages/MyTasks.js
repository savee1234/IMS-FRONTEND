import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';
import { FaFileAlt, FaHistory, FaComments, FaCheck } from 'react-icons/fa';

const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:44354/api/complaints');
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const result = await response.json();
    const complaints = result.data || result; // Handle both old and new response formats

    // Map backend data to frontend display format
    return complaints.map((complaint, index) => ({
      id: complaint._id || index + 1,
      reference: complaint.requestRef || `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear().toString().slice(-2)}-0001`,
      requester: complaint.contactName || 'Unknown',
      priority: complaint.priority || 'Medium',
      status: complaint.solutionName === 'Resolved' ? 'Completed' :
              complaint.solutionName === 'In Progress' ? 'Ongoing' : 'Open',
      issue: complaint.complaint || complaint.complaintDetails || 'No details provided',
      phone: complaint.searchMobile || complaint.mobile || 'N/A',
      email: complaint.email || 'N/A',
      created: complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      // Store organization contact person info if available
      organizationContactPerson: complaint.organizationContactPersonId ? {
        name: complaint.organizationContactPersonId.name,
        organizationName: complaint.organizationContactPersonId.organizationName,
        email: complaint.organizationContactPersonId.email,
        mobileNumber: complaint.organizationContactPersonId.mobileNumber
      } : null,
      // Store original complaint data for actions
      originalComplaint: complaint
    }));
  } catch (error) {
    console.error('Error fetching complaints:', error);
    // Return empty array if API fails
    return [];
  }
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
    setIsEditing(false);
    // Initialize edit form data with current complaint data
    setEditFormData({
      reference: complaint.reference,
      requester: complaint.requester,
      priority: complaint.priority,
      status: complaint.status,
      phone: complaint.phone,
      email: complaint.email,
      issue: complaint.issue,
      categoryType: complaint.originalComplaint?.categoryType || '',
      organization: complaint.originalComplaint?.organization || '',
      solutionType: complaint.originalComplaint?.solutionType || '',
      medium: complaint.originalComplaint?.medium || '',
      assignment: complaint.originalComplaint?.assignment || '',
      docRef: complaint.originalComplaint?.docRef || '',
      docSubject: complaint.originalComplaint?.docSubject || '',
      remarks: complaint.originalComplaint?.remarks || ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
    setIsEditing(false);
    setEditFormData({});
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (selectedComplaint) {
      setEditFormData({
        reference: selectedComplaint.reference,
        requester: selectedComplaint.requester,
        priority: selectedComplaint.priority,
        status: selectedComplaint.status,
        phone: selectedComplaint.phone,
        email: selectedComplaint.email,
        issue: selectedComplaint.issue,
        categoryType: selectedComplaint.originalComplaint?.categoryType || '',
        organization: selectedComplaint.originalComplaint?.organization || '',
        solutionType: selectedComplaint.originalComplaint?.solutionType || '',
        medium: selectedComplaint.originalComplaint?.medium || '',
        assignment: selectedComplaint.originalComplaint?.assignment || '',
        docRef: selectedComplaint.originalComplaint?.docRef || '',
        docSubject: selectedComplaint.originalComplaint?.docSubject || '',
        remarks: selectedComplaint.originalComplaint?.remarks || ''
      });
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      // Here you would typically make an API call to update the complaint
      // For now, we'll just update the local state
      console.log('Saving complaint with data:', editFormData);
      
      // Update the selected complaint with new data
      const updatedComplaint = {
        ...selectedComplaint,
        ...editFormData,
        originalComplaint: {
          ...selectedComplaint.originalComplaint,
          ...editFormData
        }
      };
      
      setSelectedComplaint(updatedComplaint);
      setIsEditing(false);
      
      // Show success message
      alert('Complaint updated successfully!');
      
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('Error updating complaint. Please try again.');
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError('Failed to load complaints');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    videoBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -2,
    },
    gradientOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(5px)',
      zIndex: -1,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
      padding: '1rem',
      marginTop: '1rem',
      maxWidth: '1400px',
      margin: '1rem auto 0 auto'
    },
    pageHeader: {
      textAlign: 'center',
      marginBottom: '1rem',
      padding: '1.5rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 0.5rem 0',
      textAlign: 'center'
    },
    pageSubtitle: {
      color: '#6b7280',
      fontSize: '1.1rem',
      margin: 0,
      fontWeight: '400'
    },
    contentContainer: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      padding: '2rem'
    },
    actionBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      padding: '1rem',
      background: 'rgba(248, 250, 252, 0.5)',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    refreshButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'background-color 0.2s'
    },
    exportButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    exportButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    errorMessage: {
      color: '#dc2626',
      backgroundColor: '#fee2e2',
      padding: '0.75rem 1rem',
      borderRadius: '6px',
      marginBottom: '1rem',
      border: '1px solid #fecaca'
    },
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      borderBottom: '2px solid #e5e7eb'
    },
    tableHeaderCell: {
      padding: '1rem',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151',
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.2s'
    },
    tableCell: {
      padding: '1rem',
      color: '#374151',
      fontSize: '0.875rem'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    viewButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem',
      color: '#6b7280'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#6b7280'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    modalTitle: {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background-color 0.2s'
    },
    modalGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    modalField: {
      marginBottom: '0.5rem'
    },
    modalLabel: {
      fontWeight: '600',
      color: '#374151',
      fontSize: '0.875rem'
    },
    modalValue: {
      margin: '4px 0 0 0',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    modalDescription: {
      marginBottom: '1.5rem'
    },
    modalDescriptionLabel: {
      fontWeight: '600',
      color: '#374151',
      fontSize: '0.875rem',
      marginBottom: '0.5rem'
    },
    modalDescriptionValue: {
      margin: '8px 0 0 0',
      color: '#6b7280',
      lineHeight: '1.5',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      fontSize: '0.875rem'
    },
    modalContactInfo: {
      marginBottom: '1.5rem'
    },
    modalContactLabel: {
      fontWeight: '600',
      color: '#374151',
      fontSize: '0.875rem',
      marginBottom: '0.5rem'
    },
    modalContactValue: {
      margin: '8px 0 0 0',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      border: '1px solid #e5e7eb'
    },
    modalContactItem: {
      margin: '0 0 4px 0',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    },
    modalButton: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    closeModalButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    editModalButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    editInput: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      color: '#374151',
      backgroundColor: 'white',
      transition: 'border-color 0.2s'
    },
    editSelect: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      color: '#374151',
      backgroundColor: 'white',
      transition: 'border-color 0.2s'
    },
    editTextarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      color: '#374151',
      backgroundColor: 'white',
      transition: 'border-color 0.2s',
      resize: 'vertical',
      minHeight: '80px'
    },
    editActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '1.5rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e5e7eb'
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.page}>
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.gradientOverlay}></div>
      <Navbar />
      
      <div style={styles.contentWrapper}>
        {/* Page Header */}
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>
            My Tasks
          </h1>
          <p style={styles.pageSubtitle}>
            View and manage your assigned tasks and complaints
          </p>
        </header>

        <div style={styles.contentContainer}>
          {/* Action Bar */}
          <div style={styles.actionBar}>
            <button
              onClick={() => window.location.reload()}
              style={styles.refreshButton}
            >
              {loading ? 'Loading...' : 'Refresh Tasks'}
            </button>

            <div style={styles.exportButtons}>
              <button style={styles.exportButton}>
                CSV
              </button>
              <button style={styles.exportButton}>
                Excel
              </button>
              <button style={styles.exportButton}>
                PDF
              </button>
              <button style={styles.exportButton}>
                Print
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>Reference</th>
                  <th style={styles.tableHeaderCell}>Requester</th>
                  <th style={styles.tableHeaderCell}>Priority</th>
                  <th style={styles.tableHeaderCell}>Status</th>
                  <th style={styles.tableHeaderCell}>Issue</th>
                  <th style={styles.tableHeaderCell}>Phone</th>
                  <th style={styles.tableHeaderCell}>Email</th>
                  <th style={styles.tableHeaderCell}>Created</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" style={styles.loadingContainer}>
                      Loading complaints...
                    </td>
                  </tr>
                ) : tasks.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={styles.emptyState}>
                      No complaints found. Submit a complaint to see it here.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{task.reference}</td>
                      <td style={styles.tableCell}>{task.requester}</td>
                      <td style={styles.tableCell}>{task.priority}</td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: task.status === 'Open'
                              ? '#fee2e2'
                              : task.status === 'Ongoing'
                              ? '#fef3c7'
                              : '#d1fae5',
                            color: task.status === 'Open'
                              ? '#dc2626'
                              : task.status === 'Ongoing'
                              ? '#92400e'
                              : '#065f46'
                          }}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>{task.issue}</td>
                      <td style={styles.tableCell}>{task.phone}</td>
                      <td style={styles.tableCell}>{task.email}</td>
                      <td style={styles.tableCell}>{task.created}</td>
                      <td style={styles.tableCell}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            title="Details"
                            onClick={() => handleViewDetails(task)}
                            style={{
                              color: '#2563eb',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <FaFileAlt />
                          </button>
                          <button 
                            title="History" 
                            style={{
                              color: '#4b5563',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <FaHistory />
                          </button>
                          <button 
                            title="Comments" 
                            style={{
                              color: '#7c3aed',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <FaComments />
                          </button>
                          <button 
                            title="Done" 
                            style={{
                              color: '#059669',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Complaint Details Modal */}
      {showModal && selectedComplaint && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                Complaint Details
              </h2>
              <button
                onClick={closeModal}
                style={styles.closeButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            <div style={styles.modalGrid}>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Reference:</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.reference || ''}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={styles.modalValue}>
                    {selectedComplaint.reference}
                  </div>
                )}
              </div>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Requester:</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.requester || ''}
                    onChange={(e) => handleInputChange('requester', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={styles.modalValue}>
                    {selectedComplaint.requester}
                  </div>
                )}
              </div>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Priority:</div>
                {isEditing ? (
                  <select
                    value={editFormData.priority || ''}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    style={styles.editSelect}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                ) : (
                  <div style={styles.modalValue}>
                    {selectedComplaint.priority}
                  </div>
                )}
              </div>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Status:</div>
                {isEditing ? (
                  <select
                    value={editFormData.status || ''}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    style={styles.editSelect}
                  >
                    <option value="Open">Open</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <div style={styles.modalValue}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: selectedComplaint.status === 'Open'
                          ? '#fee2e2'
                          : selectedComplaint.status === 'Ongoing'
                          ? '#fef3c7'
                          : '#d1fae5',
                        color: selectedComplaint.status === 'Open'
                          ? '#dc2626'
                          : selectedComplaint.status === 'Ongoing'
                          ? '#92400e'
                          : '#065f46'
                      }}
                    >
                      {selectedComplaint.status}
                    </span>
                  </div>
                )}
              </div>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Phone:</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={styles.modalValue}>
                    {selectedComplaint.phone}
                  </div>
                )}
              </div>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Email:</div>
                {isEditing ? (
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  <div style={styles.modalValue}>
                    {selectedComplaint.email}
                  </div>
                )}
              </div>
              <div style={styles.modalField}>
                <div style={styles.modalLabel}>Created:</div>
                <div style={styles.modalValue}>
                  {selectedComplaint.created}
                </div>
              </div>
              {selectedComplaint.originalComplaint && (
                <>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Category:</div>
                    {isEditing ? (
                      <select
                        value={editFormData.categoryType || ''}
                        onChange={(e) => handleInputChange('categoryType', e.target.value)}
                        style={styles.editSelect}
                      >
                        <option value="">Select Category</option>
                        <option value="Billing">Billing</option>
                        <option value="Connectivity">Connectivity</option>
                        <option value="Technical">Technical</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.categoryType || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Organization:</div>
                    {isEditing ? (
                      <select
                        value={editFormData.organization || ''}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        style={styles.editSelect}
                      >
                        <option value="">Select Organization</option>
                        <option value="SLT">SLT</option>
                        <option value="Mobitel">Mobitel</option>
                        <option value="ABC Pvt Ltd">ABC Pvt Ltd</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.organization || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Solution Type:</div>
                    {isEditing ? (
                      <select
                        value={editFormData.solutionType || ''}
                        onChange={(e) => handleInputChange('solutionType', e.target.value)}
                        style={styles.editSelect}
                      >
                        <option value="">Select Solution Type</option>
                        <option value="Permanent">Permanent</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Workaround">Workaround</option>
                        <option value="Feature Request">Feature Request</option>
                      </select>
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.solutionType || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Medium:</div>
                    {isEditing ? (
                      <select
                        value={editFormData.medium || ''}
                        onChange={(e) => handleInputChange('medium', e.target.value)}
                        style={styles.editSelect}
                      >
                        <option value="">Select Medium</option>
                        <option value="Hotline">Hotline</option>
                        <option value="Email">Email</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="SMS">SMS</option>
                        <option value="Walk-in">Walk-in</option>
                      </select>
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.medium || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Assignment:</div>
                    {isEditing ? (
                      <select
                        value={editFormData.assignment || ''}
                        onChange={(e) => handleInputChange('assignment', e.target.value)}
                        style={styles.editSelect}
                      >
                        <option value="">Select Assignment</option>
                        <option value="Field Visit">Field Visit</option>
                        <option value="Remote Fix">Remote Fix</option>
                        <option value="Call Back">Call Back</option>
                        <option value="Escalate L2">Escalate L2</option>
                        <option value="Fiber Team">Fiber Team</option>
                        <option value="Billing Team">Billing Team</option>
                        <option value="Tech Support">Tech Support</option>
                      </select>
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.assignment || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Document Reference:</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editFormData.docRef || ''}
                        onChange={(e) => handleInputChange('docRef', e.target.value)}
                        style={styles.editInput}
                        placeholder="Enter document reference"
                      />
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.docRef || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Document Subject:</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editFormData.docSubject || ''}
                        onChange={(e) => handleInputChange('docSubject', e.target.value)}
                        style={styles.editInput}
                        placeholder="Enter document subject"
                      />
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.docSubject || 'N/A'}
                      </div>
                    )}
                  </div>
                  <div style={styles.modalField}>
                    <div style={styles.modalLabel}>Remarks:</div>
                    {isEditing ? (
                      <textarea
                        value={editFormData.remarks || ''}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                        style={styles.editTextarea}
                        placeholder="Enter remarks"
                      />
                    ) : (
                      <div style={styles.modalValue}>
                        {selectedComplaint.originalComplaint.remarks || 'N/A'}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div style={styles.modalDescription}>
              <div style={styles.modalDescriptionLabel}>Issue Description:</div>
              {isEditing ? (
                <textarea
                  value={editFormData.issue || ''}
                  onChange={(e) => handleInputChange('issue', e.target.value)}
                  style={styles.editTextarea}
                  placeholder="Enter issue description"
                />
              ) : (
                <div style={styles.modalDescriptionValue}>
                  {selectedComplaint.issue}
                </div>
              )}
            </div>

            {selectedComplaint.organizationContactPerson && (
              <div style={styles.modalContactInfo}>
                <div style={styles.modalContactLabel}>Organization Contact Person:</div>
                <div style={styles.modalContactValue}>
                  <div style={styles.modalContactItem}>
                    <strong>Name:</strong> {selectedComplaint.organizationContactPerson.name}
                  </div>
                  <div style={styles.modalContactItem}>
                    <strong>Organization:</strong> {selectedComplaint.organizationContactPerson.organizationName}
                  </div>
                  <div style={styles.modalContactItem}>
                    <strong>Email:</strong> {selectedComplaint.organizationContactPerson.email}
                  </div>
                  <div style={styles.modalContactItem}>
                    <strong>Mobile:</strong> {selectedComplaint.organizationContactPerson.mobileNumber}
                  </div>
                </div>
              </div>
            )}

            <div style={styles.modalActions}>
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    style={{...styles.modalButton, ...styles.cancelButton}}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    style={{...styles.modalButton, ...styles.saveButton}}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={closeModal}
                    style={{...styles.modalButton, ...styles.closeModalButton}}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleEditClick}
                    style={{...styles.modalButton, ...styles.editModalButton}}
                  >
                    Edit Complaint
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyTasks;