// ComplaintOnboarding.jsx
// Drop this file into your React app (e.g., src/pages/ComplaintOnboarding.jsx)
// Then import and render <ComplaintOnboarding />
// -------------------------------------------------
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css"; // Updated path

export default function ComplaintOnboarding() {
  const navigate = useNavigate();
  
  // ------- Dummy data (replace with real API data) --------
  const organizations = ["SLT", "Mobitel", "ABC Pvt Ltd", "Other"];
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
  const solutions = ["Pending", "In Progress", "Resolved", "Escalated"];
  const mediums = ["Hotline", "Email", "WhatsApp", "SMS", "Walk-in"];
  const mediumSources = ["Customer", "Field Ops", "Retail", "Corporate"];

  const staff = useMemo(
    () => [
      { empNo: "E001", name: "Kumara Perera", designation: "Engineer", availability: "Office" },
      { empNo: "E014", name: "R. Silva", designation: "Technician", availability: "Roster" },
      { empNo: "E023", name: "Anjalika D.", designation: "Coordinator", availability: "None" }
    ],
    []
  );

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

  const [generatedRef, setGeneratedRef] = useState("");

  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const [mobileOptions, setMobileOptions] = useState([]);
  const [loadingMobiles, setLoadingMobiles] = useState(false);
  const [searchResult, setSearchResult] = useState(null); // null, 'found', or 'not_found'
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [searchType, setSearchType] = useState('mobile'); // 'mobile' or 'name'
  const [nameSearch, setNameSearch] = useState('');
  const [newContactData, setNewContactData] = useState({
    name: "",
    email: "",
    organization: "",
    title: "Mr."
  });

  const [organizationContactPersons, setOrganizationContactPersons] = useState([]);
  const [selectedContactPerson, setSelectedContactPerson] = useState("");
  const [loadingContactPersons, setLoadingContactPersons] = useState(false);

  // Fetch mobile numbers for dropdown
  useEffect(() => {
    const fetchMobileNumbers = async () => {
      setLoadingMobiles(true);
      try {
        const response = await fetch('http://localhost:44354/api/organization-contact-persons/dropdown/mobile-numbers');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMobileOptions(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching mobile numbers:', error);
      } finally {
        setLoadingMobiles(false);
      }
    };

    fetchMobileNumbers();
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

  // ------- Handlers --------
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onContactPersonSelect = (contactPersonId) => {
    setSelectedContactPerson(contactPersonId);
    update("organizationContactPersonId", contactPersonId);

    if (contactPersonId) {
      // Find the selected contact person and populate form fields
      const contactPerson = organizationContactPersons.find(cp => cp._id === contactPersonId);
      if (contactPerson) {
        update("contactName", contactPerson.name);
        update("email", contactPerson.email);
        update("mobile", contactPerson.mobileNumber);
        update("officeMobile", contactPerson.officeContactNumber);
        update("title", contactPerson.title);
        update("searchMobile", contactPerson.mobileNumber);

        // Clear search result since we're using existing contact
        setSearchResult(null);
        setNotFoundMsg("");
        setShowAddDetails(false);
      }
    } else {
      // Clear contact fields when no contact person is selected
      update("contactName", "");
      update("email", "");
      update("mobile", "");
      update("officeMobile", "");
      update("title", "Mr.");
      update("searchMobile", "");
    }
  };

  const onSearchContact = async () => {
    const searchValue = searchType === 'mobile' ? form.searchMobile : nameSearch;

    if (!searchValue) {
      setNotFoundMsg(`Please enter a ${searchType === 'mobile' ? 'mobile number' : 'name'} to search.`);
      setSearchResult(null);
      return;
    }

    // Clear previous states
    setNotFoundMsg("");
    setSearchResult(null);
    setShowAddDetails(false);

    try {
      let searchUrl = 'http://localhost:44354/api/organization-contact-persons';
      let searchParams = `?search=${encodeURIComponent(searchValue)}&limit=50`;

      if (searchType === 'mobile') {
        // For mobile search, use the existing search-or-create endpoint
        const response = await fetch('http://localhost:44354/api/organization-contact-persons/search-or-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobileNumber: searchValue,
            contactData: newContactData,
            organizationId: null,
            createdBy: 'complaint_system',
            createdByName: 'Complaint Management System'
          })
        });

        const data = await response.json();

        if (data.success) {
          if (data.found) {
            setSearchResult('found');
            update("contactName", data.data.name);
            update("email", data.data.email);
            update("mobile", data.data.mobileNumber);
            update("officeMobile", data.data.officeContactNumber);
            update("title", data.data.title);
          } else {
            setSearchResult('not_found');
            update("contactName", "");
            update("email", "");
            update("mobile", searchValue);
            update("officeMobile", "");
            update("title", "Mr.");
          }
        } else {
          setNotFoundMsg(data.message || "Error searching contact.");
          setSearchResult('not_found');
        }
      } else {
        // For name search, use the dedicated name search endpoint
        const nameResponse = await fetch(`http://localhost:44354/api/organization-contact-persons/search-by-name?name=${encodeURIComponent(searchValue)}&limit=20`);
        const nameData = await nameResponse.json();

        if (nameData.success && nameData.data.length > 0) {
          // If multiple results found, show the first one or handle selection
          const contact = nameData.data[0];
          setSearchResult('found');
          update("contactName", contact.name);
          update("email", contact.email);
          update("mobile", contact.mobileNumber);
          update("officeMobile", contact.officeContactNumber);
          update("title", contact.title);

          if (nameData.data.length > 1) {
            setNotFoundMsg(`Found ${nameData.data.length} contacts. Showing first match: ${contact.name}`);
          }
        } else {
          setSearchResult('not_found');
          update("contactName", searchValue);
          update("email", "");
          update("mobile", "");
          update("officeMobile", "");
          update("title", "Mr.");
        }
      }
    } catch (error) {
      console.error(error);
      setNotFoundMsg("Error searching contact.");
      setSearchResult('not_found');
    }
  };

  const onReset = () => {
    setForm({
      requestRef: "",
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
    setGeneratedRef("");
    setSubmitted(false);
    setComplaintId(null);
    setSearchResult(null);
    setShowAddDetails(false);
    setSelectedContactPerson("");
    setSearchType('mobile');
    setNameSearch("");
    setNewContactData({
      name: "",
      email: "",
      organization: "",
      title: "Mr."
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.categoryType || !form.complaint) {
      alert("Please fill in all required fields (Category Type and Complaint).");
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

      // Remove empty fields that might cause issues
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === "" || submissionData[key] === null || submissionData[key] === undefined) {
          delete submissionData[key];
        }
      });

      const response = await fetch("http://localhost:44354/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Submission failed: ${response.status} ${errorText}`);
      }

      const savedComplaint = await response.json();
      setComplaintId(savedComplaint.data._id);
      setSubmitted(true);
      setGeneratedRef(savedComplaint.data.requestRef || "Generated");
      alert(`✅ Complaint submitted successfully! Reference: ${savedComplaint.data.requestRef}`);

    } catch (error) {
      console.error('Submission error:', error);
      alert(`❌ Error submitting complaint: ${error.message}`);
    }
  };

  const onViewComplaint = () => {
    navigate('/my-tasks');
  };

  return (
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
          Complaint Onboard
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1.1rem',
          margin: 0,
          fontWeight: '400'
        }}>
          Submit and manage customer complaints efficiently
        </p>
      </header>

      {/* Success Message with Generated Reference */}
      {generatedRef && (
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            ✅ Complaint Submitted Successfully!
          </h3>
          <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>
            Reference Number: {generatedRef}
          </p>
        </div>
      )}

      <form className="config-content" style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        padding: '2rem'
      }} onSubmit={onSubmit}>
        
        {/* ======= SECTION: Complaint Details ======= */}
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

          <div className="grid grid-2">
            <Field label="Request Reference">
              <input
                className="input"
                value={form.requestRef}
                onChange={(e) => update("requestRef", e.target.value)}
                placeholder="Auto-generated on submission"
                title="This will be auto-generated when the complaint is submitted"
                style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
              />
            </Field>

            <Field label="Category Type">
              <select
                className="input"
                value={form.categoryType}
                onChange={(e) => update("categoryType", e.target.value)}
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Organization">
              <select
                className="input"
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
              >
                <option value="">Select…</option>
                {organizations.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="Solution Type">
              <select
                className="input"
                value={form.solutionType}
                onChange={(e) => update("solutionType", e.target.value)}
              >
                <option value="">Select…</option>
                <option>Permanent</option>
                <option>Temporary</option>
                <option>Workaround</option>
                <option>Feature Request</option>
              </select>
            </Field>

            <Field label="Solution Name">
              <select
                className="input"
                value={form.solutionName}
                onChange={(e) => update("solutionName", e.target.value)}
              >
                <option value="">Select…</option>
                {solutions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Medium">
              <select
                className="input"
                value={form.medium}
                onChange={(e) => update("medium", e.target.value)}
              >
                <option value="">Select…</option>
                {mediums.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>

            <Field label="Medium Source">
              <select
                className="input"
                value={form.mediumSource}
                onChange={(e) => update("mediumSource", e.target.value)}
              >
                <option value="">Select…</option>
                {mediumSources.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>

            <Field label="Complaint" className="full">
              <textarea
                className="input textarea"
                rows={4}
                value={form.complaint}
                onChange={(e) => update("complaint", e.target.value)}
                placeholder="Type the complaint here…"
              />
            </Field>
          </div>
        </section>

        {/* ======= SECTION: Contact Person Details ======= */}
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

          {/* Organization Contact Person Selection */}
          <div className="search-row" style={{ marginBottom: '1rem' }}>
            <div className="search-inline">
              <label className="label">Select from Organization Contacts:</label>
              <select
                className="input"
                value={selectedContactPerson}
                onChange={(e) => onContactPersonSelect(e.target.value)}
                style={{ flex: 1 }}
              >
                <option value="">Select existing contact person...</option>
                {loadingContactPersons ? (
                  <option disabled>Loading contact persons...</option>
                ) : (
                  organizationContactPersons.map((person) => (
                    <option key={person._id} value={person._id}>
                      {person.name} ({person.organizationName}) - {person.mobileNumber}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="search-row">
            <div style={{ marginBottom: '1rem' }}>
              <label className="label">Search Type:</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <input
                    type="radio"
                    value="mobile"
                    checked={searchType === 'mobile'}
                    onChange={(e) => setSearchType(e.target.value)}
                  />
                  Mobile Number
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <input
                    type="radio"
                    value="name"
                    checked={searchType === 'name'}
                    onChange={(e) => setSearchType(e.target.value)}
                  />
                  Name
                </label>
              </div>
            </div>

            <div className="search-inline">
              <label className="label">
                {searchType === 'mobile' ? 'Mobile Number:' : 'Contact Name:'}
              </label>
              {searchType === 'mobile' ? (
                <input
                  type="text"
                  className="input"
                  value={form.searchMobile}
                  onChange={(e) => update("searchMobile", e.target.value)}
                  placeholder="Enter mobile number (07XXXXXXXX)"
                  style={{ flex: 1 }}
                />
              ) : (
                <input
                  type="text"
                  className="input"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                  placeholder="Enter contact name"
                  style={{ flex: 1 }}
                />
              )}
              <button type="button" className="btn" onClick={onSearchContact}>
                Search
              </button>
            </div>
            {notFoundMsg && <div className="note">{notFoundMsg}</div>}
          </div>

          {/* Contact Search Results */}
          {searchResult === 'found' && (
            <div className="contact-found" style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#d4edda',
              borderRadius: '8px',
              border: '1px solid #c3e6cb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <strong>Contact Found:</strong> {form.contactName} ({form.mobile})
                </div>
                <div>
                  <button type="button" className="btn small" onClick={() => {
                    setSearchResult(null);
                    setNotFoundMsg("");
                    setShowAddDetails(false);
                  }}>
                    Clear
                  </button>
                </div>
              </div>

              {/* Contact Details View */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                fontSize: '0.875rem'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <div><strong>Email:</strong> {form.email || 'N/A'}</div>
                  <div><strong>Office Mobile:</strong> {form.officeMobile || 'N/A'}</div>
                  <div><strong>Title:</strong> {form.title || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}

          {searchResult === 'not_found' && (
            <div className="contact-not-found" style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#fff3cd',
              borderRadius: '8px',
              border: '1px solid #ffeaa7',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong>Contact not found.</strong> Click "Add Details" to create new contact.
              </div>
              <button type="button" className="btn primary small" onClick={() => {
                setShowAddDetails(true);
                setSearchResult(null);
              }}>
                Add Details
              </button>
            </div>
          )}

          {/* Manual Contact Entry Fields - Show when "Add Details" is clicked */}
          {showAddDetails && (
            <div className="manual-contact-entry" style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{
                margin: '0 0 1rem 0',
                color: '#495057',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                👤 New Contact Information
              </h4>

              <div className="grid grid-2">
                <Field label="Contact Name">
                  <input
                    className="input"
                    value={newContactData.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewContactData({...newContactData, name: value});
                      update("contactName", value);
                    }}
                    placeholder="Enter full name"
                    required={searchResult === 'not_found'}
                  />
                </Field>

                <Field label="Email">
                  <input
                    className="input"
                    value={newContactData.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewContactData({...newContactData, email: value});
                      update("email", value);
                    }}
                    placeholder="Enter email address"
                    type="email"
                    required={searchResult === 'not_found'}
                  />
                </Field>

                <Field label="Organization">
                  <input
                    className="input"
                    value={newContactData.organization}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewContactData({...newContactData, organization: value});
                    }}
                    placeholder="Enter organization name"
                  />
                </Field>

                <Field label="Title">
                  <select
                    className="input"
                    value={newContactData.title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewContactData({...newContactData, title: value});
                      update("title", value);
                    }}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </Field>
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#e7f3ff',
                borderRadius: '4px',
                border: '1px solid #b8daff',
                fontSize: '0.875rem',
                color: '#004085'
              }}>
                ℹ️ This new contact will be automatically saved to the organization contact person database when you submit the complaint.
              </div>
            </div>
          )}

          <div className="grid grid-2">
            <Field label="Contact Person Name">
              <input
                className="input"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="Full name"
              />
            </Field>
            <Field label="Email">
              <input
                className="input"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@example.com"
                type="email"
              />
            </Field>

            <Field label="Mobile No" className="mobile-no-field">
              <input
                className="input"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
                placeholder="07XXXXXXXX"
              />
            </Field>

            <Field label="Office Mobile No">
              <input
                className="input"
                value={form.officeMobile}
                onChange={(e) => {
                  const value = e.target.value;
                  update("officeMobile", value);
                  // Also update newContactData if in manual entry mode
                  if (searchResult === 'not_found') {
                    setNewContactData({...newContactData, officeMobile: value});
                  }
                }}
                placeholder="011XXXXXXX"
              />
            </Field>

            <Field label="Title">
              <select
                className="input"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              >
                {[
                  "Mr.",
                  "Mrs.",
                  "Ms.",
                  "Dr.",
                  "Prof."
                ].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* ======= SECTION: Assignment ======= */}
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
              👥 Assignment
            </h2>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Emp No</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Availability</th>
                  <th className="w-180">Assignment</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.empNo}>
                    <td>{s.empNo}</td>
                    <td>{s.name}</td>
                    <td>{s.designation}</td>
                    <td>{s.availability}</td>
                    <td>
                      <select
                        className="input"
                        value={form.assignment}
                        onChange={(e) => update("assignment", e.target.value)}
                      >
                        <option value="">Select…</option>
                        <optgroup label="Main Assignments">
                          <option>Field Visit</option>
                          <option>Remote Fix</option>
                          <option>Call Back</option>
                          <option>Escalate L2</option>
                        </optgroup>
                        <optgroup label="Sub Assignments">
                          <option>Fiber Team</option>
                          <option>Billing Team</option>
                        </optgroup>
                        <option>Tech Support</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-2 top-gap">
            <Field label="Document Reference">
              <div className="inline">
                <input
                  className="input"
                  value={form.docRef}
                  onChange={(e) => update("docRef", e.target.value)}
                  placeholder="DOC-REF"
                />
                <label className="upload">
                  <input type="file" onChange={() => {}} />
                  Upload
                </label>
              </div>
            </Field>

            <Field label="Document Subject">
              <input
                className="input"
                value={form.docSubject}
                onChange={(e) => update("docSubject", e.target.value)}
                placeholder="Subject"
              />
            </Field>

            <Field label="Remarks" className="full">
              <textarea
                className="input textarea"
                rows={4}
                value={form.remarks}
                onChange={(e) => update("remarks", e.target.value)}
                placeholder="Any special notes…"
              />
            </Field>
          </div>

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
            <button type="button" className="btn ghost" onClick={onReset} style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px'
            }}>Reset Form</button>
            <button type="submit" className="btn primary" style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px'
            }}>Submit Complaint</button>
            {submitted && (
              <button type="button" className="btn secondary" onClick={onViewComplaint} style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}>View Complaint</button>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`field ${className}`} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <label className="label" style={{
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.25rem'
      }}>{label}</label>
      <div className="control">{children}</div>
    </div>
  );
}