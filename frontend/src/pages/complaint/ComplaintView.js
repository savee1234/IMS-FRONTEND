import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backgroundVideo from "../../assets/Background.mp4";
import "./ComplaintForm.css";

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
          <source src={backgroundVideo} type="video/mp4" />
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
        
        <div className="content-wrapper" style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading complaint details...</p>
        </div>
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
          <source src={backgroundVideo} type="video/mp4" />
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
        
        <div className="content-wrapper" style={{ padding: "2rem", textAlign: "center" }}>
          <p>Error: {error}</p>
        </div>
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
          <source src={backgroundVideo} type="video/mp4" />
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
        
        <div className="content-wrapper" style={{ padding: "2rem", textAlign: "center" }}>
          <p>Complaint not found</p>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

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
        <source src={backgroundVideo} type="video/mp4" />
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

      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '1rem',
        marginTop: '1rem',
        maxWidth: '1400px',
        margin: '1rem auto 0 auto'
      }}>
        {/* Page Header */}
        <header className="page-header" style={{
          textAlign: 'center',
          marginBottom: '1rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 0.5rem 0',
            textAlign: 'center'
          }}>
            Complaint Details
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: '400'
          }}>
            {isEditing ? "Edit complaint information" : "View complaint information"}
          </p>
        </header>

        <div className="config-content" style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          padding: '2rem'
        }}>
          {/* Success Message */}
          {updateSuccess && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#d1fae5',
              border: '1px solid #10b981',
              borderRadius: '6px',
              marginBottom: '1rem',
              color: '#065f46',
              textAlign: 'center'
            }}>
              Complaint updated successfully!
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginBottom: '1rem'
          }}>
            {isEditing ? (
              <>
                <button 
                  className="btn ghost" 
                  onClick={handleCancel}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '6px'
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn primary" 
                  onClick={handleUpdate}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '6px'
                  }}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                className="btn primary" 
                onClick={handleEditToggle}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  borderRadius: '6px'
                }}
              >
                Edit Complaint
              </button>
            )}
          </div>

          {/* Complaint Information Table */}
          <section className="config-section" style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(248, 250, 252, 0.5)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                📋 Complaint Information
              </h2>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Complaint ID</strong></td>
                    <td>{complaint._id}</td>
                  </tr>
                  <tr>
                    <td><strong>Created At</strong></td>
                    <td>{formatDate(complaint.createdAt)}</td>
                  </tr>
                  <tr>
                    <td><strong>Last Updated</strong></td>
                    <td>{formatDate(complaint.updatedAt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Request Details Table */}
          <section className="config-section" style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(248, 250, 252, 0.5)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                📋 Request Details
              </h2>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Request Reference</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.requestRef || ""}
                          onChange={(e) => handleInputChange("requestRef", e.target.value)}
                          placeholder="REQ-0001"
                        />
                      ) : (
                        complaint.requestRef || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Category Type</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.categoryType || ""}
                          onChange={(e) => handleInputChange("categoryType", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.categoryType || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Organization</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.organization || ""}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {organizations.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.organization || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Solution Name</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.solutionName || ""}
                          onChange={(e) => handleInputChange("solutionName", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {solutions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.solutionName || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Medium</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.medium || ""}
                          onChange={(e) => handleInputChange("medium", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {mediums.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.medium || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Medium Source</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.mediumSource || ""}
                          onChange={(e) => handleInputChange("mediumSource", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {mediumSources.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.mediumSource || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Complaint</strong></td>
                    <td>
                      {isEditing ? (
                        <textarea
                          className="input textarea"
                          rows={4}
                          value={editedComplaint.complaint || ""}
                          onChange={(e) => handleInputChange("complaint", e.target.value)}
                          placeholder="Type the complaint here…"
                        />
                      ) : (
                        <div style={{ whiteSpace: "pre-wrap" }}>
                          {complaint.complaint || "N/A"}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact Person Details Table */}
          <section className="config-section" style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(248, 250, 252, 0.5)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                👤 Contact Person Details
              </h2>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Contact Person Name</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.contactName || ""}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                          placeholder="Full name"
                        />
                      ) : (
                        complaint.contactName || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          type="email"
                          value={editedComplaint.email || ""}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="name@example.com"
                        />
                      ) : (
                        complaint.email || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Mobile No</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.mobile || ""}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          placeholder="07XXXXXXXX"
                        />
                      ) : (
                        complaint.mobile || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Office Mobile No</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.officeMobile || ""}
                          onChange={(e) => handleInputChange("officeMobile", e.target.value)}
                          placeholder="011XXXXXXX"
                        />
                      ) : (
                        complaint.officeMobile || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Title</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.title || "Mr."}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                        >
                          {titles.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.title || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Search Mobile</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.searchMobile || ""}
                          onChange={(e) => handleInputChange("searchMobile", e.target.value)}
                          placeholder="Type here"
                        />
                      ) : (
                        complaint.searchMobile || "N/A"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Assignment Details Table */}
          <section className="config-section" style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(248, 250, 252, 0.5)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                👥 Assignment Details
              </h2>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Main Assignment</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.mainAssignment || ""}
                          onChange={(e) => handleInputChange("mainAssignment", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {mainAssignments.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.mainAssignment || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Sub Assignment</strong></td>
                    <td>
                      {isEditing ? (
                        <select
                          className="input"
                          value={editedComplaint.subAssignment || ""}
                          onChange={(e) => handleInputChange("subAssignment", e.target.value)}
                        >
                          <option value="">Select…</option>
                          {subAssignments.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        complaint.subAssignment || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Document Reference</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.docRef || ""}
                          onChange={(e) => handleInputChange("docRef", e.target.value)}
                          placeholder="DOC-REF"
                        />
                      ) : (
                        complaint.docRef || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Document Subject</strong></td>
                    <td>
                      {isEditing ? (
                        <input
                          className="input"
                          value={editedComplaint.docSubject || ""}
                          onChange={(e) => handleInputChange("docSubject", e.target.value)}
                          placeholder="Subject"
                        />
                      ) : (
                        complaint.docSubject || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Remarks</strong></td>
                    <td>
                      {isEditing ? (
                        <textarea
                          className="input textarea"
                          rows={4}
                          value={editedComplaint.remarks || ""}
                          onChange={(e) => handleInputChange("remarks", e.target.value)}
                          placeholder="Any special notes…"
                        />
                      ) : (
                        <div style={{ whiteSpace: "pre-wrap" }}>
                          {complaint.remarks || "N/A"}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="actions" style={{
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(248, 250, 252, 0.3)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <button 
              className="btn ghost" 
              onClick={() => navigate(-1)}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px'
              }}
            >
              Back
            </button>
            {isEditing ? (
              <>
                <button 
                  className="btn ghost" 
                  onClick={handleCancel}
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '8px'
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn primary" 
                  onClick={handleUpdate}
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '8px'
                  }}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                className="btn primary" 
                onClick={handleEditToggle}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px'
                }}
              >
                Edit Complaint
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintView;