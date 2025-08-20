import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';
import './Configuration.css';

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
  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    videoBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -2,
    },
    gradientOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%)',
      zIndex: -1,
    },
  };
  const [lovs, setLovs] = useState(initialData);
  const [newValue, setNewValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('onboardMedium');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [selectedProject, setSelectedProject] = useState(initialData.projects[0]);
  const [featureCount, setFeatureCount] = useState(0);

  // Operation Availability state
  const [operationAvailability, setOperationAvailability] = useState('');
  const [operationData, setOperationData] = useState([
    {
      id: 1,
      operationAvailability: 'Network Maintenance',
      createdBy: 'admin',
      createdTime: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      operationAvailability: 'System Backup',
      createdBy: 'user1',
      createdTime: '2024-01-14 14:20:00'
    }
  ]);
  const [opEditMode, setOpEditMode] = useState(false);
  const [opEditId, setOpEditId] = useState(null);

  // Organization Contact Persons state
  const [orgFormData, setOrgFormData] = useState({
    organization: '',
    title: '',
    mobileNo: '',
    contactPersonName: '',
    email: '',
    officeNo: ''
  });

  const [orgContacts, setOrgContacts] = useState([
    {
      id: 1,
      organization: 'ABC Ltd',
      name: 'John Doe',
      createdBy: 'admin',
      createdByName: 'System Admin',
      createdDtm: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      organization: 'XYZ Corp',
      name: 'Jane Smith',
      createdBy: 'user1',
      createdByName: 'John Manager',
      createdDtm: '2024-01-14 14:20:00'
    }
  ]);

  const [orgEditMode, setOrgEditMode] = useState(false);
  const [orgEditId, setOrgEditId] = useState(null);

  const organizations = ['ABC Ltd', 'XYZ Corp', 'Government Dept', 'Tech Solutions', 'Global Industries'];
  const titles = ['Manager', 'Director', 'Coordinator', 'Supervisor', 'Executive'];

  const categories = {
    onboardMedium: 'Onboard Medium',
    organizations: 'Organizations',
    contactInfo: 'Customer Contact Info',
    solutionsPerProject: 'Solutions & Projects',
    shifts: 'Roster Shift Periods',
    escalationRules: 'Escalation Rules',
    newFeature: 'Operation Availability',
  };

  const categoryIcons = {
    onboardMedium: '📞',
    organizations: '🏢',
    contactInfo: '📇',
    solutionsPerProject: '💻',
    shifts: '⏰',
    escalationRules: '⚠️',
    newFeature: '🔧',
  };

  // Original functions for other categories
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

  // Organization Contact Persons functions
  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setOrgFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrgSubmit = (e) => {
    e.preventDefault();
    
    if (orgEditMode) {
      // Update existing contact
      setOrgContacts(prev => prev.map(contact => 
        contact.id === orgEditId 
          ? { ...contact, ...orgFormData, name: orgFormData.contactPersonName }
          : contact
      ));
      setOrgEditMode(false);
      setOrgEditId(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        organization: orgFormData.organization,
        name: orgFormData.contactPersonName,
        createdBy: 'currentUser',
        createdByName: 'Current User',
        createdDtm: new Date().toLocaleString()
      };
      setOrgContacts(prev => [...prev, newContact]);
    }
    
    // Reset form
    setOrgFormData({
      organization: '',
      title: '',
      mobileNo: '',
      contactPersonName: '',
      email: '',
      officeNo: ''
    });
  };

  const handleOrgReset = () => {
    setOrgFormData({
      organization: '',
      title: '',
      mobileNo: '',
      contactPersonName: '',
      email: '',
      officeNo: ''
    });
    setOrgEditMode(false);
    setOrgEditId(null);
  };

  const handleOrgEdit = (contact) => {
    setOrgFormData({
      organization: contact.organization,
      title: '',
      mobileNo: '',
      contactPersonName: contact.name,
      email: '',
      officeNo: ''
    });
    setOrgEditMode(true);
    setOrgEditId(contact.id);
  };

  const handleOrgDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setOrgContacts(prev => prev.filter(contact => contact.id !== id));
    }
  };

  const handleOrgView = (contact) => {
    alert(`Viewing: ${contact.name} from ${contact.organization}`);
  };

  // Operation Availability functions
  const handleOperationSubmit = (e) => {
    e.preventDefault();
    
    if (!operationAvailability.trim()) return;
    
    if (opEditMode) {
      // Update existing operation
      setOperationData(prev => prev.map(op => 
        op.id === opEditId 
          ? { ...op, operationAvailability: operationAvailability.trim() }
          : op
      ));
      setOpEditMode(false);
      setOpEditId(null);
    } else {
      // Add new operation
      const newOperation = {
        id: Date.now(),
        operationAvailability: operationAvailability.trim(),
        createdBy: 'currentUser',
        createdTime: new Date().toLocaleString()
      };
      setOperationData(prev => [...prev, newOperation]);
    }
    
    setOperationAvailability('');
  };

  const handleOperationReset = () => {
    setOperationAvailability('');
    setOpEditMode(false);
    setOpEditId(null);
  };

  const handleOperationEdit = (operation) => {
    setOperationAvailability(operation.operationAvailability);
    setOpEditMode(true);
    setOpEditId(operation.id);
  };

  const handleOperationDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this operation?')) {
      setOperationData(prev => prev.filter(op => op.id !== id));
    }
  };

  // New Feature functions
  const handleTryFeature = () => {
    setFeatureCount(featureCount + 1);
    alert(`You've tried the feature ${featureCount + 1} time(s)!`);
  };

  const handleLearnMore = () => {
    alert('Learn more about this amazing feature!');
  };

  return (
    <div style={styles.page}>
          <video autoPlay loop muted style={styles.videoBackground}>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={styles.gradientOverlay}></div>
      <Navbar />
      <div className="config-container">
        <header className="config-header">
          <h1><span className="icon"></span> Configuration Module</h1>
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
          {/* Special handling for Organizations - show the new design */}
          {activeCategory === 'organizations' ? (
            <div className="org-contacts-section">
              <h2>Organization Contact Persons</h2>
              
              {/* Input Form */}
              <form onSubmit={handleOrgSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-column">
                    <div className="form-group">
                      <label>Organization *</label>
                      <select
                        name="organization"
                        value={orgFormData.organization}
                        onChange={handleOrgInputChange}
                        required
                      >
                        <option value="">Select Organization</option>
                        {organizations.map(org => (
                          <option key={org} value={org}>{org}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Title</label>
                      <select
                        name="title"
                        value={orgFormData.title}
                        onChange={handleOrgInputChange}
                      >
                        <option value="">Select Title</option>
                        {titles.map(title => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Mobile No</label>
                      <input
                        type="tel"
                        name="mobileNo"
                        value={orgFormData.mobileNo}
                        onChange={handleOrgInputChange}
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                  
                  <div className="form-column">
                    <div className="form-group">
                      <label>Contact Person Name *</label>
                      <input
                        type="text"
                        name="contactPersonName"
                        value={orgFormData.contactPersonName}
                        onChange={handleOrgInputChange}
                        placeholder="Enter contact name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={orgFormData.email}
                        onChange={handleOrgInputChange}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Office No</label>
                      <input
                        type="text"
                        name="officeNo"
                        value={orgFormData.officeNo}
                        onChange={handleOrgInputChange}
                        placeholder="Enter office number"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={handleOrgReset} className="reset-btn">
                    Reset
                  </button>
                  <button type="submit" className="submit-btn">
                    {orgEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Data Table */}
              <div className="contacts-table-section">
                <h3>Contact Persons List</h3>
                <div className="table-container">
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>Organization</th>
                        <th>Name</th>
                        <th>Created by</th>
                        <th>Created by name</th>
                        <th>Created dtm</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgContacts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="no-data">No contacts found</td>
                        </tr>
                      ) : (
                        orgContacts.map(contact => (
                          <tr key={contact.id}>
                            <td>{contact.organization}</td>
                            <td>{contact.name}</td>
                            <td>{contact.createdBy}</td>
                            <td>{contact.createdByName}</td>
                            <td>{contact.createdDtm}</td>
                            <td className="actions">
                              <button 
                                onClick={() => handleOrgView(contact)}
                                className="action-btn view-btn"
                                title="View"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => handleOrgEdit(contact)}
                                className="action-btn edit-btn"
                                title="Update"
                              >
                                Update
                              </button>
                              <button 
                                onClick={() => handleOrgDelete(contact.id)}
                                className="action-btn delete-btn"
                                title="Delete"
                              >
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
            </div>
          ) : activeCategory === 'newFeature' ? (
            <div className="operation-availability-section">
              <h2>Operation Availability</h2>
              
              {/* Input Form */}
              <form onSubmit={handleOperationSubmit} className="operation-form">
                <div className="form-group-inline">
                  <label>Operation Availability:</label>
                  <input
                    type="text"
                    value={operationAvailability}
                    onChange={(e) => setOperationAvailability(e.target.value)}
                    placeholder="Enter operation availability"
                    className="operation-input"
                    required
                  />
                </div>
                
                <div className="form-actions-inline">
                  <button type="button" onClick={handleOperationReset} className="reset-btn">
                    Reset
                  </button>
                  <button type="submit" className="submit-btn">
                    {opEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Data Table */}
              <div className="operation-table-section">
                <div className="table-container">
                  <table className="operation-table">
                    <thead>
                      <tr>
                        <th>Operation Availability</th>
                        <th>Created By</th>
                        <th>Created Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationData.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="no-data">No operations found</td>
                        </tr>
                      ) : (
                        operationData.map(operation => (
                          <tr key={operation.id}>
                            <td>{operation.operationAvailability}</td>
                            <td>{operation.createdBy}</td>
                            <td>{operation.createdTime}</td>
                            <td className="actions">
                              <button 
                                onClick={() => handleOperationEdit(operation)}
                                className="action-btn edit-btn"
                                title="Update"
                              >
                                Update
                              </button>
                              <button 
                                onClick={() => handleOperationDelete(operation.id)}
                                className="action-btn delete-btn"
                                title="Delete"
                              >
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
            </div>
          ) : (
            /* Original content for other categories */
            <>
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
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="delete-btn"
                                title="Delete"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configuration;
