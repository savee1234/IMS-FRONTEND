import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Organizations = () => {
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
      createdByName: 'User One',
      createdDtm: '2024-01-14 14:20:00'
    }
  ]);

  const organizations = ['ABC Ltd', 'XYZ Corp', 'Tech Solutions', 'Global Systems'];
  const titles = ['Manager', 'Director', 'Coordinator', 'Supervisor', 'Executive'];

  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setOrgFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrgSubmit = (e) => {
    e.preventDefault();
    if (!orgFormData.organization || !orgFormData.contactPersonName || !orgFormData.email) {
      alert('Please fill in required fields');
      return;
    }

    const newContact = {
      id: orgContacts.length + 1,
      organization: orgFormData.organization,
      name: orgFormData.contactPersonName,
      createdBy: 'current_user',
      createdByName: 'Current User',
      createdDtm: new Date().toLocaleString()
    };

    setOrgContacts([...orgContacts, newContact]);
    setOrgFormData({
      organization: '',
      title: '',
      mobileNo: '',
      contactPersonName: '',
      email: '',
      officeNo: ''
    });
  };

  const handleDeleteContact = (id) => {
    setOrgContacts(orgContacts.filter(contact => contact.id !== id));
  };

  const handleReset = () => {
    setOrgFormData({
      organization: '',
      title: '',
      mobileNo: '',
      contactPersonName: '',
      email: '',
      officeNo: ''
    });
  };

  const handleView = (contact) => {
    alert(`Viewing contact: ${contact.name} from ${contact.organization}`);
  };

  const handleEdit = (contact) => {
    setOrgFormData({
      organization: contact.organization,
      title: '',
      mobileNo: '',
      contactPersonName: contact.name,
      email: '',
      officeNo: ''
    });
  };

  return (
    <div className="organizations-section" style={{ padding: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#1f2937',
        marginBottom: '2rem',
        textAlign: 'left',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '0.5rem'
      }}>
        Organization Contact Persons
      </h2>
      
      <form onSubmit={handleOrgSubmit} style={{
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '120px'
              }}>Organization</label>
              <select
                name="organization"
                value={orgFormData.organization}
                onChange={handleOrgInputChange}
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
                <option value="">Select Organization</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '120px'
              }}>Title</label>
              <select
                name="title"
                value={orgFormData.title}
                onChange={handleOrgInputChange}
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
                <option value="">Select Title</option>
                {titles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '120px'
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
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
              }}>Contact Person Name</label>
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
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
              }}>Email</label>
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
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                minWidth: '160px'
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
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  width: '250px',
                  outline: 'none',
                  color: '#374151'
                }}
              />
            </div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button type="button" onClick={handleReset} style={{
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
            Submit
          </button>
        </div>
      </form>

      <div className="contacts-table" style={{
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
                Organization
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                color: '#374151'
              }}>
                Name
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
                Created By Name
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                border: '1px solid #d1d5db',
                fontWeight: '600',
                color: '#374151'
              }}>
                Created Dtm
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
            {orgContacts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px solid #d1d5db'
                }}>
                  No organization contacts found
                </td>
              </tr>
            ) : (
              orgContacts.map(contact => (
                <tr key={contact.id}>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.organization}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.name}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.createdBy}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.createdByName}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    color: '#374151'
                  }}>
                    {contact.createdDtm}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleView(contact)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: '1px solid #10b981',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        marginRight: '0.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      title="View"
                    >
                      <FaEye />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(contact)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: '1px solid #f59e0b',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        marginRight: '0.25rem',
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
                      onClick={() => handleDeleteContact(contact.id)}
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

export default Organizations;
