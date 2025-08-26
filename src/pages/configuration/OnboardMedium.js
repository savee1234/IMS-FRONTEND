import React, { useState } from 'react';
import backgroundVideo from '../../assets/Background.mp4';

const OnboardMedium = () => {
  const [items, setItems] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (!newValue.trim()) return;
    setItems([...items, newValue.trim()]);
    setNewValue('');
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    const updatedItems = [...items];
    updatedItems[editIndex] = editValue.trim();
    setItems(updatedItems);
    setEditIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="config-section">
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          margin: '1rem 0'
        }}>
          <h2 style={{ color: '#374151', marginBottom: '1.5rem' }}>Onboard Medium</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Add new onboard medium"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
              <button 
                onClick={handleAdd}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: 'white'
          }}>
            {items.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#6b7280',
                fontStyle: 'italic'
              }}>
                No onboard medium items found. Add one above.
              </div>
            ) : (
              items.map((item, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {editIndex === index ? (
                    <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px'
                        }}
                      />
                      <button 
                        onClick={saveEdit}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span style={{ color: '#374151', fontWeight: '500' }}>{item}</span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => startEdit(index)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(index)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
    </div>
  );
};

export default OnboardMedium;
