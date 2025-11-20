import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [newSolution, setNewSolution] = useState('');
  const [newSolutionType, setNewSolutionType] = useState('');
  const [availableSolutions, setAvailableSolutions] = useState([]);
  const [availableSolutionTypes, setAvailableSolutionTypes] = useState([]);

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
  }, []);

  const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];
  
  // Initialize with default values and allow dynamic updates
  const [solutionTypes, setSolutionTypes] = useState(['Web Development', 'Mobile App', 'Database', 'API Integration']);
  const [solutions, setSolutions] = useState(['Customer Portal', 'Inventory System', 'Payment Gateway', 'Analytics Dashboard']);

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
    
    // Add solution to the solutions state (global list)
    const newSol = newSolution.trim();
    setSolutions(prev => {
      if (!prev.includes(newSol)) {
        return [...prev, newSol];
      }
      return prev;
    });
    
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

  const handleDeleteSolution = (solutionToDelete) => {
    if (window.confirm(`Are you sure you want to delete "${solutionToDelete}"?`)) {
      setSolutions(prev => prev.filter(sol => sol !== solutionToDelete));
      
      // Remove solution from mapping
      const updatedMap = {...solutionTypeToSolutionsMap};
      Object.keys(updatedMap).forEach(type => {
        updatedMap[type] = updatedMap[type].filter(sol => sol !== solutionToDelete);
      });
      setSolutionTypeToSolutionsMap(updatedMap);
      
      alert('Solution deleted successfully!');
    }
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

  const handleResetSolutionType = () => {
    setNewSolutionType('');
  };

  const handleResetSolution = () => {
    setNewSolution('');
  };

  // Get solutions based on selected solution type
  const getSolutionsForType = (solutionType) => {
    return solutionTypeToSolutionsMap[solutionType] || [];
  };

  return (
    <div className="solutions-projects-section" style={{ padding: '1.5rem' }}>

      

      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>⚠️</span>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Error</div>
            <div>{error}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSolutionSubmit} style={{
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        padding: '1.25rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        marginBottom: '1.25rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#1f2937',
              fontSize: '0.95rem'
            }}>
              Employee <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              name="employee"
              value={solutionFormData.employee}
              onChange={handleSolutionInputChange}
              required
              style={{
                padding: '0.65rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.65rem center/14px 14px',
                outline: 'none',
                cursor: 'pointer',
                color: '#1f2937',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            <label style={{
              fontWeight: '600',
              color: '#1f2937',
              fontSize: '0.95rem'
            }}>
              Solution Type <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              name="solutionType"
              value={solutionFormData.solutionType}
              onChange={handleSolutionInputChange}
              required
              style={{
                padding: '0.65rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.65rem center/14px 14px',
                outline: 'none',
                cursor: 'pointer',
                color: '#1f2937',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.35rem',
          marginBottom: '1.25rem'
        }}>
          <label style={{
            fontWeight: '600',
            color: '#1f2937',
            fontSize: '0.95rem'
          }}>
            Solution <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <select
            name="solution"
            value={solutionFormData.solution}
            onChange={handleSolutionInputChange}
            required
            disabled={!solutionFormData.solutionType}
            style={{
              padding: '0.65rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: solutionFormData.solutionType 
                ? 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.65rem center/14px 14px'
                : 'white',
              outline: 'none',
              cursor: solutionFormData.solutionType ? 'pointer' : 'not-allowed',
              color: '#1f2937',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              transition: 'border-color 0.2s',
              opacity: solutionFormData.solutionType ? 1 : 0.6
            }}
            onFocus={(e) => solutionFormData.solutionType && (e.target.style.borderColor = '#3b82f6')}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '0.65rem'
        }}>
          <button 
            type="button" 
            onClick={handleSolutionReset}
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: '1px solid #6b7280',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
          >
            Reset
          </button>
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: loading ? '1px solid #9ca3af' : '1px solid #2563eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
          >
            {loading ? 'Saving...' : (solEditMode ? 'Update' : 'Submit')}
          </button>
        </div>
      </form>

      {/* Solution Management Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1.25rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        marginBottom: '1.25rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>

        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Combined Solution Type and Solution Management */}
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #bae6fd',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>

            
            {/* Two-column layout for adding types and solutions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              {/* Add Solution Type Column */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #bbf7d0'
              }}>
                <h5 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#065f46',
                  margin: '0 0 0.8rem 0'
                }}>
                  Solution Types
                </h5>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      color: '#065f46',
                      fontSize: '0.85rem',
                      marginBottom: '0.35rem'
                    }}>
                      Type Name
                    </label>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <input
                        type="text"
                        value={newSolutionType}
                        onChange={(e) => setNewSolutionType(e.target.value)}
                        placeholder="Enter solution type"
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          border: '1px solid #bbf7d0',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#bbf7d0'}
                      />
                      <button
                        onClick={handleAddSolutionType}
                        style={{
                          padding: '0.6rem 0.9rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: '1px solid #059669',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Current Solution Types */}
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.85rem', 
                    fontWeight: '600', 
                    color: '#065f46', 
                    marginBottom: '0.4rem'
                  }}>
                    Current Types ({solutionTypes.length}):
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.35rem',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    padding: '0.35rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '6px',
                    border: '1px dashed #bbf7d0'
                  }}>
                    {solutionTypes.length === 0 ? (
                      <div style={{ 
                        color: '#6b7280', 
                        fontStyle: 'italic',
                        padding: '0.35rem'
                      }}>
                        No types added
                      </div>
                    ) : (
                      solutionTypes.map((type, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.35rem 0.5rem',
                            backgroundColor: newlyAddedSolutionType === type ? '#a7f3d0' : '#d1fae5',
                            color: '#065f46',
                            borderRadius: '16px',
                            fontSize: '0.75rem',
                            border: '1px solid #6ee7b7',
                            transform: newlyAddedSolutionType === type ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <span>{type}</span>
                          <button
                            onClick={() => handleDeleteSolutionType(type)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '15px',
                              height: '15px',
                              borderRadius: '50%',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            title="Delete solution type"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
              
              {/* Add Solution Column */}
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #bfdbfe'
              }}>
                <h5 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e40af',
                  margin: '0 0 0.8rem 0'
                }}>
                  Solutions
                </h5>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      color: '#1e40af',
                      fontSize: '0.85rem',
                      marginBottom: '0.35rem'
                    }}>
                      Solution Type <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      value={newSolutionType}
                      onChange={(e) => setNewSolutionType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        border: '1px solid #bfdbfe',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%233b82f6\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.6rem center/14px 14px',
                        outline: 'none',
                        cursor: 'pointer',
                        color: '#1e40af',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none'
                      }}
                    >
                      <option value="">Select a type</option>
                      {solutionTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      color: '#1e40af',
                      fontSize: '0.85rem',
                      marginBottom: '0.35rem'
                    }}>
                      Solution Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <input
                        type="text"
                        value={newSolution}
                        onChange={(e) => setNewSolution(e.target.value)}
                        placeholder="Enter solution name"
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          border: '1px solid #bfdbfe',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#bfdbfe'}
                      />
                      <button
                        onClick={handleAddSolution}
                        style={{
                          padding: '0.6rem 0.9rem',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: '1px solid #2563eb',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Reset Button */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={handleResetSolutionManagement}
                    style={{
                      padding: '0.55rem 1.1rem',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: '1px solid #6b7280',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </div>
            
            {/* Current Solutions by Type */}
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '0.9rem', 
                fontWeight: '600', 
                color: '#0c4a6e', 
                marginBottom: '0.6rem'
              }}>
                Solutions by Type:
              </label>
              <div style={{ 
                maxHeight: '150px',
                overflowY: 'auto',
                padding: '0.6rem',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                border: '1px dashed #93c5fd'
              }}>
                {solutionTypes.length === 0 ? (
                  <div style={{ 
                    color: '#6b7280', 
                    fontStyle: 'italic',
                    padding: '0.4rem'
                  }}>
                    No solution types available. Add a solution type first.
                  </div>
                ) : (
                  solutionTypes.map((type, typeIndex) => {
                    const solutionsForType = solutionTypeToSolutionsMap[type] || [];
                    return (
                      <div key={typeIndex} style={{ marginBottom: '0.6rem' }}>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.4rem',
                          backgroundColor: newlyAddedSolutionType === type ? '#dbeafe' : '#f0f9ff',
                          color: '#1e40af',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          border: '1px solid #bfdbfe',
                          marginBottom: '0.2rem'
                        }}>
                          <span style={{ fontWeight: '600' }}>{type}</span>
                          <span style={{ 
                            backgroundColor: '#3b82f6', 
                            color: 'white', 
                            borderRadius: '10px', 
                            padding: '0.1rem 0.4rem', 
                            fontSize: '0.7rem'
                          }}>
                            {solutionsForType.length} solutions
                          </span>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: '0.2rem',
                          paddingLeft: '0.8rem'
                        }}>
                          {solutionsForType.length === 0 ? (
                            <span style={{ 
                              color: '#9ca3af', 
                              fontSize: '0.75rem',
                              fontStyle: 'italic'
                            }}>
                              No solutions added yet
                            </span>
                          ) : (
                            solutionsForType.map((solution, solIndex) => (
                              <span
                                key={solIndex}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.2rem',
                                  padding: '0.2rem 0.4rem',
                                  backgroundColor: newlyAddedSolution === solution ? '#93c5fd' : '#dbeafe',
                                  color: '#1e40af',
                                  borderRadius: '15px',
                                  fontSize: '0.7rem',
                                  border: '1px solid #93c5fd',
                                  transform: newlyAddedSolution === solution ? 'scale(1.05)' : 'scale(1)',
                                  transition: 'all 0.3s ease'
                                }}
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
      </div>

      <div className="table-container" style={{ marginTop: '1rem' }}>
        <table className="modern-table">
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
            {solutionResponsibleData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No solutions assigned yet
                </td>
              </tr>
            ) : (
              solutionResponsibleData.map(item => (
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
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button title="Update" className="btn btn-sm" style={{ backgroundColor: '#FFB300', color: '#fff' }} onClick={() => handleSolutionEdit(item)}>
                        <FaEdit />
                      </button>
                      <button title="Delete" className="btn btn-sm" style={{ backgroundColor: '#F44336', color: '#fff' }} onClick={() => handleSolutionDelete(item._id)}>
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
    </div>
  );
};

export default SolutionsProjects;