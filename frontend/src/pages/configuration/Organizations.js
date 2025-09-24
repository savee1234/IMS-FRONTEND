import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTimes, FaUser, FaBuilding, FaEnvelope, FaMobile, FaPhone, FaIdCard, FaCalendarAlt } from 'react-icons/fa';

const Organizations = () => {
  const [orgFormData, setOrgFormData] = useState({
    organizationId: '',
    organization: '',
    title: '',
    mobileNo: '',
    contactPersonName: '',
    email: '',
    officeNo: '',
    callingName: ''
  });

  const [orgContacts, setOrgContacts] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const titles = ['Manager', 'Director', 'Coordinator', 'Supervisor', 'Executive'];

  // API Base URL
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '' 
    : 'http://localhost:44354';

  // Fetch organizations for dropdown
  const fetchOrganizations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/organizations`);
      const data = await response.json();
      if (data.success) {
        setOrganizations(data.data);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setError('Failed to load organizations');
    }
  };

  // Fetch organization contact persons
  const fetchOrgContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/organization-contact-persons`);
      const data = await response.json();
      if (data.success) {
        setOrgContacts(data.data);
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching organization contacts:', error);
      setError('Failed to load organization contacts');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchOrganizations();
    fetchOrgContacts();
  }, []);

  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setOrgFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    if (!orgFormData.organizationId || !orgFormData.contactPersonName || !orgFormData.email) {
      setError('Please fill in required fields: Organization, Contact Person Name, and Email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const selectedOrg = organizations.find(org => org._id === orgFormData.organizationId);
      
      const contactData = {
        name: orgFormData.contactPersonName,
        title: orgFormData.title,
        organizationId: orgFormData.organizationId,
        organizationName: selectedOrg?.organization || '',
        email: orgFormData.email,
        mobileNumber: orgFormData.mobileNo,
        officeContactNumber: orgFormData.officeNo,
        callingName: orgFormData.callingName,
        createdBy: 'current_user', // TODO: Get from auth context
        createdByName: 'Current User' // TODO: Get from auth context
      };

      const url = editMode 
        ? `${API_BASE_URL}/api/organization-contact-persons/${editingId}`
        : `${API_BASE_URL}/api/organization-contact-persons`;
      
      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();

      if (data.success) {
        await fetchOrgContacts(); // Refresh the list
        handleReset();
        setError('');
      } else {
        setError(data.message || 'Failed to save contact person');
      }
    } catch (error) {
      console.error('Error saving contact person:', error);
      setError('Failed to save contact person');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact person?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/organization-contact-persons/${id}`, {
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
        await fetchOrgContacts(); // Refresh the list
      } else {
        setError(data.message || 'Failed to delete contact person');
      }
    } catch (error) {
      console.error('Error deleting contact person:', error);
      setError('Failed to delete contact person');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrgFormData({
      organizationId: '',
      organization: '',
      title: '',
      mobileNo: '',
      contactPersonName: '',
      email: '',
      officeNo: '',
      callingName: ''
    });
    setEditMode(false);
    setEditingId(null);
    setError('');
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedContact(null);
  };

  const handleEdit = (contact) => {
    setOrgFormData({
      organizationId: contact.organizationId?._id || contact.organizationId,
      organization: contact.organizationId?.organization || contact.organizationName,
      title: contact.title || '',
      mobileNo: contact.mobileNumber || '',
      contactPersonName: contact.name,
      email: contact.email,
      officeNo: contact.officeContactNumber || '',
      callingName: contact.callingName || ''
    });
    setEditMode(true);
    setEditingId(contact._id);
  };

  // Contact Details Modal Component
  const ContactDetailsModal = () => {
    if (!viewModalOpen || !selectedContact) return null;

    const orgName = selectedContact.organizationId?.organization || selectedContact.organizationName;

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
          maxWidth: '600px',
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
                <FaUser size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                  Contact Person Details
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>
                  {selectedContact.name}
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
              {/* Personal Information Card */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
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
                  <FaUser size={16} style={{ color: '#3b82f6' }} />
                  Personal Information
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaIdCard size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Full Name:</span>
                      <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.name}</p>
                    </div>
                  </div>
                  
                  {selectedContact.title && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaIdCard size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                      <div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Title:</span>
                        <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.title}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedContact.callingName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaUser size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                      <div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Calling Name:</span>
                        <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.callingName}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
                  Organization Details
                </h4>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaBuilding size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Organization:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{orgName}</p>
                  </div>
                </div>
                
                {selectedContact.contactPersonId && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
                    <FaIdCard size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Contact ID:</span>
                      <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.contactPersonId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information - Full Width */}
            <div style={{
              backgroundColor: '#f0fdf4',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '1px solid #bbf7d0',
              marginBottom: '1.5rem'
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
                <FaEnvelope size={16} style={{ color: '#10b981' }} />
                Contact Information
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaEnvelope size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Email:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.email}</p>
                  </div>
                </div>
                
                {selectedContact.mobileNumber && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaMobile size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Mobile:</span>
                      <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.mobileNumber}</p>
                    </div>
                  </div>
                )}
                
                {selectedContact.officeContactNumber && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaPhone size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Office:</span>
                      <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.officeContactNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Record Information */}
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
                Record Information
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
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{selectedContact.createdByName}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCalendarAlt size={14} style={{ color: '#6b7280', minWidth: '14px' }} />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Created Date:</span>
                    <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>
                      {new Date(selectedContact.createdDtm).toLocaleDateString()} at {new Date(selectedContact.createdDtm).toLocaleTimeString()}
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
                handleEdit(selectedContact);
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
              Edit Contact
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
    <div className="organizations-section" style={{ padding: '2rem' }}>
      {/* Contact Details Modal */}
      <ContactDetailsModal />
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#1f2937',
        marginBottom: '2rem',
        textAlign: 'left',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '0.5rem'
      }}>
        Organization Contact Persons
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleOrgSubmit} style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '120px'
              }}>Organization</label>
              <select
                name="organizationId"
                value={orgFormData.organizationId}
                onChange={handleOrgInputChange}
                required
                style={{
                  padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                  width: '250px',
                  outline: 'none',
                  cursor: 'pointer',
                  color: '#374151',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none'
                }}
              >
                <option value="">Select Organization</option>
                {organizations.map(org => (
                  <option key={org._id} value={org._id}>{org.organization}</option>
                ))}   
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '120px'
              }}>Title</label>
              <select
                name="title"
                value={orgFormData.title}
                onChange={handleOrgInputChange}
                style={{
                  padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                  width: '250px',
                  outline: 'none',
                  cursor: 'pointer',
                  color: '#374151',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none'
                }}
              >
                <option value="">Select Title</option>
                {titles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '120px'
              }}>Mobile No</label>
              <input
                type="tel"
                name="mobileNo"
                value={orgFormData.mobileNo}
                onChange={handleOrgInputChange}
                placeholder="Enter mobile number"
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
              }}>Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                value={orgFormData.contactPersonName}
                onChange={handleOrgInputChange}
                placeholder="Enter contact name"
                required
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
              }}>Email</label>
              <input
                type="email"
                name="email"
                value={orgFormData.email}
                onChange={handleOrgInputChange}
                placeholder="Enter email address"
                required
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
              }}>Office No</label>
              <input
                type="text"
                name="officeNo"
                value={orgFormData.officeNo}
                onChange={handleOrgInputChange}
                placeholder="Enter office number"
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
              }}>Calling Name</label>
              <input
                type="text"
                name="callingName"
                value={orgFormData.callingName}
                onChange={handleOrgInputChange}
                placeholder="Enter calling name"
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button type="button" onClick={handleReset} style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: '1px solid #6b7280',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Reset
          </button>
          
          <button type="submit" disabled={loading} style={{
            padding: '0.75rem 2rem',
            backgroundColor: loading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: loading ? '1px solid #9ca3af' : '1px solid #3b82f6',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Saving...' : (editMode ? 'Update' : 'Submit')}
          </button>
        </div>
      </form>

      <div className="contacts-table" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        padding: '1.5rem',
        border: '1px solid #d1d5db',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          border: '1px solid #d1d5db'
        }}>
          <thead>
            <tr>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Organization
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Name
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Email
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Mobile
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Created By Name
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Created Dtm
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'center',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  Loading...
                </td>
              </tr>
            ) : orgContacts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  No organization contacts found
                </td>
              </tr>
            ) : (
              orgContacts.map(contact => (
                <tr key={contact._id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.organizationId?.organization || contact.organizationName}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.name}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.email}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.mobileNumber || 'N/A'}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.createdByName}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {new Date(contact.createdDtm).toLocaleString()}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleView(contact)}
                      style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 8px',
                        marginRight: '6px'
                      }}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(contact)}
                      style={{
                        backgroundColor: '#FFB300',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 8px',
                        marginRight: '6px'
                      }}
                      title="Update"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      disabled={loading}
                      style={{
                        backgroundColor: loading ? '#9ca3af' : '#F44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 8px'
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Organizations;
