import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
 
import "./ComplaintForm.css";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ComplaintView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComplaint, setEditedComplaint] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Dummy data for dropdowns (should be replaced with API calls)
  const organizations = ["SLT", "Mobitel", "ABC Pvt Ltd", "Other"];
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
  const solutions = ["Pending", "In Progress", "Resolved", "Escalated"];
  const mediums = ["Hotline", "Email", "WhatsApp", "SMS", "Walk-in"];
  const mediumSources = ["Customer", "Field Ops", "Retail", "Corporate"];
  const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
  const mainAssignments = ["Field Visit", "Remote Fix", "Call Back", "Escalate L2"];
  const subAssignments = ["Fiber Team", "Billing Team", "Tech Support"];

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetch(`http://localhost:44354/api/complaints/${id}`);
        const result = await response.json();
        
        if (response.ok && result.success) {
          setComplaint(result.data);
          setEditedComplaint(result.data);
        } else {
          setError(result.message || "Failed to fetch complaint");
        }
      } catch (err) {
        setError("Error fetching complaint: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchComplaint();
    }
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateSuccess(false);
  };

  const handleInputChange = (field, value) => {
    setEditedComplaint(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:44354/api/complaints/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedComplaint),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setComplaint(result.data);
        setIsEditing(false);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        setError(result.message || "Failed to update complaint");
      }
    } catch (err) {
      setError("Error updating complaint: " + err.message);
    }
  };

  const handleCancel = () => {
    setEditedComplaint(complaint);
    setIsEditing(false);
    setUpdateSuccess(false);
  };

  if (loading) {
    return (
      <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          
        </video>

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
          zIndex: -1,
        }}></div>
        
        <Navbar />

        <div className="content-wrapper" style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading complaint details...</p>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          
        </video>

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
          zIndex: -1,
        }}></div>
        
        <Navbar />

        <div className="content-wrapper" style={{ padding: "2rem", textAlign: "center" }}>
          <p>Error: {error}</p>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          
        </video>

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
          zIndex: -1,
        }}></div>
        
        <Navbar />

        <div className="content-wrapper" style={{ padding: "2rem", textAlign: "center" }}>
          <p>No complaint found.</p>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        
      </video>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
        zIndex: -1,
      }}></div>
      
      <Navbar />

      <div className="content-wrapper">
        {/* Modern Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '15px 0'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            margin: '0 0 8px 0',
            fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', sans-serif",
            background: 'linear-gradient(90deg, #1e40af, #3b82f6, #000000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Complaint Details
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            margin: 0,
            fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
            fontWeight: 400
          }}>
            View and manage complaint information
          </p>
        </div>
        
        {/* Success Message */}
        {updateSuccess && (
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}>
            <p style={{ margin: 0, fontWeight: '600' }}>✅ Complaint updated successfully!</p>
          </div>
        )}
        
        <div className="config-content">
          {!isEditing ? (
            // View Mode
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginBottom: '20px' 
              }}>
                <button 
                  onClick={handleEditToggle}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.2)';
                  }}
                >
                  Edit Complaint
                </button>
              </div>
              
              <div className="grid grid-2">
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Request Reference</label>
                  <div className="view-field">{complaint.requestRef}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Category Type</label>
                  <div className="view-field">{complaint.categoryType}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Organization</label>
                  <div className="view-field">{complaint.organization}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Solution Type</label>
                  <div className="view-field">{complaint.solutionType || 'N/A'}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Solution Name</label>
                  <div className="view-field">{complaint.solutionName || 'N/A'}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Medium</label>
                  <div className="view-field">{complaint.medium}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Medium Source</label>
                  <div className="view-field">{complaint.mediumSource}</div>
                </div>
                
                <div className="field full">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Complaint</label>
                  <div className="view-field" style={{ minHeight: '100px', display: 'flex', alignItems: 'center' }}>
                    {complaint.complaint}
                  </div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Contact Name</label>
                  <div className="view-field">{complaint.contactName}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Email</label>
                  <div className="view-field">{complaint.email || 'N/A'}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Mobile</label>
                  <div className="view-field">{complaint.mobile}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Office Mobile</label>
                  <div className="view-field">{complaint.officeMobile || 'N/A'}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Title</label>
                  <div className="view-field">{complaint.title}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Assignment</label>
                  <div className="view-field">{complaint.assignment || 'N/A'}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Document Reference</label>
                  <div className="view-field">{complaint.docRef || 'N/A'}</div>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Document Subject</label>
                  <div className="view-field">{complaint.docSubject || 'N/A'}</div>
                </div>
                
                <div className="field full">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Remarks</label>
                  <div className="view-field" style={{ minHeight: '80px', display: 'flex', alignItems: 'center' }}>
                    {complaint.remarks || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleUpdate}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginBottom: '20px',
                gap: '10px'
              }}>
                <button 
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f1f5f9',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#e2e8f0';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f1f5f9';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.2)';
                  }}
                >
                  Save Changes
                </button>
              </div>
              
              <div className="grid grid-2">
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Request Reference</label>
                  <input
                    className="input"
                    value={editedComplaint.requestRef || ''}
                    onChange={(e) => handleInputChange('requestRef', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Category Type</label>
                  <select
                    className="input"
                    value={editedComplaint.categoryType || ''}
                    onChange={(e) => handleInputChange('categoryType', e.target.value)}
                  >
                    <option value="">Select…</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Organization</label>
                  <select
                    className="input"
                    value={editedComplaint.organization || ''}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                  >
                    <option value="">Select…</option>
                    {organizations.map((org) => (
                      <option key={org} value={org}>{org}</option>
                    ))}
                  </select>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Solution Type</label>
                  <input
                    className="input"
                    value={editedComplaint.solutionType || ''}
                    onChange={(e) => handleInputChange('solutionType', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Solution Name</label>
                  <input
                    className="input"
                    value={editedComplaint.solutionName || ''}
                    onChange={(e) => handleInputChange('solutionName', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Medium</label>
                  <select
                    className="input"
                    value={editedComplaint.medium || ''}
                    onChange={(e) => handleInputChange('medium', e.target.value)}
                  >
                    <option value="">Select…</option>
                    {mediums.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Medium Source</label>
                  <select
                    className="input"
                    value={editedComplaint.mediumSource || ''}
                    onChange={(e) => handleInputChange('mediumSource', e.target.value)}
                  >
                    <option value="">Select…</option>
                    {mediumSources.map((ms) => (
                      <option key={ms} value={ms}>{ms}</option>
                    ))}
                  </select>
                </div>
                
                <div className="field full">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Complaint</label>
                  <textarea
                    className="input textarea"
                    rows={4}
                    value={editedComplaint.complaint || ''}
                    onChange={(e) => handleInputChange('complaint', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Contact Name</label>
                  <input
                    className="input"
                    value={editedComplaint.contactName || ''}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Email</label>
                  <input
                    className="input"
                    type="email"
                    value={editedComplaint.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Mobile</label>
                  <input
                    className="input"
                    type="tel"
                    value={editedComplaint.mobile || ''}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Office Mobile</label>
                  <input
                    className="input"
                    type="tel"
                    value={editedComplaint.officeMobile || ''}
                    onChange={(e) => handleInputChange('officeMobile', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Title</label>
                  <select
                    className="input"
                    value={editedComplaint.title || 'Mr.'}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  >
                    {titles.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Assignment</label>
                  <input
                    className="input"
                    value={editedComplaint.assignment || ''}
                    onChange={(e) => handleInputChange('assignment', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Document Reference</label>
                  <input
                    className="input"
                    value={editedComplaint.docRef || ''}
                    onChange={(e) => handleInputChange('docRef', e.target.value)}
                  />
                </div>
                
                <div className="field">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Document Subject</label>
                  <input
                    className="input"
                    value={editedComplaint.docSubject || ''}
                    onChange={(e) => handleInputChange('docSubject', e.target.value)}
                  />
                </div>
                
                <div className="field full">
                  <label className="label" style={{ fontWeight: 600, color: '#0f172a' }}>Remarks</label>
                  <textarea
                    className="input textarea"
                    rows={3}
                    value={editedComplaint.remarks || ''}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ComplaintView;