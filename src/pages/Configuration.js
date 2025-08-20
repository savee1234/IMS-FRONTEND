import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

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

  // Solution Responsible state
  const [solutionFormData, setSolutionFormData] = useState({
    employee: '',
    solutionType: '',
    solution: ''
  });

  const [solutionResponsibleData, setSolutionResponsibleData] = useState([
    {
      id: 1,
      employee: 'John Doe',
      solutionType: 'Network Issue',
      solution: 'Router Configuration',
      createdBy: 'admin',
      createdDtm: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      solutionType: 'Software Bug',
      solution: 'Login Fix',
      createdBy: 'user1',
      createdDtm: '2024-01-14 14:20:00'
    }
  ]);

  const [solEditMode, setSolEditMode] = useState(false);
  const [solEditId, setSolEditId] = useState(null);

  const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
  const solutionTypes = ['Network Issue', 'Software Bug', 'Hardware Problem', 'Security Issue', 'Performance Issue'];
  const solutions = ['Router Configuration', 'Login Fix', 'Hardware Replacement', 'Security Patch', 'Performance Optimization'];

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
  // eslint-disable-next-line no-unused-vars
  const handleTryFeature = () => {
    setFeatureCount(featureCount + 1);
    alert(`You've tried the feature ${featureCount + 1} time(s)!`);
  };

  // eslint-disable-next-line no-unused-vars
  const handleLearnMore = () => {
    alert('Learn more about this amazing feature!');
  };

  // Solution Responsible functions
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
      alert('Please fill all required fields');
      return;
    }
    
    if (solEditMode) {
      // Update existing solution
      setSolutionResponsibleData(prev => prev.map(item => 
        item.id === solEditId 
          ? { ...item, ...solutionFormData }
          : item
      ));
      setSolEditMode(false);
      setSolEditId(null);
    } else {
      // Add new solution
      const newSolution = {
        id: Date.now(),
        ...solutionFormData,
        createdBy: 'currentUser',
        createdDtm: new Date().toLocaleString()
      };
      setSolutionResponsibleData(prev => [...prev, newSolution]);
    }
    
    // Reset form
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
    setSolEditId(null);
  };

  const handleSolutionEdit = (item) => {
    setSolutionFormData({
      employee: item.employee,
      solutionType: item.solutionType,
      solution: item.solution
    });
    setSolEditMode(true);
    setSolEditId(item.id);
  };

  const handleSolutionDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this solution?')) {
      setSolutionResponsibleData(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div style={styles.page}>
          <video autoPlay loop muted style={styles.videoBackground}>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={styles.gradientOverlay}></div>
      <Navbar />
      <div className="config-container" style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <header className="config-header" style={{
          marginTop: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <h1><span className="icon">⚙️</span> Configuration Module</h1>
          <p className="subtitle" style={{ color: 'black', fontWeight: '400', marginTop: '0.5rem' }}>Manage system settings and lookup values</p>
        </header>

        <div className="config-tabs" style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '0.5rem',
          padding: '1rem 0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(16, 5, 80, 0.28)',
          backdropFilter: 'blur(5px)',
          borderRadius: '12px',
          margin: '1rem 0 2rem 0',
          width: '100%'
        }}>
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                cancelEdit();
              }}
              style={{
                padding: '0.6rem 0.8rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: '1',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                background: activeCategory === key 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                  : 'rgba(255, 255, 255, 0.8)',
                color: activeCategory === key ? 'white' : '#374151',
                boxShadow: activeCategory === key 
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transform: activeCategory === key ? 'translateY(-2px)' : 'translateY(0)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <span style={{ 
                fontSize: '1rem',
                filter: activeCategory === key ? 'brightness(1.2)' : 'none'
              }}>
                {categoryIcons[key]}
              </span>
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
              <form onSubmit={handleOrgSubmit} className="contact-form" style={{
                background: 'transparent',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.3)',
                marginBottom: '2rem'
              }}>
                <div className="form-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div className="form-group">
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}>Organization </label>
                    <select
                      name="organization"
                      value={orgFormData.organization}
                      onChange={handleOrgInputChange}
                      required
                      style={{
                        padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                        width: '100%',
                        outline: 'none',
                        cursor: 'pointer',
                        color: '#374151',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none'
                      }}
                    >
                      <option value="">Select Organization</option>
                      {organizations.map(org => (
                        <option key={org} value={org}>{org}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}>Title</label>
                    <select
                      name="title"
                      value={orgFormData.title}
                      onChange={handleOrgInputChange}
                      style={{
                        padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                        width: '100%',
                        outline: 'none',
                        cursor: 'pointer',
                        color: '#374151',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none'
                      }}
                    >
                      <option value="">Select Title</option>
                      {titles.map(title => (
                        <option key={title} value={title}>{title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}>Contact Person Name </label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={orgFormData.contactPersonName}
                      onChange={handleOrgInputChange}
                      placeholder="Enter contact name"
                      required
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        width: '100%',
                        outline: 'none',
                        color: '#374151'
                      }}
                    />
                  </div>
                </div>
                
                <div className="form-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem',
                  marginTop: '0.75rem'
                }}>
                  <div className="form-group">
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}>Email </label>
                    <input
                      type="email"
                      name="email"
                      value={orgFormData.email}
                      onChange={handleOrgInputChange}
                      placeholder="Enter email address"
                      required
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        width: '100%',
                        outline: 'none',
                        color: '#374151'
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}>Mobile No</label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={orgFormData.mobileNo}
                      onChange={handleOrgInputChange}
                      placeholder="Enter mobile number"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        width: '100%',
                        outline: 'none',
                        color: '#374151'
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}>Office No</label>
                    <input
                      type="text"
                      name="officeNo"
                      value={orgFormData.officeNo}
                      onChange={handleOrgInputChange}
                      placeholder="Enter office number"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        width: '100%',
                        outline: 'none',
                        color: '#374151'
                      }}
                    />
                  </div>
                </div>
                
                <div className="form-actions" style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'flex-end', 
                  marginTop: '1.5rem',
                  flexWrap: 'nowrap',
                  alignItems: 'center'
                }}>
                  <button 
                    type="button" 
                    onClick={handleOrgReset}
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#6b7280',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Reset
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#3b82f6',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {orgEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Data Table */}
              <div className="contacts-table-section">
                <h3>Contact Persons List</h3>
                <div className="table-container" style={{
                  overflowX: 'auto',
                  border: '1px solid rgba(226, 232, 240, 0.6)',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Organization</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Name</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created by</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created by name</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created dtm</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgContacts.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{
                            padding: '2rem',
                            textAlign: 'center',
                            color: '#6b7280',
                            fontStyle: 'italic'
                          }}>No contacts found</td>
                        </tr>
                      ) : (
                        orgContacts.map(contact => (
                          <tr key={contact.id} style={{
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <td style={{ padding: '0.75rem' }}>{contact.organization}</td>
                            <td style={{ padding: '0.75rem' }}>{contact.name}</td>
                            <td style={{ padding: '0.75rem' }}>{contact.createdBy}</td>
                            <td style={{ padding: '0.75rem' }}>{contact.createdByName}</td>
                            <td style={{ padding: '0.75rem' }}>{contact.createdDtm}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <button 
                                  onClick={() => handleOrgView(contact)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#10b981',
                                    color: 'white'
                                  }}
                                  title="View"
                                >
                                  View
                                </button>
                                <button 
                                  onClick={() => handleOrgEdit(contact)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#3b82f6',
                                    color: 'white'
                                  }}
                                  title="Update"
                                >
                                  Update
                                </button>
                                <button 
                                  onClick={() => handleOrgDelete(contact.id)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#dc2626',
                                    color: 'white'
                                  }}
                                  title="Delete"
                                >
                                  Delete
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
            </div>
          ) : activeCategory === 'solutionsPerProject' ? (
            <div className="solution-responsible-section">
              <h2>Solution Responsible</h2>
              <p className="section-subtitle">Employees Responsible for Solutions</p>
              
              {/* Input Form */}
              <form onSubmit={handleSolutionSubmit} className="solution-form">
                <div className="form-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div className="form-group">
                    <label>Employee </label>
                    <select
                      name="employee"
                      value={solutionFormData.employee}
                      onChange={handleSolutionInputChange}
                      required
                      style={{
                        padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                        width: '100%',
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
                  
                  <div className="form-group">
                    <label>Solution Type </label>
                    <select
                      name="solutionType"
                      value={solutionFormData.solutionType}
                      onChange={handleSolutionInputChange}
                      required
                      style={{
                        padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                        width: '100%',
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
                  
                  <div className="form-group">
                    <label>Solution </label>
                    <select
                      name="solution"
                      value={solutionFormData.solution}
                      onChange={handleSolutionInputChange}
                      required
                      style={{
                        padding: '0.75rem 2.5rem 0.75rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                        width: '100%',
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
                
                <div className="form-actions" style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'flex-end', 
                  marginTop: '1.5rem',
                  flexWrap: 'nowrap',
                  alignItems: 'center'
                }}>
                  <button 
                    type="button" 
                    onClick={handleSolutionReset} 
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#6b7280',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Reset
                  </button>
                  <button 
                    type="submit" 
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#3b82f6',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {solEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Data Table */}
              <div className="solution-table-section" style={{ marginTop: '2rem' }}>
                <div className="table-container" style={{
                  overflowX: 'auto',
                  border: '1px solid rgba(226, 232, 240, 0.6)',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Employee</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Solution Type</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Solution</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created by</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created dtm</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solutionResponsibleData.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{
                            padding: '2rem',
                            textAlign: 'center',
                            color: '#6b7280',
                            fontStyle: 'italic'
                          }}>No solutions found</td>
                        </tr>
                      ) : (
                        solutionResponsibleData.map(item => (
                          <tr key={item.id} style={{
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <td style={{ padding: '0.75rem' }}>{item.employee}</td>
                            <td style={{ padding: '0.75rem' }}>{item.solutionType}</td>
                            <td style={{ padding: '0.75rem' }}>{item.solution}</td>
                            <td style={{ padding: '0.75rem' }}>{item.createdBy}</td>
                            <td style={{ padding: '0.75rem' }}>{item.createdDtm}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <button 
                                  onClick={() => handleSolutionEdit(item)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#3b82f6',
                                    color: 'white'
                                  }}
                                  title="Update"
                                >
                                  Update
                                </button>
                                <button 
                                  onClick={() => handleSolutionDelete(item.id)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#dc2626',
                                    color: 'white'
                                  }}
                                  title="Delete"
                                >
                                  Delete
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
            </div>
          ) : activeCategory === 'newFeature' ? (
            <div className="operation-availability-section">
              <h2>Operation Availability</h2>
              <p className="section-subtitle">Manage System Operation Availability Settings</p>
              
              {/* Input Form */}
              <form onSubmit={handleOperationSubmit} className="operation-form" style={{
                background: 'rgba(248, 250, 252, 0.8)',
                backdropFilter: 'blur(5px)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                marginBottom: '2rem'
              }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem'
                    }}>Operation Availability *</label>
                    <input
                      type="text"
                      value={operationAvailability}
                      onChange={(e) => setOperationAvailability(e.target.value)}
                      placeholder="Enter operation availability details"
                      required
                      style={{
                        padding: '0.75rem',
                        border: '1px solid rgba(209, 213, 219, 0.6)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(5px)',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
                
                <div className="form-actions" style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'flex-end',
                  flexWrap: 'nowrap',
                  alignItems: 'center'
                }}>
                  <button 
                    type="button" 
                    onClick={handleOperationReset}
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#6b7280',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Reset
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#3b82f6',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {opEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Data Table */}
              <div className="operation-table-section">
                <h3 style={{
                  color: '#374151',
                  fontSize: '1.25rem',
                  margin: '1.5rem 0 1rem 0'
                }}>Operation Availability List</h3>
                <div className="table-container" style={{
                  overflowX: 'auto',
                  border: '1px solid rgba(226, 232, 240, 0.6)',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Operation Availability</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created By</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Created Time</th>
                        <th style={{
                          padding: '1rem',
                          backgroundColor: '#1e40af',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'left',
                          borderBottom: '1px solid #e5e7eb'
                        }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationData.length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{
                            padding: '2rem',
                            textAlign: 'center',
                            color: '#6b7280',
                            fontStyle: 'italic'
                          }}>No operations found</td>
                        </tr>
                      ) : (
                        operationData.map(operation => (
                          <tr key={operation.id} style={{
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <td style={{ padding: '0.75rem' }}>{operation.operationAvailability}</td>
                            <td style={{ padding: '0.75rem' }}>{operation.createdBy}</td>
                            <td style={{ padding: '0.75rem' }}>{operation.createdTime}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <button 
                                  onClick={() => handleOperationEdit(operation)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#3b82f6',
                                    color: 'white'
                                  }}
                                  title="Update"
                                >
                                  Update
                                </button>
                                <button 
                                  onClick={() => handleOperationDelete(operation.id)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: '#dc2626',
                                    color: 'white'
                                  }}
                                  title="Delete"
                                >
                                  Delete
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
                    style={{
                      padding: '0.5rem 2.5rem 0.5rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: 'white url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 16px',
                      outline: 'none',
                      cursor: 'pointer',
                      color: '#374151',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none'
                    }}
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
                  <button 
                    onClick={handleAdd} 
                    style={{
                      padding: '0.6rem 1.2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#3b82f6',
                      color: 'white',
                      minWidth: '80px',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>+</span> Add
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
                            <div className="edit-actions" style={{
                              display: 'flex',
                              gap: '0.5rem',
                              flexWrap: 'nowrap',
                              alignItems: 'center'
                            }}>
                              <button 
                                onClick={saveEdit} 
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  background: '#10b981',
                                  color: 'white',
                                  minWidth: '60px',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                Save
                              </button>
                              <button 
                                onClick={cancelEdit} 
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  background: '#6b7280',
                                  color: 'white',
                                  minWidth: '60px',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="item-text">{item}</span>
                            <div className="item-actions" style={{
                              display: 'flex',
                              gap: '0.5rem',
                              flexWrap: 'nowrap',
                              alignItems: 'center'
                            }}>
                              <button
                                onClick={() => startEdit(index, item)}
                                title="Edit"
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  background: '#3b82f6',
                                  color: 'white',
                                  minWidth: '60px',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                title="Delete"
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  background: '#dc2626',
                                  color: 'white',
                                  minWidth: '60px',
                                  whiteSpace: 'nowrap'
                                }}
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
