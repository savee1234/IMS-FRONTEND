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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

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

  const pageCount = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);

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
      
      <div className="ma-filter-card" style={{ marginBottom: '1.25rem' }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}
        >
          <div className="ma-filter-group" style={{ flex: '1 1 300px' }}>
            <label className="ma-label">{editMode ? 'Update Medium' : 'Add New Medium'}</label>
            <input
              className="ma-input"
              type="text"
              value={onboardMedium}
              onChange={(e) => setOnboardMedium(e.target.value)}
              placeholder="Enter onboard medium"
              required
            />
          </div>
          <div className="ma-actions" style={{ flex: '0 0 auto' }}>
            <button type="button" onClick={handleReset} className="ma-pagination-btn">Reset</button>
            <button
              type="submit"
              disabled={loading}
              className="ma-btn-submit"
              style={{ marginLeft: 0, marginTop: 0 }}
            >
              {loading ? 'Processing...' : (editMode ? 'Update' : 'Submit')}
            </button>
          </div>
        </form>
      </div>

      {/* Search and Table Card - Main Assignment Theme */}
      <div className="ma-table-card">
        <div className="ma-search-bar">
          <FaSearch className="ma-search-icon" />
          <input
            type="text"
            className="ma-search-input"
            placeholder="Search onboard mediums"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="ma-table-container">
          <table className="ma-table">
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
                currentRows.map(item => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 500 }}>
                      {item.onboardMediumId || 'N/A'}
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
                      <div className="ma-actions">
                        <button className="ma-btn-action ma-btn-view" title="View" type="button" onClick={() => alert('View functionality not implemented yet')}>
                          <FaEye />
                        </button>
                        <button className="ma-btn-action ma-btn-edit" title="Edit" type="button" onClick={() => handleEdit(item)} disabled={loading}>
                          <FaEdit />
                        </button>
                        <button className="ma-btn-action ma-btn-delete" title="Delete" type="button" onClick={() => handleDelete(item._id)} disabled={loading}>
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

        <div className="ma-footer-row">
          <button
            type="button"
            className="ma-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            className="ma-pagination-btn next"
            onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
            disabled={currentPage === pageCount}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardMedium;
