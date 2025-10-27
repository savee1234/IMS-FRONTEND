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
  }, [fetchSolutions]);

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
  const handleAddSolution = () => {
    if (!newSolution.trim()) {
      alert('Please enter a solution name');
      return;
    }
    
    // Check if solution already exists in any solution type
    const solutionExists = Object.values(solutionTypeToSolutionsMap).some(solutionsArray => 
      solutionsArray.includes(newSolution.trim())
    );
    
    if (solutionExists) {
      alert('This solution already exists');
      return;
    }
    
    // Add solution to the solutions state
    setSolutions(prev => [...prev, newSolution.trim()]);
    setNewSolution('');
    alert('Solution added successfully!');
  };

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
    setSolutionTypes(prev => [...prev, newSolutionType.trim()]);
    
    // Add default solution based on solution type
    const defaultSolution = newSolutionType.trim();
    const updatedMap = {
      ...solutionTypeToSolutionsMap,
      [newSolutionType.trim()]: [defaultSolution]
    };
    
    setSolutionTypeToSolutionsMap(updatedMap);
    
    // Add solution to solutions array if not exists
    if (!solutions.includes(defaultSolution)) {
      setSolutions(prev => [...prev, defaultSolution]);
    }
    
    setNewSolutionType('');
    alert('Solution type added successfully!');
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

  // Get solutions based on selected solution type
  const getSolutionsForType = (solutionType) => {
    return solutionTypeToSolutionsMap[solutionType] || [];
  };

  return (
    <div className="solutions-projects-section" style={{ padding: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#1f2937',
        marginBottom: '1rem',
        textAlign: 'left',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '0.5rem'
      }}>
        Solutions Responsible Person
      </h2>
      
      <h3 style={{
        fontSize: '1.2rem',
        color: '#374151',
        marginBottom: '2rem',
        fontWeight: '600'
      }}>
        Employees Responsible for Solutions
      </h3>
      
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

      <form onSubmit={handleSolutionSubmit} style={{
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{
              fontWeight: '600',
              color: '#374151',
              fontSize: '1rem',
              minWidth: '100px'
            }}>Employee</label>
            <select
              name="employee"
              value={solutionFormData.employee}
              onChange={handleSolutionInputChange}
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
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{
              fontWeight: '600',
              color: '#374151',
              fontSize: '1rem',
              minWidth: '120px'
            }}>Solution Types</label>
            <select
              name="solutionType"
              value={solutionFormData.solutionType}
              onChange={handleSolutionInputChange}
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
              <option value="">Select Solution Type</option>
              {solutionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{
              fontWeight: '600',
              color: '#374151',
              fontSize: '1rem',
              minWidth: '100px'
            }}>Solution</label>
            <select
              name="solution"
              value={solutionFormData.solution}
              onChange={handleSolutionInputChange}
              required
              disabled={!solutionFormData.solutionType} // Disable if no solution type selected
              style={{
                padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.9rem',
                background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                width: '250px',
                outline: 'none',
                cursor: solutionFormData.solutionType ? 'pointer' : 'not-allowed',
                color: '#374151',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            >
              <option value="">Select Solution</option>
              {solutionFormData.solutionType && getSolutionsForType(solutionFormData.solutionType).map(sol => (
                <option key={sol} value={sol}>{sol}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button 
            type="button" 
            onClick={handleSolutionReset}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: '1px solid #6b7280',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: loading ? '1px solid #9ca3af' : '1px solid #3b82f6',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : (solEditMode ? 'Update' : 'Submit')}
          </button>
        </div>
      </form>

      {/* Solution Management Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1.5rem',
          textAlign: 'left',
          borderBottom: '2px solid #10b981',
          paddingBottom: '0.5rem'
        }}>
          🔧 Solution Management
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Add New Solution Type */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #10b981'
          }}>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#065f46',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ➕ Add Solution Type
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newSolutionType}
                onChange={(e) => setNewSolutionType(e.target.value)}
                placeholder="Enter new solution type"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
              <button
                onClick={handleAddSolutionType}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: '1px solid #10b981',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Type
              </button>
            </div>
            
            {/* Current Solution Types */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                Current Solution Types:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {solutionTypes.map((type, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: '1px solid #a7f3d0'
                    }}
                  >
                    {type}
                    <button
                      onClick={() => handleDeleteSolutionType(type)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: '0'
                      }}
                      title="Delete solution type"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Add New Solution */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #3b82f6'
          }}>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ➕ Add Solution
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newSolution}
                onChange={(e) => setNewSolution(e.target.value)}
                placeholder="Enter new solution"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
              <button
                onClick={handleAddSolution}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: '1px solid #3b82f6',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Solution
              </button>
            </div>
            
            {/* Current Solutions */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                Current Solutions:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {solutions.map((solution, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: '1px solid #93c5fd'
                    }}
                  >
                    {solution}
                    <button
                      onClick={() => handleDeleteSolution(solution)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: '0'
                      }}
                      title="Delete solution"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="solutions-table" style={{
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
                textAlign: 'center',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Employee
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'center',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Solution Type
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'center',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Solution
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'center',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Created By
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'center',
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
            {solutionResponsibleData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  No solutions assigned yet
                </td>
              </tr>
            ) : (
              solutionResponsibleData.map(item => (
                <tr key={item._id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {item.employee}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {item.solutionType}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {item.solution}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {item.createdByName}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {item.createdDtm ? (
                      <>
                        {new Date(item.createdDtm).toLocaleDateString()}
                        {'\u00A0\u00A0'}
                        {new Date(item.createdDtm).toLocaleTimeString()}
                      </>
                    ) : ''}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleSolutionEdit(item)}
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
                      onClick={() => handleSolutionDelete(item._id)}
                      style={{
                        backgroundColor: '#F44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
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

export default SolutionsProjects;