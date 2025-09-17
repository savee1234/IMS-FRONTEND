import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Organization = () => {
  const [orgFormData, setOrgFormData] = useState({
    organization: '',
    organizationId: '',
    organizationType: ''
  });

  const [organizations, setOrganizations] = useState([
    {
      ORGANIZATION_ID: '1',
      ORGANIZATION: 'ABC Corporation',
      ORGANIZATION_TYPE: 'Type 1',
      CREATED_BY: '015777',
      CREATED_BY_NAME: 'Romaine Murcott',
      CREATED_DTM: '7/17/2025 12:49:20 PM',
      ENDED_BY: '',
      ENDED_BY_NAME: '',
      END_DTM: ''
    },
    {
      ORGANIZATION_ID: '2',
      ORGANIZATION: 'XYZ Industries',
      ORGANIZATION_TYPE: 'Type 2',
      CREATED_BY: '015778',
      CREATED_BY_NAME: 'John Smith',
      CREATED_DTM: '7/16/2025 10:30:15 AM',
      ENDED_BY: '',
      ENDED_BY_NAME: '',
      END_DTM: ''
    },
    {
      ORGANIZATION_ID: '3',
      ORGANIZATION: 'Tech Solutions Ltd',
      ORGANIZATION_TYPE: 'Type 1',
      CREATED_BY: '015779',
      CREATED_BY_NAME: 'Sarah Johnson',
      CREATED_DTM: '7/15/2025 2:15:45 PM',
      ENDED_BY: '',
      ENDED_BY_NAME: '',
      END_DTM: ''
    },
    {
      ORGANIZATION_ID: '4',
      ORGANIZATION: 'Global Systems Inc',
      ORGANIZATION_TYPE: 'Type 3',
      CREATED_BY: '015780',
      CREATED_BY_NAME: 'Mike Wilson',
      CREATED_DTM: '7/14/2025 9:45:30 AM',
      ENDED_BY: '',
      ENDED_BY_NAME: '',
      END_DTM: ''
    },
    {
      ORGANIZATION_ID: '5',
      ORGANIZATION: 'Innovation Corp',
      ORGANIZATION_TYPE: 'Type 2',
      CREATED_BY: '015781',
      CREATED_BY_NAME: 'Lisa Brown',
      CREATED_DTM: '7/13/2025 4:20:15 PM',
      ENDED_BY: '',
      ENDED_BY_NAME: '',
      END_DTM: ''
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const API_BASE = 'https://localhost:44354';

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
      const { data } = await axios.get(`${API_BASE}/MasterData/GetSystemOrganization`);
      if (Array.isArray(data) && data.length > 0) {
        setOrganizations(data);
      }
      // Keep existing sample data if API fails or returns empty
    } catch (err) {
      console.error('Failed to load organizations from API, using sample data', err);
      // Keep the existing sample data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orgFormData.organization || !orgFormData.organizationId || !orgFormData.organizationType) {
      alert('Please fill in required fields');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${API_BASE}/MasterData/SaveSystemOrganization`, {
        organization: orgFormData.organization,
        organizationId: orgFormData.organizationId,
        organizationType: orgFormData.organizationType
      });
      await fetchOrganizations();
      setOrgFormData({ organization: '', organizationId: '', organizationType: '' });
    } catch (err) {
      console.error('Failed to save organization', err);
      alert('Failed to save organization');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOrganization = (id) => {
    setOrganizations(organizations.filter(org => (org.ORGANIZATION_ID || org.id) !== id));
  };

  const handleReset = () => {
    setOrgFormData({ organization: '', organizationId: '', organizationType: '' });
  };

  const handleView = (org) => {
    alert(`Viewing Organization:\nID: ${org.ORGANIZATION_ID || org.id}\nOrganization: ${org.ORGANIZATION || org.organization}\nType: ${org.ORGANIZATION_TYPE || org.organizationType}`);
  };

  const handleEdit = (org) => {
    setOrgFormData({
      organization: org.ORGANIZATION || org.organization || '',
      organizationId: org.ORGANIZATION_ID || org.id || '',
      organizationType: org.ORGANIZATION_TYPE || org.organizationType || ''
    });
    // Remove the organization from the list since we're editing it
    setOrganizations(organizations.filter(item => (item.ORGANIZATION_ID || item.id) !== (org.ORGANIZATION_ID || org.id)));
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      {/* Form Section */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          color: '#1f2937',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Add New System Organization
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Organization ID *
              </label>
              <input
                type="text"
                name="organizationId"
                value={orgFormData.organizationId}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Organization *
              </label>
              <input
                type="text"
                name="organization"
                value={orgFormData.organization}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Organization Type *
            </label>
            <select
              name="organizationType"
              value={orgFormData.organizationType}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                background: 'white'
              }}
              required
            >
              <option value="">Select type</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
            </select>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '1rem'
          }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                transition: 'background-color 0.2s'
              }}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Organization'}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          color: '#1f2937',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          System Organizations List
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
                  Organization ID
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
                  Organization
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
                  Organization Type
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
                  Created By
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
                  Created By Name
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
                  Created Date
                </th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#ffffff', backgroundColor: '#1a237e', border: '1px solid #d1d5db' }}>
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
              ) : organizations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#6b7280',
                    border: '1px solid #d1d5db'
                  }}>
                    No organizations found. Add your first organization above.
                  </td>
                </tr>
              ) : (
                organizations.map(org => (
                  <tr key={org.ORGANIZATION_ID || org.id}>
                                         <td style={{
                       padding: '1rem',
                       border: '1px solid #d1d5db',
                       color: '#374151'
                     }}>
                       {org.ORGANIZATION_ID || org.id || ''}
                     </td>
                     <td style={{
                       padding: '1rem',
                       border: '1px solid #d1d5db',
                       color: '#374151'
                     }}>
                       {org.ORGANIZATION || org.organization || ''}
                     </td>
                     <td style={{
                       padding: '1rem',
                       border: '1px solid #d1d5db',
                       color: '#374151'
                     }}>
                       {org.ORGANIZATION_TYPE || org.organizationType || ''}
                     </td>
                     <td style={{
                       padding: '1rem',
                       border: '1px solid #d1d5db',
                       color: '#374151'
                     }}>
                       {org.CREATED_BY || org.createdBy || ''}
                     </td>
                     <td style={{
                       padding: '1rem',
                       border: '1px solid #d1d5db',
                       color: '#374151'
                     }}>
                       {org.CREATED_BY_NAME || org.createdByName || ''}
                     </td>
                     <td style={{
                       padding: '1rem',
                       border: '1px solid #d1d5db',
                       color: '#374151'
                     }}>
                       {org.CREATED_DTM || org.createdDtm || ''}
                     </td>
                    <td style={{
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      textAlign: 'center'
                    }}>
                      <button
                        onClick={() => handleView(org)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: '1px solid #10b981',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          marginRight: '0.25rem',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(org)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: '1px solid #f59e0b',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          marginRight: '0.25rem',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteOrganization(org.ORGANIZATION_ID || org.id)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: '1px solid #ef4444',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center'
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
    </div>
  );
};

export default Organization;
