import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialData = {
  onboardMedium: ['Hotline', 'Email', 'WhatsApp', 'SMS'],
  organizations: ['ABC Ltd', 'XYZ Corp', 'Government Dept'],
  contactInfo: ['011-2345678', '077-1234567', 'info@company.com'],
  projects: ['Network Upgrade', 'Customer Portal', 'Billing Revamp'], // for dropdown only
  solutionsPerProject: {
    'Network Upgrade': ['Router Issue', 'Slow Connectivity'],
    'Customer Portal': ['Login Failure', 'UI Bug'],
    'Billing Revamp': ['Incorrect Invoice', 'Late Fee Error'],
  },
  shifts: ['Morning (8AM-5PM)', 'Night (6PM-2AM)', 'Weekend Special'],
  escalationRules: [
    'After 2 days escalate to Supervisor',
    'After 3 days escalate to Manager',
    'Critical issues escalate immediately',
  ],
};

const Configuration = () => {
  const [lovs, setLovs] = useState(initialData);
  const [newValue, setNewValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('onboardMedium');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [selectedProject, setSelectedProject] = useState(initialData.projects[0]);

  const categories = {
    onboardMedium: 'Onboard Medium',
    organizations: 'Organizations',
    contactInfo: 'Customer Contact Info',
    solutionsPerProject: 'Solutions & Projects',
    shifts: 'Roster Shift Periods',
    escalationRules: 'Escalation Rules',
  };

  const categoryIcons = {
    onboardMedium: '📞',
    organizations: '🏢',
    contactInfo: '📇',
    solutionsPerProject: '💻',
    shifts: '⏰',
    escalationRules: '⚠️',
  };

  const handleAdd = () => {
    if (!newValue.trim()) return;
    const updated = { ...lovs };
    const value = newValue.trim();

    if (activeCategory === 'solutionsPerProject') {
      updated.solutionsPerProject[selectedProject] = [
        ...(updated.solutionsPerProject[selectedProject] || []),
        value,
      ];
    } else {
      updated[activeCategory].push(value);
    }

    setLovs(updated);
    setNewValue('');
  };

  const handleDelete = (index) => {
    const updated = { ...lovs };

    if (activeCategory === 'solutionsPerProject') {
      updated.solutionsPerProject[selectedProject].splice(index, 1);
    } else {
      updated[activeCategory].splice(index, 1);
    }

    setLovs(updated);
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    const updated = { ...lovs };

    if (activeCategory === 'solutionsPerProject') {
      updated.solutionsPerProject[selectedProject][editIndex] = editValue.trim();
    } else {
      updated[activeCategory][editIndex] = editValue.trim();
    }

    setLovs(updated);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const getActiveItems = () => {
    return activeCategory === 'solutionsPerProject'
      ? lovs.solutionsPerProject[selectedProject] || []
      : lovs[activeCategory];
  };

  return (
    <div>
      <Navbar />
      <div className="config-container">
        <header className="config-header">
          <h1><span className="icon">⚙️</span> Configuration Module</h1>
          <p className="subtitle">Manage system settings and lookup values</p>
        </header>

        <div className="config-tabs">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                cancelEdit();
              }}
              className={`tab-btn ${activeCategory === key ? 'active' : ''}`}
            >
              <span className="tab-icon">{categoryIcons[key]}</span>
              {categories[key]}
            </button>
          ))}
        </div>

        <div className="config-content">
          <div className="category-header">
            <h2>
              <span className="category-icon">{categoryIcons[activeCategory]}</span>
              {categories[activeCategory]}
            </h2>

            {activeCategory === 'solutionsPerProject' && (
              <select
                value={selectedProject}
                onChange={(e) => {
                  setSelectedProject(e.target.value);
                  cancelEdit();
                }}
                className="project-dropdown"
              >
                {lovs.projects.map((project, i) => (
                  <option key={i} value={project}>{project}</option>
                ))}
              </select>
            )}

            <div className="add-item">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Add new ${categories[activeCategory].toLowerCase()}`}
                className="add-input"
              />
              <button onClick={handleAdd} className="add-button">
                <span className="plus-icon">+</span> Add
              </button>
            </div>
          </div>

          <div className="items-list">
            {getActiveItems().length === 0 ? (
              <div className="empty-state">
                <p>No items found. Add your first {categories[activeCategory].toLowerCase()}.</p>
              </div>
            ) : (
              <ul>
                {getActiveItems().map((item, index) => (
                  <li key={index} className="item-card">
                    {editIndex === index ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-actions">
                          <button onClick={saveEdit} className="save-btn">Save</button>
                          <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="item-text">{item}</span>
                        <div className="item-actions">
                          <button
                            onClick={() => startEdit(index, item)}
                            className="edit-btn"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="delete-btn"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configuration;
