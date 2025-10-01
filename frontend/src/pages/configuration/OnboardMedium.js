import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const OnboardMedium = () => {
  const [onboardMedium, setOnboardMedium] = useState('');
  const [onboardData, setOnboardData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch onboard mediums from API
  const fetchOnboardMediums = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:44354/api/onboard-mediums');
      const result = await response.json();
      
      if (result.success) {
        setOnboardData(result.data);
      } else {
        setError('Failed to fetch onboard mediums');
      }
    } catch (error) {
      console.error('Error fetching onboard mediums:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchOnboardMediums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onboardMedium.trim()) return;

    try {
      setLoading(true);
      setError('');

      if (editMode) {
        // Update existing onboard medium
        const response = await fetch(`http://localhost:44354/api/onboard-mediums/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: onboardMedium.trim()
          })
        });

        const result = await response.json();
        if (result.success) {
          await fetchOnboardMediums(); // Refresh the list
          setEditMode(false);
          setEditingId(null);
          setOnboardMedium('');
        } else {
          setError(result.message || 'Failed to update onboard medium');
        }
      } else {
        // Create new onboard medium
        const response = await fetch('http://localhost:44354/api/onboard-mediums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: onboardMedium.trim(),
            createdBy: 'current_user',
            createdByName: 'Current User'
          })
        });

        const result = await response.json();
        if (result.success) {
          await fetchOnboardMediums(); // Refresh the list
          setOnboardMedium('');
        } else {
          setError(result.message || 'Failed to create onboard medium');
        }
      }
    } catch (error) {
      console.error('Error submitting onboard medium:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setOnboardMedium(item.name);
    setEditMode(true);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this onboard medium?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:44354/api/onboard-mediums/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endedBy: 'current_user',
          endedByName: 'Current User'
        })
      });

      const result = await response.json();
      if (result.success) {
        await fetchOnboardMediums(); // Refresh the list
      } else {
        setError(result.message || 'Failed to delete onboard medium');
      }
    } catch (error) {
      console.error('Error deleting onboard medium:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOnboardMedium('');
    setEditMode(false);
    setEditingId(null);
    setError('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="onboard-medium-section" style={{ padding: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#1f2937',
        marginBottom: '2rem',
        textAlign: 'left',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '0.5rem'
      }}>
        Onboard Medium
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          gap: '1rem'
        }}>
          <label style={{
            fontWeight: '600',
            color: '#374151',
            fontSize: '1rem',
            minWidth: '180px'
          }}>
            Onboard Medium :
          </label>
          <input
            type="text"
            value={onboardMedium}
            onChange={(e) => setOnboardMedium(e.target.value)}
            placeholder="Enter onboard medium"
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.9rem',
              width: '300px',
              outline: 'none',
              color: '#374151'
            }}
          />
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
            border: `1px solid ${loading ? '#9ca3af' : '#3b82f6'}`,
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Processing...' : (editMode ? 'Update' : 'Submit')}
          </button>
        </div>
      </form>

      <div className="onboard-table" style={{
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
                Medium ID
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Onboard Medium
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Created By
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Created Time
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
                <td colSpan="5" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  Loading...
                </td>
              </tr>
            ) : onboardData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  No onboard medium records found
                </td>
              </tr>
            ) : (
              onboardData.map(item => (
                <tr key={item._id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.onboardMediumId}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.name}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.createdByName}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {formatDate(item.createdDtm)}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleEdit(item)}
                      disabled={loading}
                      style={{
                        backgroundColor: loading ? '#9ca3af' : '#FFB300',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
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
                      onClick={() => handleDelete(item._id)}
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

export default OnboardMedium;
