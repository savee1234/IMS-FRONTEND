import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaTimes, FaUser, FaBuilding, FaEnvelope, FaMobile, FaPhone, FaIdCard, FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';

const ContactPersonDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);

  // API Base URL
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '' 
    : 'http://localhost:44354';

  // Fetch organizations for filter dropdown
  const fetchOrganizations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/organizations`);
      const data = await response.json();
      if (data.success) {
        setOrganizations(data.data);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  // Fetch contact persons
  const fetchContacts = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/organization-contact-persons?`;

      if (showAll) {
        url += `&limit=1000`; // Show all contacts when showAll is true
      } else {
        url += `&page=${currentPage}&limit=${itemsPerPage}`;
      }

      if (selectedOrganization) {
        url += `&organizationId=${selectedOrganization}`;
      }

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contact persons');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when filters change
   useEffect(() => {
     fetchOrganizations();
     fetchContacts();
   }, [currentPage, selectedOrganization, searchTerm, showAll]);

   // Auto-refresh every 30 seconds to show newly created contacts
   useEffect(() => {
     const interval = setInterval(() => {
       if (!loading && !viewModalOpen) {
         fetchContacts();
       }
     }, 30000); // Refresh every 30 seconds

     return () => clearInterval(interval);
   }, [loading, viewModalOpen]);

   // Listen for new contact creation events
   useEffect(() => {
     const handleNewContactCreated = () => {
       console.log('New contact created, refreshing list...');
       fetchContacts();
     };

     window.addEventListener('contactCreated', handleNewContactCreated);

     return () => {
       window.removeEventListener('contactCreated', handleNewContactCreated);
     };
   }, []);

  const handleView = (contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedContact(null);
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
        await fetchContacts(); // Refresh the list
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

  const resetFilters = () => {
     setSearchTerm('');
     setSelectedOrganization('');
     setCurrentPage(1);
     setShowAll(false);
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
    <div className="contact-person-details-section" style={{ padding: '2rem' }}>
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
        Contact Person Details
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

      {/* Filters Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaSearch size={16} style={{ color: '#6b7280' }} />
          <input
            type="text"
            placeholder="Search by name, email, organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.9rem',
              width: '300px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaFilter size={16} style={{ color: '#6b7280' }} />
          <select
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.9rem',
              minWidth: '200px',
              outline: 'none'
            }}
          >
            <option value="">All Organizations</option>
            {organizations.map(org => (
              <option key={org._id} value={org._id}>{org.organization}</option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Reset Filters
        </button>

        <button
          onClick={() => fetchContacts()}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          title="Refresh to show newly created contacts"
        >
          {loading ? 'Refreshing...' : '🔄 Refresh'}
        </button>

        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: showAll ? '#f59e0b' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          title={showAll ? 'Show paginated view' : 'Show all contacts (no pagination)'}
        >
          {showAll ? '📄 Show Pages' : '📋 Show All'}
        </button>
      </div>

      {/* Contacts Table */}
      <div className="contacts-table" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        padding: '1.5rem',
        border: '1px solid #d1d5db',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflow: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #d1d5db',
          minWidth: '800px'
        }}>
          <thead>
            <tr>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Contact ID
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Organization
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Name
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Title
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Email
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Mobile
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid #1e3a8a',
                fontWeight: '600',
                backgroundColor: '#1e3a8a',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Created By
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid #1e3a8a',
                fontWeight: '600',
                backgroundColor: '#1e3a8a',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  No contact persons found
                </td>
              </tr>
            ) : (
              contacts.map(contact => (
                <tr key={contact._id}>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    {contact.contactPersonId || 'N/A'}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    {contact.organizationId?.organization || contact.organizationName}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    {contact.name}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    {contact.title || 'N/A'}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    {contact.email}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    {contact.mobileNumber || 'N/A'}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    {contact.createdByName}
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

       {/* Pagination Footer - Hide when showing all */}
       {!showAll && (
         <div style={{
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center',
           marginTop: '16px',
           fontSize: '0.875rem'
         }}>
           <span>Showing {contacts.length} entries</span>
           <div style={{
             display: 'flex',
             gap: '8px'
           }}>
             <button
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               style={{
                 padding: '4px 10px',
                 border: '1px solid #d1d5db',
                 borderRadius: '4px',
                 backgroundColor: currentPage === 1 ? '#f3f4f6' : '#ffffff',
                 color: currentPage === 1 ? '#9ca3af' : '#374151',
                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                 fontSize: '0.875rem'
               }}
             >
               Previous
             </button>
             <span style={{
               padding: '4px 12px',
               backgroundColor: '#f3f4f6',
               borderRadius: '4px',
               display: 'flex',
               alignItems: 'center'
             }}>
               Page {currentPage}
             </span>
             <button
               onClick={() => setCurrentPage(prev => prev + 1)}
               style={{
                 padding: '4px 10px',
                 border: '1px solid #d1d5db',
                 borderRadius: '4px',
                 backgroundColor: '#ffffff',
                 color: '#374151',
                 cursor: 'pointer',
                 fontSize: '0.875rem'
               }}
             >
               Next
             </button>
           </div>
         </div>
       )}

       {/* Show count when showing all */}
       {showAll && (
         <div style={{
           textAlign: 'center',
           marginTop: '16px',
           fontSize: '0.875rem',
           color: '#6b7280'
         }}>
           Showing all {contacts.length} contact persons
         </div>
       )}
     </div>
   );
 };

export default ContactPersonDetails;