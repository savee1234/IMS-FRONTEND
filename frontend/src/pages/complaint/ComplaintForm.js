// ComplaintOnboarding.jsx
// Drop this file into your React app (e.g., src/pages/ComplaintOnboarding.jsx)
// Then import and render <ComplaintOnboarding />
// -------------------------------------------------
import React, { useState, useEffect } from "react";
 
import "./ComplaintForm.css";
import ContactPersonSelect from "../../components/ContactPersonSelect";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";


// Add font link for modern fonts
const addFontLink = () => {
  if (!document.getElementById('complaint-form-fonts')) {
    const link = document.createElement('link');
    link.id = 'complaint-form-fonts';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

addFontLink();

export default function ComplaintOnboarding() {
  
  // Add state for tab navigation
  const [activeTab, setActiveTab] = useState(0);
  
  // ------- Dummy data (replace with real API data) --------
  // const organizations = ["SLT", "Mobitel", "ABC Pvt Ltd", "Other"]; // Removed hardcoded data
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
  // Removed hardcoded solutions - will fetch from API
  const mediums = ["Hotline", "Email", "WhatsApp", "SMS", "Walk-in"];
  const mediumSources = ["Customer", "Field Ops", "Retail", "Corporate"];

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('http://localhost:44354/api/user-management');
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();

        // API might return { success: true, data: [...] } or an array directly
        const raw = Array.isArray(data) ? data : (data.data || []);

        // Map API users to staff shape. Availability should be empty as requested.
        const mapped = raw.map(u => ({
          empNo: u.userId,
          name: u.userName,
          designation: u.Designation,
          availability: 'office'
        }));

        setStaff(mapped);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
      }
    };

    fetchStaff();
  }, []);

  // ------- Form state --------
  const [form, setForm] = useState({
    requestRef: "",
    categoryType: "",
    organization: "",
    solutionType: "",
    solutionName: "",
    medium: "",
    mediumSource: "",
    complaint: "",

    // contact
    searchMobile: "",
    contactName: "",
    email: "",
    mobile: "",
    officeMobile: "",
    title: "Mr.",

    // organization contact person reference
    organizationContactPersonId: "",

    // assignment
    assignment: "",
    docRef: "",
    docSubject: "",
    remarks: ""
  });
  
  // New state for solution types and solutions
  const [solutionTypes, setSolutionTypes] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [loadingSolutionData, setLoadingSolutionData] = useState(false);
  const [generatedRef, setGeneratedRef] = useState("");

  // Function to generate reference number in format YY-MM-DD-XXXX
  const generateReferenceNumber = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month with leading zero
    const day = now.getDate().toString().padStart(2, '0'); // Day with leading zero
    
    // For now, we'll use a simple counter. In a real system, you might want to fetch the last number from the database
    const sequence = Math.floor(Math.random() * 9999) + 1; // Random number between 1-9999
    const sequenceStr = sequence.toString().padStart(4, '0'); // Pad to 4 digits
    
    return `${year}-${month}-${day}-${sequenceStr}`;
  };

  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchResult, setSearchResult] = useState(null); // null, 'found', or 'not_found'
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [newContactData, setNewContactData] = useState({
    name: "",
    email: "",
    organization: "",
    title: "Mr."
  });

  const [organizationContactPersons, setOrganizationContactPersons] = useState([]);
  const [selectedContactPerson, setSelectedContactPerson] = useState("");
  const [loadingContactPersons, setLoadingContactPersons] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(false);

  // State for staff assignments (each row has independent selection)
  const [staffAssignments, setStaffAssignments] = useState({});

  // Generate reference number when component mounts
  useEffect(() => {
    const refNumber = generateReferenceNumber();
    setGeneratedRef(refNumber);
    update("requestRef", refNumber);
  }, []);


  // Fetch organizations for dropdown
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrganizations(true);
      try {
        const response = await fetch('http://localhost:44354/api/organizations');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrganizations(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoadingOrganizations(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Fetch organization contact persons for dropdown
  useEffect(() => {
    const fetchOrganizationContactPersons = async () => {
      setLoadingContactPersons(true);
      try {
        const response = await fetch('http://localhost:44354/api/organization-contact-persons');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrganizationContactPersons(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching organization contact persons:', error);
      } finally {
        setLoadingContactPersons(false);
      }
    };

    fetchOrganizationContactPersons();
  }, []);

  // Fetch solution types and solutions from API
  useEffect(() => {
    const fetchSolutionData = async () => {
      setLoadingSolutionData(true);
      try {
        const response = await fetch('http://localhost:44354/api/solution-projects');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Extract unique solution types and solutions from the data
            const uniqueSolutionTypes = [...new Set(data.data.map(item => item.solutionType))];
            
            setSolutionTypes(uniqueSolutionTypes);
          } else {
            console.error('API returned error:', data.message);
          }
        } else {
          console.error('HTTP error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Network error fetching solution data:', error);
      } finally {
        setLoadingSolutionData(false);
      }
    };

    fetchSolutionData();
  }, []);
  
  // Filter solutions based on selected solution type
  useEffect(() => {
    if (form.solutionType) {
      // Fetch solutions specific to the selected solution type
      const fetchSolutionsForType = async () => {
        try {
          const response = await fetch(`http://localhost:44354/api/solution-projects?solutionType=${encodeURIComponent(form.solutionType)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Extract unique solutions for the selected solution type
              const solutionsForType = [...new Set(data.data.map(item => item.solution))];
              setFilteredSolutions(solutionsForType);
            } else {
              console.error('API returned error:', data.message);
              setFilteredSolutions([]);
            }
          } else {
            console.error('HTTP error:', response.status, response.statusText);
            setFilteredSolutions([]);
          }
        } catch (error) {
          console.error('Network error fetching solutions for type:', error);
          setFilteredSolutions([]);
        }
      };
      
      fetchSolutionsForType();
    } else {
      setFilteredSolutions([]);
    }
  }, [form.solutionType]);

  // ------- Handlers --------
  const update = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    
    // Reset solutionName when solutionType changes
    if (key === 'solutionType') {
      setForm((f) => ({ ...f, solutionName: '' }));
    }
  };

  const handleContactSelect = (contact) => {
    if (contact) {
      setSelectedContactPerson(contact);
      update("organizationContactPersonId", contact._id);
      update("contactName", contact.name);
      update("email", contact.email);
      update("mobile", contact.mobileNumber);
      update("officeMobile", contact.officeContactNumber);
      update("title", contact.title || "Mr.");
      setNotFoundMsg("");
    } else {
      setSelectedContactPerson(null);
      update("organizationContactPersonId", "");
      update("contactName", "");
      update("email", "");
      update("mobile", "");
      update("officeMobile", "");
      update("title", "Mr.");
      setNotFoundMsg("");
    }
  };

  const updateStaffAssignment = (empNo, assignment) => {
    setStaffAssignments(prev => {
      const next = { ...prev };

      if (assignment === 'Main Assignment') {
        // When one emp is set to Main, set every other staff to Sub Assignment
        // This ensures other assignment selects are filled as 'Sub Assignment'.
        // Use the `staff` array so we initialize values for all rows consistently.
        staff.forEach(s => {
          if (s.empNo === empNo) {
            next[s.empNo] = 'Main Assignment';
          } else {
            next[s.empNo] = 'Sub Assignment';
          }
        });
      } else if (assignment === 'Sub Assignment' || assignment === '') {
        // Normal behavior for setting a specific row
        next[empNo] = assignment;
      } else {
        next[empNo] = assignment;
      }

      return next;
    });
  };

 

  const onReset = () => {
    // Generate new reference number on reset
    const newRefNumber = generateReferenceNumber();
    
    setForm({
      requestRef: newRefNumber,
      categoryType: "",
      organization: "",
      solutionType: "",
      solutionName: "",
      medium: "",
      mediumSource: "",
      complaint: "",
      searchMobile: "",
      contactName: "",
      email: "",
      mobile: "",
      officeMobile: "",
      title: "Mr.",
      organizationContactPersonId: "",
      assignment: "",
      docRef: "",
      docSubject: "",
      remarks: ""
    });
    setNotFoundMsg("");
    setGeneratedRef(newRefNumber);
    setSubmitted(false);
    setSearchResult(null);
    setShowAddDetails(false);
    setSelectedContactPerson("");
    setNewContactData({
      name: "",
      email: "",
      organization: "",
      title: "Mr."
    });
    setStaffAssignments({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.categoryType || !form.complaint) {
      alert("Please fill in all required fields (Category Type and Complaint).");
      return;
    }

    // Additional validation for other required fields
    if (!form.organization) {
      alert("Please select an organization.");
      return;
    }

    if (!form.medium) {
      alert("Please select a medium.");
      return;
    }

    if (!form.mediumSource) {
      alert("Please select a medium source.");
      return;
    }

    // solutionName is required but only if solutionType is selected
    if (form.solutionType && !form.solutionName) {
      alert("Please select a solution name.");
      return;
    }

    try {
      // If contact not found, create new contact first
      if (searchResult === 'not_found' && newContactData.name && newContactData.email) {
        const createResponse = await fetch('http://localhost:44354/api/organization-contact-persons/search-or-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobileNumber: form.mobile,
            contactData: {
              name: newContactData.name,
              email: newContactData.email,
              organization: newContactData.organization,
              title: newContactData.title,
              officeMobile: form.officeMobile
            },
            organizationId: null,
            createdBy: 'complaint_system',
            createdByName: 'Complaint Management System'
          })
        });

        if (createResponse.ok) {
          const createData = await createResponse.json();
          if (createData.success && createData.data) {
            // Update form with the created contact details
            update("contactName", createData.data.name);
            update("email", createData.data.email);
            update("mobile", createData.data.mobileNumber);
            update("officeMobile", createData.data.officeContactNumber);
            update("title", createData.data.title);
            update("organizationContactPersonId", createData.data._id || "");

            // Refresh the organization contact persons list to show the new contact
            const refreshResponse = await fetch('http://localhost:44354/api/organization-contact-persons');
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              if (refreshData.success) {
                setOrganizationContactPersons(refreshData.data);
              }
            }

            alert(`✅ New contact "${createData.data.name}" created and linked to complaint!`);
          }
        } else {
          const errorData = await createResponse.json().catch(() => ({}));
          console.error('Failed to create contact:', errorData);
          alert(`❌ Failed to create contact: ${errorData.message || 'Unknown error'}`);
          return;
        }
      }

      // Submit complaint - prepare clean submission data
      const submissionData = { ...form };
      console.log('Submitting complaint data:', JSON.stringify(submissionData, null, 2));

      // Remove empty fields that might cause issues
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === "" || submissionData[key] === null || submissionData[key] === undefined) {
          delete submissionData[key];
        }
      });

      // Ensure solutionName is not required if solutionType is not selected
      if (!submissionData.solutionType) {
        delete submissionData.solutionName;
      }

      console.log('Cleaned submission data:', JSON.stringify(submissionData, null, 2));

      const response = await fetch("http://localhost:44354/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok?', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Submission failed: ${response.status} - ${errorText}`);
      }

      const savedComplaint = await response.json();
      console.log('Saved complaint response:', savedComplaint);
      
      setSubmitted(true);
      // Use the reference number from the backend response, or fall back to the generated one
      const finalRef = savedComplaint.data.requestRef || form.requestRef;
      setGeneratedRef(finalRef);
      alert(`✅ Complaint submitted successfully! Reference: ${finalRef}`);

    } catch (error) {
      console.error('Submission error:', error);
      alert(`❌ Error submitting complaint: ${error.message}`);
    }
  };

  // Function to go to next tab
  const nextTab = () => {
    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  // Function to go to previous tab
  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const tabs = [
    { name: 'Request Details' },
    { name: 'Contact Person' },
    { name: 'Assignment' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Poppins', 'Segoe UI', 'Roboto', sans-serif" }}>
      <Sidebar />
      <div className="complaint-main-content" style={{ 
        background: '#f3f4f6', // Light gray background matching image
        minHeight: '100vh',
        width: '100%'
      }}>
        <div className="cf-wrapper" style={{ maxWidth: '98%', margin: '0 auto', padding: '0.5rem' }}>
          
          {/* Horizontal Stepper */}
          <div className="wizard-stepper" style={{ marginBottom: '1rem' }}>
            {tabs.map((tab, index) => (
              <div 
                key={index} 
                className={`wizard-step ${index === activeTab ? 'active' : ''}`}
                style={{ 
                  flex: 1, 
                  textAlign: 'center', 
                  padding: '1rem', 
                  cursor: 'pointer',
                  borderBottom: index === activeTab ? '3px solid #2563eb' : '3px solid transparent',
                  fontWeight: index === activeTab ? '600' : '400',
                  color: index === activeTab ? '#2563eb' : '#64748b'
                }}
                onClick={() => setActiveTab(index)}
              >
                {index + 1}. {tab.name}
              </div>
            ))}
          </div>

          <form className="cf-container" onSubmit={onSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {submitted && generatedRef && (
              <div className="cf-success" style={{ marginBottom: '1rem', padding: '1rem', background: '#ecfdf5', color: '#065f46', borderRadius: '6px' }}>
                <div className="cf-success-text">Reference: {generatedRef}</div>
              </div>
            )}

            <div className="cf-header" style={{ marginBottom: '1rem' }}>
              <h1 className="cf-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{tabs[activeTab].name}</h1>
              <p className="cf-subtitle" style={{ color: '#64748b' }}>Please fill in the details below.</p>
            </div>

            {activeTab === 0 && (
              <div>
                <div className="redesign-form-grid">
                  <Field label="Request Reference">
                    <input className="input" value={form.requestRef} readOnly style={{ background: '#f1f5f9' }} />
                  </Field>
                  <Field label="Category Type">
                    <select className="input" value={form.categoryType} onChange={(e) => update('categoryType', e.target.value)}>
                      <option value="">Select Category</option>
                      {categories.map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </Field>
                  <Field label="Organization">
                    <select className="input" value={form.organization} onChange={(e) => update('organization', e.target.value)}>
                      <option value="">Select Organization</option>
                      {loadingOrganizations ? (
                        <option disabled>Loading organizations...</option>
                      ) : (
                        organizations.map(org => (<option key={org._id} value={org.organization}>{org.organization}</option>))
                      )}
                    </select>
                  </Field>
                  <Field label="Solution Type">
                    <select className="input" value={form.solutionType} onChange={(e) => update('solutionType', e.target.value)} disabled={loadingSolutionData}>
                      <option value="">Select Solution Type</option>
                      {solutionTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </Field>
                  <Field label="Solution Name">
                    <select className="input" value={form.solutionName} onChange={(e) => update('solutionName', e.target.value)} disabled={!form.solutionType || loadingSolutionData}>
                      <option value="">Select Solution</option>
                      {filteredSolutions.map(s => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </Field>
                  <Field label="Medium">
                    <select className="input" value={form.medium} onChange={(e) => update('medium', e.target.value)}>
                      <option value="">Select Medium</option>
                      {mediums.map(m => (<option key={m} value={m}>{m}</option>))}
                    </select>
                  </Field>
                  <Field label="Medium Source">
                    <select className="input" value={form.mediumSource} onChange={(e) => update('mediumSource', e.target.value)}>
                      <option value="">Select Source</option>
                      {mediumSources.map(m => (<option key={m} value={m}>{m}</option>))}
                    </select>
                  </Field>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Complaint">
                      <textarea className="input textarea" rows={4} value={form.complaint} onChange={(e) => update('complaint', e.target.value)} />
                    </Field>
                  </div>
                </div>
                <div className="cf-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="redesign-btn-next" onClick={nextTab}>Next Step</button>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <div className="search-wrapper" style={{ marginBottom: '2rem' }}>
                  <label className="search-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Search Contact Person</label>
                  <ContactPersonSelect contacts={organizationContactPersons} onSelect={handleContactSelect} isLoading={loadingContactPersons} selectedPerson={selectedContactPerson} placeholder="Search by name or mobile number" />
                </div>
                
                {notFoundMsg && (<div className="alert-message error" style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '1rem' }}>{notFoundMsg}</div>)}

                {searchResult === 'found' && (
                  <div className="info-card success" style={{ padding: '1rem', background: '#ecfdf5', color: '#065f46', borderRadius: '6px', marginBottom: '1rem' }}>
                    <div className="info-card-title"><strong>Contact:</strong> {form.contactName} ({form.mobile})</div>
                  </div>
                )}
                
                {searchResult === 'not_found' && (
                  <div className="info-card warning" style={{ padding: '1rem', background: '#fffbeb', color: '#b45309', borderRadius: '6px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="info-card-title">Contact not found.</div>
                    <button type="button" onClick={() => { setShowAddDetails(true); setSearchResult(null); }} style={{ padding: '0.5rem 1rem', background: '#b45309', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Details</button>
                  </div>
                )}

                {showAddDetails && (
                  <div className="cf-card" style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>New Contact Details</h3>
                    <div className="redesign-form-grid">
                      <Field label="Contact Name"><input className="input" value={newContactData.name} onChange={(e) => { const v = e.target.value; setNewContactData({ ...newContactData, name: v }); update('contactName', v); }} /></Field>
                      <Field label="Email"><input className="input" value={newContactData.email} type="email" onChange={(e) => { const v = e.target.value; setNewContactData({ ...newContactData, email: v }); update('email', v); }} /></Field>
                      <Field label="Organization"><select className="input" value={newContactData.organization} onChange={(e) => setNewContactData({ ...newContactData, organization: e.target.value })}>{loadingOrganizations ? (<option disabled>Loading organizations...</option>) : organizations.map(org => (<option key={org._id} value={org.organization}>{org.organization}</option>))}</select></Field>
                      <Field label="Title"><select className="input" value={newContactData.title} onChange={(e) => { const v = e.target.value; setNewContactData({ ...newContactData, title: v }); update('title', v); }}><option value="Mr.">Mr.</option><option value="Mrs.">Mrs.</option><option value="Ms.">Ms.</option><option value="Dr.">Dr.</option><option value="Prof.">Prof.</option></select></Field>
                    </div>
                  </div>
                )}

                <div className="redesign-form-grid">
                  <Field label="Contact Person Name"><input className="input" value={form.contactName} onChange={(e) => update('contactName', e.target.value)} /></Field>
                  <Field label="Email"><input className="input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
                  <Field label="Mobile No"><input className="input" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} /></Field>
                  <Field label="Office Mobile No"><input className="input" value={form.officeMobile} onChange={(e) => { const v = e.target.value; update('officeMobile', v); if (searchResult === 'not_found') setNewContactData({ ...newContactData, officeMobile: v }); }} /></Field>
                  <Field label="Title"><select className="input" value={form.title} onChange={(e) => update('title', e.target.value)}><option value="Mr.">Mr.</option><option value="Mrs.">Mrs.</option><option value="Ms.">Ms.</option><option value="Dr.">Dr.</option><option value="Prof.">Prof.</option></select></Field>
                </div>
                
                <div className="cf-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={prevTab} style={{ flex: 1, padding: '1rem', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}>Back</button>
                  <button type="button" className="redesign-btn-next" onClick={nextTab} style={{ flex: 2 }}>Next Step</button>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <div className="table-container" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
                  <table className="modern-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Emp No</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Designation</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Availability</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Assignment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map(s => (
                        <tr key={s.empNo} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '1rem' }}>{s.empNo}</td>
                          <td style={{ padding: '1rem' }}>{s.name}</td>
                          <td style={{ padding: '1rem' }}>{s.designation}</td>
                          <td style={{ padding: '1rem' }}><span className={`availability-badge ${s.availability.toLowerCase()}`} style={{ padding: '0.25rem 0.5rem', borderRadius: '9999px', background: '#ecfdf5', color: '#059669', fontSize: '0.875rem' }}>{s.availability}</span></td>
                          <td style={{ padding: '1rem' }}>
                            <select className="input input-sm" value={staffAssignments[s.empNo] || ''} onChange={(e) => updateStaffAssignment(s.empNo, e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                              <option value="">Select Assignment</option>
                              <option value="Main Assignment">Main Assignment</option>
                              <option value="Sub Assignment">Sub Assignment</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="redesign-form-grid">
                  <Field label="Document Reference">
                    <div className="input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          className="input"
                          value={form.docRef}
                          onChange={(e) => update('docRef', e.target.value)}
                          style={{ flex: 1 }}
                        />
                      <label className="btn-upload" style={{ padding: '0.5rem 1rem', background: '#e2e8f0', cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                        <input type="file" onChange={() => {}} style={{ display: 'none' }} />
                        Upload
                      </label>
                    </div>
                  </Field>
                  <Field label="Document Subject">
                    <input
                      className="input"
                      value={form.docSubject}
                      onChange={(e) => update('docSubject', e.target.value)}
                    />
                  </Field>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Remarks">
                      <textarea
                        className="input textarea"
                        rows={3}
                        value={form.remarks}
                        onChange={(e) => update('remarks', e.target.value)}
                      />
                    </Field>
                  </div>
                </div>
                
                <div className="cf-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={prevTab} style={{ flex: 1, padding: '1rem', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}>Back</button>
                  <button type="button" onClick={onReset} style={{ flex: 1, padding: '1rem', background: '#fff1f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#e11d48' }}>Reset</button>
                  <button type="submit" className="redesign-btn-next" style={{ flex: 2 }}>Submit Complaint</button>
                </div>
              </div>
            )}
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`form-field ${className}`}>
      <label className="field-label">{label}</label>
      <div className="field-control">{children}</div>
    </div>
  );
}
