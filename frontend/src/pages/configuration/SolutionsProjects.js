import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SolutionsProjects = () => {
  const [solutionFormData, setSolutionFormData] = useState({
    employee: '',
    solutionType: '',
    solution: ''
  });

  const [solutionResponsibleData, setSolutionResponsibleData] = useState([
    {
      id: 1,
      employee: 'John Doe',
      solutionType: 'Web Development',
      solution: 'Customer Portal',
      createdBy: 'admin',
      createdDtm: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      solutionType: 'Mobile App',
      solution: 'Inventory System',
      createdBy: 'manager',
      createdDtm: '2024-01-14 14:20:00'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      solutionType: 'Database',
      solution: 'Payment Gateway',
      createdBy: 'supervisor',
      createdDtm: '2024-01-13 09:15:00'
    },
    {
      id: 4,
      employee: 'Sarah Wilson',
      solutionType: 'API Integration',
      solution: 'Analytics Dashboard',
      createdBy: 'lead',
      createdDtm: '2024-01-12 16:45:00'
    }
  ]);
  const [solEditMode, setSolEditMode] = useState(false);

  const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];
  const solutionTypes = ['Web Development', 'Mobile App', 'Database', 'API Integration'];
  const solutions = ['Customer Portal', 'Inventory System', 'Payment Gateway', 'Analytics Dashboard'];

  const handleSolutionInputChange = (e) => {
    const { name, value } = e.target;
    setSolutionFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSolutionSubmit = (e) => {
    e.preventDefault();
    if (!solutionFormData.employee || !solutionFormData.solutionType || !solutionFormData.solution) {
      alert('Please fill in all fields');
      return;
    }

    const newSolution = {
      id: solutionResponsibleData.length + 1,
      employee: solutionFormData.employee,
      solutionType: solutionFormData.solutionType,
      solution: solutionFormData.solution,
      createdBy: 'current_user',
      createdDtm: new Date().toLocaleString()
    };

    setSolutionResponsibleData([...solutionResponsibleData, newSolution]);
    setSolutionFormData({
      employee: '',
      solutionType: '',
      solution: ''
    });
  };

  const handleSolutionReset = () => {
    setSolutionFormData({
      employee: '',
      solutionType: '',
      solution: ''
    });
    setSolEditMode(false);
  };

  const handleSolutionDelete = (id) => {
    setSolutionResponsibleData(solutionResponsibleData.filter(item => item.id !== id));
  };

  const handleSolutionEdit = (item) => {
    setSolutionFormData({
      employee: item.employee,
      solutionType: item.solutionType,
      solution: item.solution
    });
    setSolEditMode(true);
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
              <option value="">Select Solution</option>
              {solutions.map(sol => (
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
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {solEditMode ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>

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
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Employee
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Solution Type
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                backgroundColor: '#1a237e',
                color: '#ffffff'
              }}>
                Solution
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
                <tr key={item.id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.employee}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.solutionType}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.solution}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.createdBy}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.createdDtm}
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
                      onClick={() => handleSolutionDelete(item.id)}
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
