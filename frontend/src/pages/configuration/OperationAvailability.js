import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const OperationAvailability = () => {
  const [operationAvailability, setOperationAvailability] = useState('');
  const [operationData, setOperationData] = useState([
    {
      id: 1,
      operationAvailability: '24/7 Support',
      createdBy: 'admin',
      createdTime: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      operationAvailability: 'Business Hours Only',
      createdBy: 'manager',
      createdTime: '2024-01-14 14:20:00'
    },
    {
      id: 3,
      operationAvailability: 'Emergency Response',
      createdBy: 'supervisor',
      createdTime: '2024-01-13 09:15:00'
    },
    {
      id: 4,
      operationAvailability: 'Maintenance Window',
      createdBy: 'technician',
      createdTime: '2024-01-12 16:45:00'
    }
  ]);
  const [opEditMode, setOpEditMode] = useState(false);
  const [editingOpId, setEditingOpId] = useState(null);

  const handleOpSubmit = (e) => {
    e.preventDefault();
    if (!operationAvailability.trim()) return;

    if (opEditMode) {
      setOperationData(operationData.map(item => 
        item.id === editingOpId 
          ? { ...item, operationAvailability: operationAvailability.trim() }
          : item
      ));
      setOpEditMode(false);
      setEditingOpId(null);
    } else {
      const newOperation = {
        id: operationData.length + 1,
        operationAvailability: operationAvailability,
        createdBy: 'current_user',
        createdTime: new Date().toLocaleString()
      };
      setOperationData([...operationData, newOperation]);
    }
    
    setOperationAvailability('');
  };

  const handleOpEdit = (item) => {
    setOperationAvailability(item.operationAvailability);
    setOpEditMode(true);
    setEditingOpId(item.id);
  };

  const handleOperationDelete = (id) => {
    setOperationData(operationData.filter(op => op.id !== id));
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
          
          <button type="submit" style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            {opEditMode ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>

      <div className="operations-table" style={{
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
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                color: '#374151'
              }}>
                Operation Availability
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                color: '#374151'
              }}>
                Created By
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                color: '#374151'
              }}>
                Created Time
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'center',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                color: '#374151'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {operationData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  No operation availability records found
                </td>
              </tr>
            ) : (
              operationData.map(item => (
                <tr key={item.id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {item.operationAvailability}
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
                    {item.createdTime}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleOpEdit(item)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: '1px solid #f59e0b',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        marginRight: '0.5rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      title="Update"
                    >
                      <FaEdit />
                      Update
                    </button>
                    <button
                      onClick={() => handleOperationDelete(item.id)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: '1px solid #ef4444',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                      Delete
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

export default OperationAvailability;
