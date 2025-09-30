import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const OperationAvailability = () => {
  const [operationAvailability, setOperationAvailability] = useState('');
  const [operationData, setOperationData] = useState([]);
  const [opEditMode, setOpEditMode] = useState(false);
  const [editingOpId, setEditingOpId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  const fetchOperationAvailability = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/operation-availability`);
      const data = await res.json();
      if (data.success) {
        setOperationData(data.data);
      } else {
        setError(data.message || 'Failed to fetch operation availability');
      }
    } catch (e) {
      console.error('Error fetching operation availability:', e);
      setError('Failed to load operation availability');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchOperationAvailability();
  }, [fetchOperationAvailability]);

  const handleOpSubmit = async (e) => {
    e.preventDefault();
    if (!operationAvailability.trim()) return;

    setLoading(true);
    setError('');
    try {
      const url = opEditMode
        ? `${API_BASE_URL}/api/operation-availability/${editingOpId}`
        : `${API_BASE_URL}/api/operation-availability`;
      const method = opEditMode ? 'PUT' : 'POST';
      const body = opEditMode
        ? { name: operationAvailability.trim() }
        : {
            name: operationAvailability.trim(),
            isAvailable: true,
            createdBy: 'current_user',
            createdByName: 'Current User'
          };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.success) {
        await fetchOperationAvailability();
        setOpEditMode(false);
        setEditingOpId(null);
        setOperationAvailability('');
      } else {
        setError(data.message || 'Failed to save operation availability');
      }
    } catch (e) {
      console.error('Error saving operation availability:', e);
      setError('Failed to save operation availability');
    } finally {
      setLoading(false);
    }
  };

  const handleOpEdit = (item) => {
    setOperationAvailability(item.name);
    setOpEditMode(true);
    setEditingOpId(item._id);
  };

  const handleOperationDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setLoading(true);
    setError('');
    try {
      const deleteRes = await fetch(`${API_BASE_URL}/api/operation-availability/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endedBy: 'current_user',
          endedByName: 'Current User'
        })
      });
      const data = await deleteRes.json();
      if (data.success) {
        await fetchOperationAvailability();
      } else {
        setError(data.message || 'Failed to delete record');
      }
    } catch (e) {
      console.error('Error deleting record:', e);
      setError('Failed to delete record');
    } finally {
      setLoading(false);
    }
  };

  const handleOpReset = () => {
    setOperationAvailability('');
    setOpEditMode(false);
    setEditingOpId(null);
  };

  return (
    <div className="operation-availability-section" style={{ padding: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#1f2937',
        marginBottom: '2rem',
        textAlign: 'left',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '0.5rem'
      }}>
        Operation Availability
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

      <form onSubmit={handleOpSubmit} style={{
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
            Operation Availability :
          </label>
          <input
            type="text"
            value={operationAvailability}
            onChange={(e) => setOperationAvailability(e.target.value)}
            placeholder="Enter operation availability"
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
          <button type="button" onClick={handleOpReset} style={{
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
            backgroundColor: '#3b82f6',
            color: 'white',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}>
            {loading ? 'Saving...' : (opEditMode ? 'Update' : 'Add')}
          </button>
        </div>
      </form>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        padding: '1.5rem',
        border: '1px solid #d1d5db',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        {loading && operationData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            Loading operation availability...
          </div>
        ) : operationData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            No operation availability entries found.
          </div>
        ) : (
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
                }}>ID</th>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'left',
                  border: '1px solid #d1d5db',
                  fontWeight: '600',
                  backgroundColor: '#1a237e',
                  color: '#ffffff'
                }}>Operation Availability</th>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'left',
                  border: '1px solid #d1d5db',
                  fontWeight: '600',
                  backgroundColor: '#1a237e',
                  color: '#ffffff'
                }}>Status</th>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'left',
                  border: '1px solid #d1d5db',
                  fontWeight: '600',
                  backgroundColor: '#1a237e',
                  color: '#ffffff'
                }}>Created By</th>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'left',
                  border: '1px solid #d1d5db',
                  fontWeight: '600',
                  backgroundColor: '#1a237e',
                  color: '#ffffff'
                }}>Created Date</th>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  fontWeight: '600',
                  backgroundColor: '#1a237e',
                  color: '#ffffff'
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {operationData.map((item, index) => (
                <tr key={item._id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>{item.operationAvailabilityId || `OPAV${String(index + 1).padStart(3, '0')}`}</td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>{item.name}</td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: item.isAvailable ? '#dcfce7' : '#fee2e2',
                      color: item.isAvailable ? '#166534' : '#dc2626'
                    }}>
                      {item.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>{item.createdByName}</td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>{new Date(item.createdDtm).toLocaleDateString()}</td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleOpEdit(item)}
                      style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '6px 12px',
                        marginRight: '6px',
                        fontSize: '0.875rem'
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleOperationDelete(item._id)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '6px 12px',
                        fontSize: '0.875rem'
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OperationAvailability;