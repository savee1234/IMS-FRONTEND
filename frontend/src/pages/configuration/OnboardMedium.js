import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';

const OnboardMedium = () => {
  const [onboardMedium, setOnboardMedium] = useState('');
  const [onboardData, setOnboardData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ createdBy: '', fromDate: '', toDate: '' });

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

  const filteredData = onboardData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.onboardMediumId && item.onboardMediumId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCreatedBy = !filters.createdBy || item.createdByName === filters.createdBy;
    const createdDate = item.createdDtm ? new Date(item.createdDtm) : null;
    const fromOk = !filters.fromDate || (createdDate && createdDate >= new Date(filters.fromDate));
    const toOk = !filters.toDate || (createdDate && createdDate <= new Date(filters.toDate));
    return matchesSearch && matchesCreatedBy && fromOk && toOk;
  });

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
      
      {/* Add New Medium Card */}
      <div className="conf-card">
        <div className="conf-card-header">
          <h2 className="conf-card-title">{editMode ? 'Update Medium' : 'Add New Medium'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="conf-form-group">
            <label className="conf-label">Onboard Medium Name</label>
            <input
              className="conf-input"
              type="text"
              value={onboardMedium}
              onChange={(e) => setOnboardMedium(e.target.value)}
              placeholder="Enter onboard medium"
              required
            />
          </div>
          <div className="conf-actions">
            <button type="button" onClick={handleReset} className="conf-btn conf-btn-outline">Reset</button>
            <button type="submit" disabled={loading} className="conf-btn conf-btn-primary">
              {loading ? 'Processing...' : (editMode ? 'Update' : 'Submit')}
            </button>
          </div>
        </form>
      </div>

      <div className="conf-card">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="conf-form-group" style={{ minWidth: '220px' }}>
            <label className="conf-label">Created By</label>
            <select
              className="conf-input"
              value={filters.createdBy}
              onChange={(e) => setFilters(prev => ({ ...prev, createdBy: e.target.value }))}
            >
              <option value="">All</option>
              {Array.from(new Set(onboardData.map(i => i.createdByName).filter(Boolean))).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="conf-form-group">
            <label className="conf-label">From Date</label>
            <input
              type="date"
              className="conf-input"
              value={filters.fromDate}
              onChange={(e) => setFilters(prev => ({ ...prev, fromDate: e.target.value }))}
            />
          </div>
          <div className="conf-form-group">
            <label className="conf-label">To Date</label>
            <input
              type="date"
              className="conf-input"
              value={filters.toDate}
              onChange={(e) => setFilters(prev => ({ ...prev, toDate: e.target.value }))}
            />
          </div>
          <button type="button" className="conf-btn conf-btn-primary">Submit</button>
        </div>
      </div>

      {/* Search and Table Card */}
      <div className="conf-card">
        <div className="conf-search-container">
          <FaSearch className="conf-search-icon" />
          <input
            type="text"
            className="conf-search-input"
            placeholder="Search medium..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="conf-table-container">
          <table className="conf-table">
            <thead>
              <tr>
                <th>MEDIUM ID</th>
                <th>ONBOARD MEDIUM</th>
                <th>CREATED BY</th>
                <th>CREATED TIME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading && onboardData.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                    No onboard medium records found
                  </td>
                </tr>
              ) : (
                filteredData.map(item => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 500 }}>
                      {item.onboardMediumId || 'OBM---'}
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
                      <div style={{ display: 'flex' }}>
                        <button className="conf-action-btn conf-btn-view" title="View">
                          <FaEye size={14} />
                        </button>
                        <button className="conf-action-btn conf-btn-edit" title="Edit" onClick={() => handleEdit(item)} disabled={loading}>
                          <FaEdit size={14} />
                        </button>
                        <button className="conf-action-btn conf-btn-delete" title="Delete" onClick={() => handleDelete(item._id)} disabled={loading}>
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="conf-pagination">
          <button className="conf-btn conf-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} disabled>
            &lt; Previous
          </button>
          <span className="conf-page-info">Page 1 of 1</span>
          <button className="conf-btn conf-btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardMedium;
