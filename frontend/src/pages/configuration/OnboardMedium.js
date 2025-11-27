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
    <div className="onboard-medium-section">
      
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
      
      <form onSubmit={handleSubmit} className="config-form">
        <div className="config-field-row">
          <label className="config-label">Onboard Medium :</label>
          <input
            className="config-input"
            type="text"
            value={onboardMedium}
            onChange={(e) => setOnboardMedium(e.target.value)}
            placeholder="Enter onboard medium"
            required
          />
        </div>
        <div className="config-actions">
          <button type="button" onClick={handleReset} className="config-btn-secondary">Reset</button>
          <button type="submit" disabled={loading} className="config-btn-primary">{loading ? 'Processing...' : (editMode ? 'Update' : 'Submit')}</button>
        </div>
      </form>

      <div className="onboard-table config-card">
        <table className="config-table">
          <thead>
            <tr>
              <th>
                Medium ID
              </th>
              <th>
                Onboard Medium
              </th>
              <th>
                Created By
              </th>
              <th>
                Created Time
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                  Loading...
                </td>
              </tr>
            ) : onboardData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                  No onboard medium records found
                </td>
              </tr>
            ) : (
              onboardData.map(item => (
                <tr key={item._id}>
                  <td>
                    {item.onboardMediumId}
                  </td>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.createdByName}
                  </td>
                  <td>
                    {formatDate(item.createdDtm)}
                  </td>
                  <td>
                    <div className="config-table-actions">
                      <button className="config-icon-btn" title="Update" onClick={() => handleEdit(item)} disabled={loading}>
                        <FaEdit size={18} />
                      </button>
                      <button className="config-icon-btn" title="Delete" onClick={() => handleDelete(item._id)} disabled={loading}>
                        <FaTrash size={18} />
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
  );
};

export default OnboardMedium;
