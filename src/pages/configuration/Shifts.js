import React, { useState } from 'react';
const Shifts = () => {
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
      <div className="add-section">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Add new shift period (e.g., Morning 8AM-5PM)"
          className="config-input"
        />
        <button onClick={handleAdd} className="add-btn">Add</button>
      </div>

      <ul className="config-list">
        {items.map((item, index) => (
          <li key={index} className="config-item">
            {editIndex === index ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                />
                <button onClick={saveEdit} className="save-btn">Save</button>
                <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <div className="item-content">
                <span>{item}</span>
                <div className="item-actions">
                  <button onClick={() => startEdit(index)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shifts;
