import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const SolutionsProjects = () => {
  const [solutionFormData, setSolutionFormData] = useState({
    employee: '',
    solutionType: '',
    solution: ''
  });

  const [solutionResponsibleData, setSolutionResponsibleData] = useState([]);
  const [solEditMode, setSolEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // New state for solution management
  const [newSolution, setNewSolution] = useState('');
  const [newSolutionType, setNewSolutionType] = useState('');

  const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';

  const fetchSolutions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/solution-projects`);
      const data = await res.json();
      if (data.success) {
        setSolutionResponsibleData(data.data);
      } else {
        setError(data.message || 'Failed to fetch solution projects');
      }
    } catch (e) {
      console.error('Error fetching solution projects:', e);
      setError('Failed to load solution projects');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];
  
  // Initialize with default values and allow dynamic updates
  const [solutionTypes, setSolutionTypes] = useState(['Web Development', 'Mobile App', 'Database', 'API Integration']);

  // Define solution type to solutions mapping
  const [solutionTypeToSolutionsMap, setSolutionTypeToSolutionsMap] = useState({
    'Web Development': ['Customer Portal', 'Inventory System', 'Analytics Dashboard'],
    'Mobile App': ['Mobile App'],
    'Database': ['Database'],
    'API Integration': ['Payment Gateway']
  });

  const handleSolutionInputChange = (e) => {
    const { name, value } = e.target;
    
    // If solutionType is changed, filter solutions based on solution type
    if (name === 'solutionType') {
      setSolutionFormData(prev => ({
        ...prev,
        solutionType: value,
        solution: '' // Reset solution when solutionType changes
      }));
    } else {
      setSolutionFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSolutionSubmit = async (e) => {
    e.preventDefault();
    if (!solutionFormData.employee || !solutionFormData.solutionType || !solutionFormData.solution) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const url = solEditMode
        ? `${API_BASE_URL}/api/solution-projects/${editingId}`
        : `${API_BASE_URL}/api/solution-projects`;
      const method = solEditMode ? 'PUT' : 'POST';
      const body = solEditMode
        ? {
            employee: solutionFormData.employee,
            solutionType: solutionFormData.solutionType,
            solution: solutionFormData.solution
          }
        : {
            employee: solutionFormData.employee,
            solutionType: solutionFormData.solutionType,
            solution: solutionFormData.solution,
            createdBy: 'current_user', // TODO: replace with real user id
            createdByName: 'Current User' // TODO: replace with real user name
          };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        await fetchSolutions();
        handleSolutionReset();
      } else {
        setError(data.message || 'Failed to save solution project');
      }
    } catch (e) {
      console.error('Error saving solution project:', e);
      setError('Failed to save solution project');
    } finally {
      setLoading(false);
    }
  };

  const handleSolutionReset = () => {
    setSolutionFormData({
      employee: '',
      solutionType: '',
      solution: ''
    });
    setSolEditMode(false);
    setEditingId(null);
    setError('');
  };

  const handleSolutionDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/solution-projects/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endedBy: 'current_user', // TODO: replace
          endedByName: 'Current User' // TODO: replace
        })
      });
      const data = await res.json();
      if (data.success) {
        await fetchSolutions();
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

  const handleSolutionEdit = (item) => {
    setSolutionFormData({
      employee: item.employee,
      solutionType: item.solutionType,
      solution: item.solution
    });
    setSolEditMode(true);
    setEditingId(item._id);
  };

  // New functions for solution management
  const [newlyAddedSolutionType, setNewlyAddedSolutionType] = useState('');
  const [newlyAddedSolution, setNewlyAddedSolution] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ employee: '', solutionType: '', fromDate: '', toDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const handleAddSolutionType = () => {
    if (!newSolutionType.trim()) {
      alert('Please enter a solution type');
      return;
    }
    
    if (solutionTypes.includes(newSolutionType.trim())) {
      alert('This solution type already exists');
      return;
    }
    
    // Add new solution type
    const newType = newSolutionType.trim();
    setSolutionTypes(prev => [...prev, newType]);
    
    // Initialize empty array for this solution type
    const updatedMap = {
      ...solutionTypeToSolutionsMap,
      [newType]: []
    };
    
    setSolutionTypeToSolutionsMap(updatedMap);
    
    // Mark as newly added for visual feedback
    setNewlyAddedSolutionType(newType);
    setTimeout(() => setNewlyAddedSolutionType(''), 3000); // Clear after 3 seconds
    
    setNewSolutionType(''); // Clear the input field
    alert(`Solution type "${newType}" added successfully! You can now add solutions to this type.`);
  };

  const handleAddSolution = () => {
    if (!newSolutionType) {
      alert('Please select a solution type');
      return;
    }
    
    if (!newSolution.trim()) {
      alert('Please enter a solution name');
      return;
    }
    
    // Check if solution already exists in the selected solution type
    const solutionsForType = solutionTypeToSolutionsMap[newSolutionType] || [];
    if (solutionsForType.includes(newSolution.trim())) {
      alert(`This solution already exists for the selected solution type: ${newSolutionType}`);
      return;
    }
    
    const newSol = newSolution.trim();
 
    // Add the new solution to the selected solution type
    const updatedMap = {
      ...solutionTypeToSolutionsMap,
      [newSolutionType]: [...solutionsForType, newSol]
    };
    
    setSolutionTypeToSolutionsMap(updatedMap);
    
    // Mark as newly added for visual feedback
    setNewlyAddedSolution(newSol);
    setTimeout(() => setNewlyAddedSolution(''), 3000); // Clear after 3 seconds
    
    setNewSolution('');
    alert(`Solution "${newSol}" has been added to solution type "${newSolutionType}"!`);
  };

 

  const handleDeleteSolutionType = (typeToDelete) => {
    if (window.confirm(`Are you sure you want to delete "${typeToDelete}"?`)) {
      setSolutionTypes(prev => prev.filter(type => type !== typeToDelete));
      
      // Remove solution type from mapping
      const updatedMap = {...solutionTypeToSolutionsMap};
      delete updatedMap[typeToDelete];
      setSolutionTypeToSolutionsMap(updatedMap);
      
      alert('Solution type deleted successfully!');
    }
  };

  const handleResetSolutionManagement = () => {
    setNewSolution('');
    setNewSolutionType('');
  };

 

  // Get solutions based on selected solution type
  const getSolutionsForType = (solutionType) => {
    return solutionTypeToSolutionsMap[solutionType] || [];
  };

  const filteredSolutions = solutionResponsibleData.filter(item => {
    const matchesEmp = !filters.employee || item.employee === filters.employee;
    const matchesType = !filters.solutionType || item.solutionType === filters.solutionType;
    const createdDate = item.createdDtm ? new Date(item.createdDtm) : null;
    const fromOk = !filters.fromDate || (createdDate && createdDate >= new Date(filters.fromDate));
    const toOk = !filters.toDate || (createdDate && createdDate <= new Date(filters.toDate));
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      (item.employee || '').toLowerCase().includes(q) ||
      (item.solutionType || '').toLowerCase().includes(q) ||
      (item.solution || '').toLowerCase().includes(q) ||
      (item.createdByName || '').toLowerCase().includes(q);
    return matchesEmp && matchesType && fromOk && toOk && matchesSearch;
  });
  const pageCount = Math.max(1, Math.ceil(filteredSolutions.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRows = filteredSolutions.slice(indexOfFirst, indexOfLast);
  return (
    <div>

      

      
      {error && (
        <div className="alert-message error">{error}</div>
      )}

      

      

      {/* Solution Management (Type + Solution + By Type) */}
      <div className="ma-filter-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div>
            <h5 className="ma-label" style={{ margin: 0, marginBottom: '0.5rem' }}>Add Solution Type</h5>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                value={newSolutionType}
                onChange={(e) => setNewSolutionType(e.target.value)}
                placeholder="Enter solution type"
                className="ma-input"
              />
              <button
                onClick={handleAddSolutionType}
                className="ma-btn-submit"
                style={{ marginTop: 0 }}
              >
                Add
              </button>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

          <div>
            <h5 className="ma-label" style={{ margin: 0, marginBottom: '0.75rem' }}>Add Solution Name</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '0.5rem', width: '100%' }}>
              <div className="ma-filter-group">
                <label className="ma-label">Solution Type <span style={{ color: '#dc2626' }}>*</span></label>
                <select
                  value={newSolutionType}
                  onChange={(e) => setNewSolutionType(e.target.value)}
                  className="ma-select"
                  style={{ color: newSolutionType ? '#111827' : '#9ca3af' }}
                >
                  <option value="">Select a type</option>
                  {solutionTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="ma-filter-group">
                <label className="ma-label">Solution Name <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="text"
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  placeholder="Enter solution name"
                  className="ma-input"
                />
              </div>
              <div className="ma-actions" style={{ alignItems: 'flex-end' }}>
                <button
                  onClick={handleResetSolutionManagement}
                  className="ma-pagination-btn"
                  style={{ marginTop: 0, height: '42px', padding: '0 1.25rem', borderRadius: '6px' }}
                >
                  Reset
                </button>
              </div>
              <div className="ma-actions" style={{ alignItems: 'flex-end' }}>
                <button
                  onClick={handleAddSolution}
                  className="ma-btn-submit"
                  style={{ marginTop: 0, backgroundColor: '#1e3a8a', cursor: (!newSolutionType || !newSolution.trim()) ? 'not-allowed' : 'pointer' }}
                  disabled={!newSolutionType || !newSolution.trim()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

          <div>
            <label className="ma-label">Solutions by Type:</label>
            <div style={{ maxHeight: '220px', overflowY: 'auto', padding: '0.6rem', borderRadius: '8px', border: '1px dashed #93c5fd', backgroundColor: '#ffffff' }}>
              {solutionTypes.length === 0 ? (
                <div style={{ color: '#6b7280', fontStyle: 'italic', padding: '0.4rem' }}>
                  No solution types available. Add a solution type first.
                </div>
              ) : (
                solutionTypes.map((type, typeIndex) => {
                  const solutionsForType = solutionTypeToSolutionsMap[type] || [];
                  return (
                    <div key={typeIndex} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: '0.3rem', padding: '0.4rem', borderRadius: '8px', border: '1px solid #bfdbfe', backgroundColor: '#f8fafc', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.3rem', borderRadius: '6px', fontSize: '0.9rem', color: '#1f2937' }}>
                        <span style={{ fontWeight: 'normal' }}>{type}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {solutionsForType.length === 0 ? (
                          <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            No solutions added yet
                          </span>
                        ) : (
                          solutionsForType.map((solution, solIndex) => (
                            <span
                              key={solIndex}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.6rem', backgroundColor: '#dbeafe', borderRadius: '15px', fontSize: '0.8rem', border: '1px solid #93c5fd', color: '#111827' }}
                            >
                              <span>{solution}</span>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ma-filter-card" style={{ marginBottom: '1.75rem' }}>
        <form onSubmit={handleSolutionSubmit} style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%' }}>
            <div className="ma-filter-group">
              <label className="ma-label">
                Employee <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                name="employee"
                value={solutionFormData.employee}
                onChange={handleSolutionInputChange}
                required
                className="ma-select"
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp} value={emp}>{emp}</option>
                ))}
              </select>
            </div>
            <div className="ma-filter-group">
              <label className="ma-label">
                Solution Type <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                name="solutionType"
                value={solutionFormData.solutionType}
                onChange={handleSolutionInputChange}
                required
                className="ma-select"
              >
                <option value="">Select Solution Type</option>
                {solutionTypes.map((type, index) => (
                  <option 
                    key={index} 
                    value={type}
                    style={{
                      backgroundColor: newlyAddedSolutionType === type ? '#dbeafe' : 'transparent',
                      fontWeight: newlyAddedSolutionType === type ? 'bold' : 'normal'
                    }}
                  >
                    {type}
                    {newlyAddedSolutionType === type && ' (Newly Added)'}
                  </option>
                ))}
              </select>
            </div>
            <div className="ma-filter-group">
              <label className="ma-label">
                Solution <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                name="solution"
                value={solutionFormData.solution}
                onChange={handleSolutionInputChange}
                required
                disabled={!solutionFormData.solutionType}
                className="ma-select"
                style={{ cursor: solutionFormData.solutionType ? 'pointer' : 'not-allowed', opacity: solutionFormData.solutionType ? 1 : 0.6 }}
              >
                <option value="">Select Solution</option>
                {solutionFormData.solutionType && getSolutionsForType(solutionFormData.solutionType).map((sol, index) => (
                  <option 
                    key={index} 
                    value={sol}
                    style={{
                      backgroundColor: newlyAddedSolution === sol ? '#dbeafe' : 'transparent',
                      fontWeight: newlyAddedSolution === sol ? 'bold' : 'normal'
                    }}
                  >
                    {sol}
                    {newlyAddedSolution === sol && ' (Newly Added)'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ma-actions" style={{ justifyContent: 'flex-end', width: '100%', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={handleSolutionReset}
              className="ma-pagination-btn"
            >
              Reset
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="ma-btn-submit"
              style={{ marginTop: 0, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Saving...' : (solEditMode ? 'Update' : 'Submit')}
            </button>
          </div>
        </form>
      </div>

      <div className="ma-table-card">
        <div className="ma-search-bar">
          <FaSearch className="ma-search-icon" />
          <input
            type="text"
            className="ma-search-input"
            placeholder="Search solutions..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="ma-table-container">
        <table className="ma-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Solution Type</th>
              <th>Solution</th>
              <th>Created By</th>
              <th>Created Dtm</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && solutionResponsibleData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Loading...
                </td>
              </tr>
            ) : filteredSolutions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No solutions assigned yet
                </td>
              </tr>
            ) : (
              currentRows.map(item => (
                <tr key={item._id}>
                  <td>
                    {item.employee}
                  </td>
                  <td>
                    {item.solutionType}
                  </td>
                  <td>
                    {item.solution}
                  </td>
                  <td>
                    {item.createdByName}
                  </td>
                  <td>
                    {item.createdDtm ? (
                      <>
                        {new Date(item.createdDtm).toLocaleDateString()}
                        {'\u00A0\u00A0'}
                        {new Date(item.createdDtm).toLocaleTimeString()}
                      </>
                    ) : ''}
                  </td>
                  <td>
                    <div className="ma-actions">
                      <button title="Update" type="button" className="ma-btn-action ma-btn-edit" onClick={() => handleSolutionEdit(item)}>
                        <FaEdit size={16} />
                      </button>
                      <button title="Delete" type="button" className="ma-btn-action ma-btn-delete" onClick={() => handleSolutionDelete(item._id)}>
                        <FaTrash size={16} />
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

export default SolutionsProjects;
