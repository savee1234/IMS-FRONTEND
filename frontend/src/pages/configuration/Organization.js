import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTimes, FaBuilding, FaIdCard, FaTag, FaUser, FaCalendarAlt } from 'react-icons/fa';

const Organization = () => {
  const [orgFormData, setOrgFormData] = useState({
    organization: '',
    organizationType: ''
  });

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  
  // API Base URL
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '' 
    : 'http://localhost:44354';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/api/organizations`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setOrganizations(data.data);
      } else {
        throw new Error(data.message || 'Failed to load organizations');
      }
    } catch (err) {
      console.error('Failed to load organizations from API:', err);
      setError(`Failed to load organizations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orgFormData.organization || !orgFormData.organizationType) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const orgData = {
        organization: orgFormData.organization.trim(),
        organizationType: orgFormData.organizationType,
        createdBy: 'current_user', // TODO: Get from auth context
        createdByName: 'Current User' // TODO: Get from auth context
      };
      
      const url = editMode 
        ? `${API_BASE_URL}/api/organizations/${editingId}`
        : `${API_BASE_URL}/api/organizations`;
      
      const method = editMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orgData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchOrganizations();
        setOrgFormData({ organization: '', organizationType: '' });
        setEditMode(false);
        setEditingId(null);
        setError('');
      } else {
        setError(data.message || 'Failed to save organization');
      }
    } catch (err) {
      console.error('Failed to save organization:', err);
      setError(`Failed to save organization: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOrganization = async (id) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/organizations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endedBy: 'current_user', // TODO: Get from auth context
          endedByName: 'Current User' // TODO: Get from auth context
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchOrganizations();
      } else {
        setError(data.message || 'Failed to delete organization');
      }
    } catch (error) {
      console.error('Error deleting organization:', error);
      setError('Failed to delete organization');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrgFormData({ organization: '', organizationType: '' });
    setEditMode(false);
    setEditingId(null);
    setError('');
  };

  const handleView = (org) => {
    setSelectedOrganization(org);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedOrganization(null);
  };

  const handleEdit = (org) => {
    setOrgFormData({
      organization: org.organization || '',
      organizationType: org.organizationType || ''
    });
    setEditMode(true);
    setEditingId(org._id);
    setError('');
  };

  // Organization Details Modal Component
  const OrganizationDetailsModal = () => {
    if (!viewModalOpen || !selectedOrganization) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Modal Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaBuilding size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                  Organization Details
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>
                  {selectedOrganization.organization}
                </p>
              </div>
            </div>
            <button
              onClick={closeViewModal}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Organization Information Card */}
              <div style={{
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid #bae6fd'
              }}>
                <h4 style={{
                  margin: '0 0 1rem 0',
                  color: '#1e293b',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FaBuilding size={16} style={{ color: '#0ea5e9' }} />
                  Organization Information
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedOrganization.organizationId && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaIdCard size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                      <div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Organization ID:</span>
                        <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedOrganization.organizationId}</p>
                      </div>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaBuilding size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Organization Name:</span>
                      <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedOrganization.organization}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaTag size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Organization Type:</span>
                      <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedOrganization.organizationType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Information Card */}
              <div style={{
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid #bbf7d0'
              }}>
                <h4 style={{
                  margin: '0 0 1rem 0',
                  color: '#1e293b',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FaIdCard size={16} style={{ color: '#10b981' }} />
                  Status Information
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: selectedOrganization.isActive ? '#10b981' : '#ef4444'
                    }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Status:</span>
                      <p style={{ 
                        margin: 0, 
                        color: selectedOrganization.isActive ? '#10b981' : '#ef4444', 
                        fontWeight: '600' 
                      }}>
                        {selectedOrganization.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                  
                  {selectedOrganization.endedBy && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaUser size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                      <div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Ended By:</span>
                        <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedOrganization.endedByName}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedOrganization.endDtm && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaCalendarAlt size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                      <div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>End Date:</span>
                        <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>
                          {new Date(selectedOrganization.endDtm).toLocaleDateString()} at {new Date(selectedOrganization.endDtm).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Creation Information - Full Width */}
            <div style={{
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '1px solid #fde68a'
            }}>
              <h4 style={{
                margin: '0 0 1rem 0',
                color: '#1e293b',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaCalendarAlt size={16} style={{ color: '#f59e0b' }} />
                Creation Information
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaUser size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Created By:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedOrganization.createdByName}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCalendarAlt size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Created Date:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>
                      {new Date(selectedOrganization.createdDtm).toLocaleDateString()} at {new Date(selectedOrganization.createdDtm).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaIdCard size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Created By ID:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedOrganization.createdBy}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCalendarAlt size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Last Updated:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>
                      {selectedOrganization.updatedAt ? 
                        `${new Date(selectedOrganization.updatedAt).toLocaleDateString()} at ${new Date(selectedOrganization.updatedAt).toLocaleTimeString()}` :
                        'Not updated'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div style={{
            borderTop: '1px solid #e5e7eb',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0 0 12px 12px'
          }}>
            <button
              onClick={() => {
                closeViewModal();
                handleEdit(selectedOrganization);
              }}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
              }}
            >
              <FaEdit size={14} />
              Edit Organization
            </button>
            <button
              onClick={closeViewModal}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#6b7280';
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>{editMode ? 'Edit Organization' : 'Add New System Organization'}</h3>
        {error && (
          <div className="alert-message error">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label className="field-label">Organization *</label>
              <div className="field-control input-wrapper">
                <input
                  type="text"
                  name="organization"
                  value={orgFormData.organization}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label className="field-label">Organization Type *</label>
              <div className="field-control input-wrapper">
                <select
                  name="organizationType"
                  value={orgFormData.organizationType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Type 3">Type 3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <div className="action-buttons-group">
              <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
              <button type="submit" disabled={submitting} className="btn btn-primary">
                {submitting ? 'Saving...' : (editMode ? 'Update Organization' : 'Save Organization')}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="table-container" style={{ marginTop: '1rem' }}>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Organization ID</th>
              <th>Organization</th>
              <th>Organization Type</th>
              <th>Created By</th>
              <th>Created By Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</td>
              </tr>
            ) : organizations.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No organizations found. Add your first organization above.
                </td>
              </tr>
            ) : (
              organizations.map(org => (
                <tr key={org._id}>
                  <td>{org.organizationId || ''}</td>
                  <td>{org.organization || ''}</td>
                  <td>{org.organizationType || ''}</td>
                  <td>{org.createdBy || ''}</td>
                  <td>{org.createdByName || ''}</td>
                  <td>{org.createdDtm ? new Date(org.createdDtm).toLocaleString() : ''}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start' }}>
                      <button title="View" className="btn btn-sm" style={{ backgroundColor: '#4CAF50', color: '#fff' }} onClick={() => handleView(org)}>
                        <FaEye />
                      </button>
                      <button title="Edit" className="btn btn-sm" style={{ backgroundColor: '#FFB300', color: '#fff' }} onClick={() => handleEdit(org)}>
                        <FaEdit />
                      </button>
                      <button title="Delete" className="btn btn-sm" style={{ backgroundColor: '#F44336', color: '#fff' }} onClick={() => handleDeleteOrganization(org._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrganizationDetailsModal />
    </div>
  );
};

export default Organization;