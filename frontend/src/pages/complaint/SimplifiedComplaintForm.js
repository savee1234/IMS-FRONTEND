import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SimplifiedComplaintForm.css";
import ContactPersonSelect from "../../components/ContactPersonSelect";

export default function SimplifiedComplaintForm() {
  const navigate = useNavigate();
  
  // Form data arrays
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
  const mediums = ["Hotline", "Email", "WhatsApp", "SMS", "Walk-in"];
  const mediumSources = ["Customer", "Field Ops", "Retail", "Corporate"];
  const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

  const staff = useMemo(
    () => [
      { empNo: "E001", name: "Kumara Perera", designation: "Engineer", availability: "Office" },
      { empNo: "E014", name: "R. Silva", designation: "Technician", availability: "Roster" },
      { empNo: "E023", name: "Anjalika D.", designation: "Coordinator", availability: "None" }
    ],
    []
  );

  // Form state
  const [form, setForm] = useState({
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
  
  // Additional state
  const [solutionTypes, setSolutionTypes] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [loadingSolutionData, setLoadingSolutionData] = useState(false);
  const [generatedRef, setGeneratedRef] = useState("");
  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const [mobileOptions, setMobileOptions] = useState([]);
  const [loadingMobiles, setLoadingMobiles] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [searchType, setSearchType] = useState('mobile');
  const [nameSearch, setNameSearch] = useState('');
  const [newContactData, setNewContactData] = useState({
    name: "",
    email: "",
    organization: "",
    title: "Mr."
  });
  const [organizationContactPersons, setOrganizationContactPersons] = useState([]);
  const [selectedContactPerson, setSelectedContactPerson] = useState(null);
  const [loadingContactPersons, setLoadingContactPersons] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(false);
  const [staffAssignments, setStaffAssignments] = useState({});

  // Section collapse state
  const [collapsedSections, setCollapsedSections] = useState({
    requestDetails: false,
    contactDetails: false,
    assignment: false
  });

  // Generate reference number
  const generateReferenceNumber = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const sequence = Math.floor(Math.random() * 9999) + 1;
    const sequenceStr = sequence.toString().padStart(4, '0');
    return `${year}-${month}-${day}-${sequenceStr}`;
  };

  // Initialize form with reference number
  useEffect(() => {
    const refNumber = generateReferenceNumber();
    setGeneratedRef(refNumber);
    update("requestRef", refNumber);
  }, []);

  // Fetch mobile numbers
  useEffect(() => {
    const fetchMobileNumbers = async () => {
      setLoadingMobiles(true);
      try {
        const response = await fetch('http://localhost:44354/api/organization-contact-persons/dropdown/mobile-numbers');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMobileOptions(data.data || []);
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

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrganizations(true);
      try {
        const response = await fetch('http://localhost:44354/api/organizations');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrganizations(data.data || []);
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

  // Fetch organization contact persons
  useEffect(() => {
    const fetchOrganizationContactPersons = async () => {
      setLoadingContactPersons(true);
      try {
        const response = await fetch('http://localhost:44354/api/organization-contact-persons');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrganizationContactPersons(data.data || []);
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

  // Fetch solution data
  useEffect(() => {
    const fetchSolutionData = async () => {
      setLoadingSolutionData(true);
      try {
        const response = await fetch('http://localhost:44354/api/solution-projects');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const solutionData = data.data || [];
            const uniqueSolutionTypes = [...new Set(solutionData.map(item => item.solutionType).filter(Boolean))];
            const uniqueSolutions = [...new Set(solutionData.map(item => item.solution).filter(Boolean))];
            setSolutionTypes(uniqueSolutionTypes);
            setSolutions(uniqueSolutions);
          }
        }
      } catch (error) {
        console.error('Network error fetching solution data:', error);
      } finally {
        setLoadingSolutionData(false);
      }
    };

    fetchSolutionData();
  }, []);
  
  // Filter solutions based on solution type
  useEffect(() => {
    if (form.solutionType) {
      const fetchSolutionsForType = async () => {
        try {
          const response = await fetch(`http://localhost:44354/api/solution-projects?solutionType=${encodeURIComponent(form.solutionType)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              const solutionData = data.data || [];
              const solutionsForType = [...new Set(solutionData.map(item => item.solution).filter(Boolean))];
              setFilteredSolutions(solutionsForType);
            } else {
              setFilteredSolutions([]);
            }
          } else {
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

  // Update form field
  const update = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    
    if (key === 'solutionType') {
      setForm((f) => ({ ...f, solutionName: '' }));
    }
  };

  // Handle contact selection
  const handleContactSelect = (contact) => {
    // Ensure we're receiving a valid contact object
    if (contact && typeof contact === 'object' && contact.name) {
      setSelectedContactPerson(contact);
      update("organizationContactPersonId", contact._id || contact.id || "");
      update("contactName", contact.name || "");
      update("email", contact.email || "");
      update("mobile", contact.mobileNumber || "");
      update("officeMobile", contact.officeContactNumber || "");
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

  // Update staff assignment
  const updateStaffAssignment = (empNo, assignment) => {
    setStaffAssignments((prev) => ({
      ...prev,
      [empNo]: assignment
    }));
  };

  // Toggle section collapse
  const toggleSection = (sectionName) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Search contact
  const onSearchContact = async () => {
    const searchValue = searchType === 'mobile' ? form.searchMobile : nameSearch;

    if (!searchValue) {
      setNotFoundMsg(`Please enter a ${searchType === 'mobile' ? 'mobile number' : 'name'} to search.`);
      setSearchResult(null);
      return;
    }

    setNotFoundMsg("");
    setSearchResult(null);
    setShowAddDetails(false);

    try {
      if (searchType === 'mobile') {
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
          if (data.found && data.data) {
            setSearchResult('found');
            update("contactName", data.data.name || "");
            update("email", data.data.email || "");
            update("mobile", data.data.mobileNumber || "");
            update("officeMobile", data.data.officeContactNumber || "");
            update("title", data.data.title || "Mr.");
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
        const nameResponse = await fetch(`http://localhost:44354/api/organization-contact-persons/search-by-name?name=${encodeURIComponent(searchValue)}&limit=20`);
        const nameData = await nameResponse.json();

        if (nameData.success && nameData.data && nameData.data.length > 0) {
          const contact = nameData.data[0];
          setSearchResult('found');
          update("contactName", contact.name || "");
          update("email", contact.email || "");
          update("mobile", contact.mobileNumber || "");
          update("officeMobile", contact.officeContactNumber || "");
          update("title", contact.title || "Mr.");

          if (nameData.data.length > 1) {
            setNotFoundMsg(`Found ${nameData.data.length} contacts. Showing first match: ${contact.name || 'Unknown'}`);
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

  // Reset form
  const onReset = () => {
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
    setComplaintId(null);
    setSearchResult(null);
    setShowAddDetails(false);
    setSelectedContactPerson(null);
    setSearchType('mobile');
    setNameSearch("");
    setNewContactData({
      name: "",
      email: "",
      organization: "",
      title: "Mr."
    });
    setStaffAssignments({});
    
    // Expand all sections on reset
    setCollapsedSections({
      requestDetails: false,
      contactDetails: false,
      assignment: false
    });
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryType || !form.complaint) {
      alert("Please fill in all required fields (Category Type and Complaint).");
      return;
    }

    try {
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
            update("contactName", createData.data.name || "");
            update("email", createData.data.email || "");
            update("mobile", createData.data.mobileNumber || "");
            update("officeMobile", createData.data.officeContactNumber || "");
            update("title", createData.data.title || "");
            update("organizationContactPersonId", createData.data._id || createData.data.id || "");

            const refreshResponse = await fetch('http://localhost:44354/api/organization-contact-persons');
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              if (refreshData.success) {
                setOrganizationContactPersons(refreshData.data || []);
              }
            }

            alert(`✅ New contact "${createData.data.name || 'Unknown'}" created and linked to complaint!`);
          }
        } else {
          const errorData = await createResponse.json().catch(() => ({}));
          console.error('Failed to create contact:', errorData);
          alert(`❌ Failed to create contact: ${errorData.message || 'Unknown error'}`);
          return;
        }
      }

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
      setComplaintId(savedComplaint.data?._id || savedComplaint.data?.id || null);
      setSubmitted(true);
      const finalRef = savedComplaint.data?.requestRef || form.requestRef;
      setGeneratedRef(finalRef);
      alert(`✅ Complaint submitted successfully! Reference: ${finalRef}`);

    } catch (error) {
      console.error('Submission error:', error);
      alert(`❌ Error submitting complaint: ${error.message}`);
    }
  };

  // View complaint
  const onViewComplaint = () => {
    navigate('/my-tasks');
  };

  return (
    <div className="simplified-complaint-form">
      {/* Page Header */}
      <header className="form-header">
        <h1>Complaint Onboard</h1>
        <p>Submit and manage customer complaints efficiently</p>
      </header>

      {/* Success Message */}
      {submitted && generatedRef && (
        <div className="success-message">
          <h3>✅ Complaint Submitted Successfully!</h3>
          <p>Reference Number: {generatedRef}</p>
        </div>
      )}

      <form className="form-container" onSubmit={onSubmit}>
        {/* Request Details Section */}
        <section className={`form-section ${collapsedSections.requestDetails ? 'collapsed' : ''}`}>
          <div 
            className="form-section-header" 
            onClick={() => toggleSection('requestDetails')}
          >
            <h2>📋 Request Details</h2>
            <span className="toggle-icon">▼</span>
          </div>

          <div className="form-section-content">
            <div className="form-grid form-grid-cols-2">
              <div className="form-field">
                <label className="form-label">Request Reference</label>
                <input
                  className="form-control"
                  value={form.requestRef || ""}
                  readOnly
                  placeholder="Auto-generated reference number"
                  title="This reference number is automatically generated"
                />
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Category Type</label>
                <select
                  className="form-control"
                  value={form.categoryType || ""}
                  onChange={(e) => update("categoryType", e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Organization</label>
                <select
                  className="form-control"
                  value={form.organization || ""}
                  onChange={(e) => update("organization", e.target.value)}
                >
                  <option value="">Select Organization</option>
                  {loadingOrganizations ? (
                    <option disabled>Loading organizations...</option>
                  ) : (
                    (organizations || []).map((org) => (
                      <option key={org._id || org.id || org.organization} value={org.organization || org.name || ''}>
                        {org.organization || org.name || 'Unnamed Organization'}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Solution Type</label>
                <select
                  className="form-control"
                  value={form.solutionType || ""}
                  onChange={(e) => update("solutionType", e.target.value)}
                  disabled={loadingSolutionData}
                >
                  <option value="">Select Solution Type</option>
                  {loadingSolutionData ? (
                    <option disabled>Loading...</option>
                  ) : (solutionTypes || []).length > 0 ? (
                    (solutionTypes || []).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))
                  ) : (
                    <option disabled>No solution types available</option>
                  )}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Solution Name</label>
                <select
                  className="form-control"
                  value={form.solutionName || ""}
                  onChange={(e) => update("solutionName", e.target.value)}
                  disabled={!form.solutionType || loadingSolutionData}
                >
                  <option value="">Select Solution</option>
                  {loadingSolutionData ? (
                    <option disabled>Loading...</option>
                  ) : form.solutionType ? (
                    (filteredSolutions || []).length > 0 ? (
                      (filteredSolutions || []).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))
                    ) : (
                      <option disabled>No solutions available for this type</option>
                    )
                  ) : (
                    <option disabled>Please select a solution type first</option>
                  )}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Medium</label>
                <select
                  className="form-control"
                  value={form.medium || ""}
                  onChange={(e) => update("medium", e.target.value)}
                >
                  <option value="">Select Medium</option>
                  {mediums.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Medium Source</label>
                <select
                  className="form-control"
                  value={form.mediumSource || ""}
                  onChange={(e) => update("mediumSource", e.target.value)}
                >
                  <option value="">Select Source</option>
                  {mediumSources.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field form-grid-cols-1">
                <label className="form-label form-label-required">Complaint</label>
                <textarea
                  className="form-control form-textarea"
                  rows={4}
                  value={form.complaint || ""}
                  onChange={(e) => update("complaint", e.target.value)}
                  placeholder="Type the complaint here..."
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Person Details Section */}
        <section className={`form-section ${collapsedSections.contactDetails ? 'collapsed' : ''}`}>
          <div 
            className="form-section-header" 
            onClick={() => toggleSection('contactDetails')}
          >
            <h2>👤 Contact Person Details</h2>
            <span className="toggle-icon">▼</span>
          </div>

          <div className="form-section-content">
            <div className="contact-search-container">
              <div className="contact-search-field">
                <div className="contact-search-input">
                  <label className="form-label">Search Contact Person</label>
                  <ContactPersonSelect
                    contacts={organizationContactPersons || []}
                    onSelect={handleContactSelect}
                    isLoading={loadingContactPersons}
                    selectedPerson={selectedContactPerson}
                    placeholder="Search by name or mobile number..."
                  />
                </div>
              </div>
              
              {selectedContactPerson && typeof selectedContactPerson === 'object' && selectedContactPerson.name && (
                <div className="selected-contact-display">
                  <strong>Selected Contact:</strong> {selectedContactPerson.name} ({selectedContactPerson.mobileNumber || 'No mobile'})
                </div>
              )}
              
              {notFoundMsg && (
                <div className="contact-status contact-not-found">
                  <div>{notFoundMsg}</div>
                </div>
              )}
            </div>

            {searchResult === 'found' && form.contactName && (
              <div className="contact-status contact-found">
                <div>
                  <strong>Contact Found:</strong> {form.contactName} ({form.mobile || 'No mobile'})
                </div>
                <div className="contact-status-actions">
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setSearchResult(null);
                      setNotFoundMsg("");
                      setShowAddDetails(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {searchResult === 'not_found' && (
              <div className="contact-status contact-not-found">
                <div>
                  <strong>Contact not found.</strong> Click "Add Details" to create new contact.
                </div>
                <div className="contact-status-actions">
                  <button 
                    type="button" 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setShowAddDetails(true);
                      setSearchResult(null);
                    }}
                  >
                    Add Details
                  </button>
                </div>
              </div>
            )}

            {showAddDetails && (
              <div className="manual-contact-form">
                <h4 className="manual-contact-header">👤 New Contact Information</h4>

                <div className="form-grid form-grid-cols-2">
                  <div className="form-field">
                    <label className="form-label form-label-required">Contact Name</label>
                    <input
                      className="form-control"
                      value={newContactData.name || ""}
                      onChange={(e) => {
                        const value = e.target.value || "";
                        setNewContactData({...newContactData, name: value});
                        update("contactName", value);
                      }}
                      placeholder="Enter full name"
                      required={searchResult === 'not_found'}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label form-label-required">Email</label>
                    <input
                      className="form-control"
                      value={newContactData.email || ""}
                      onChange={(e) => {
                        const value = e.target.value || "";
                        setNewContactData({...newContactData, email: value});
                        update("email", value);
                      }}
                      placeholder="Enter email address"
                      type="email"
                      required={searchResult === 'not_found'}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Organization</label>
                    <select
                      className="form-control"
                      value={newContactData.organization || ""}
                      onChange={(e) => {
                        const value = e.target.value || "";
                        setNewContactData({...newContactData, organization: value});
                      }}
                    >
                      <option value="">Select Organization</option>
                      {loadingOrganizations ? (
                        <option disabled>Loading organizations...</option>
                      ) : (
                        (organizations || []).map((org) => (
                          <option key={org._id || org.id || org.organization} value={org.organization || org.name || ''}>
                            {org.organization || org.name || 'Unnamed Organization'}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Title</label>
                    <select
                      className="form-control"
                      value={newContactData.title || "Mr."}
                      onChange={(e) => {
                        const value = e.target.value || "Mr.";
                        setNewContactData({...newContactData, title: value});
                        update("title", value);
                      }}
                    >
                      {titles.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="manual-contact-info">
                  ℹ️ This new contact will be automatically saved to the organization contact person database when you submit the complaint.
                </div>
              </div>
            )}

            <div className="form-grid form-grid-cols-2">
              <div className="form-field">
                <label className="form-label">Contact Person Name</label>
                <input
                  className="form-control"
                  value={form.contactName || ""}
                  onChange={(e) => update("contactName", e.target.value)}
                  placeholder="Full name"
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={form.email || ""}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Mobile No</label>
                <input
                  className="form-control"
                  value={form.mobile || ""}
                  onChange={(e) => update("mobile", e.target.value)}
                  placeholder="07XXXXXXXX"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Office Mobile No</label>
                <input
                  className="form-control"
                  value={form.officeMobile || ""}
                  onChange={(e) => {
                    const value = e.target.value || "";
                    update("officeMobile", value);
                    if (searchResult === 'not_found') {
                      setNewContactData({...newContactData, officeMobile: value});
                    }
                  }}
                  placeholder="011XXXXXXX"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Title</label>
                <select
                  className="form-control"
                  value={form.title || "Mr."}
                  onChange={(e) => update("title", e.target.value)}
                >
                  {titles.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Assignment Section */}
        <section className={`form-section ${collapsedSections.assignment ? 'collapsed' : ''}`}>
          <div 
            className="form-section-header" 
            onClick={() => toggleSection('assignment')}
          >
            <h2>👥 Assignment</h2>
            <span className="toggle-icon">▼</span>
          </div>

          <div className="form-section-content">
            <div className="assignment-table-container">
              <table className="assignment-table">
                <thead>
                  <tr>
                    <th>Emp No</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Availability</th>
                    <th>Assignment</th>
                  </tr>
                </thead>
                <tbody>
                  {(staff || []).map((s) => (
                    <tr key={s.empNo || s.name || Math.random()}>
                      <td>{s.empNo || 'N/A'}</td>
                      <td>{s.name || 'Unnamed'}</td>
                      <td>{s.designation || 'N/A'}</td>
                      <td>{s.availability || 'N/A'}</td>
                      <td>
                        <select
                          className="assignment-select"
                          value={staffAssignments[s.empNo] || ""}
                          onChange={(e) => updateStaffAssignment(s.empNo, e.target.value)}
                        >
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

            <div className="form-grid form-grid-cols-2">
              <div className="form-field">
                <label className="form-label">Document Reference</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    className="form-control"
                    value={form.docRef || ""}
                    onChange={(e) => update("docRef", e.target.value)}
                    placeholder="DOC-REF"
                  />
                  <label className="btn btn-outline" style={{ flexShrink: 0, cursor: 'pointer' }}>
                    <input 
                      type="file" 
                      style={{ display: 'none' }} 
                      onChange={() => {}} 
                    />
                    Upload
                  </label>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Document Subject</label>
                <input
                  className="form-control"
                  value={form.docSubject || ""}
                  onChange={(e) => update("docSubject", e.target.value)}
                  placeholder="Subject"
                />
              </div>

              <div className="form-field form-grid-cols-1">
                <label className="form-label">Remarks</label>
                <textarea
                  className="form-control form-textarea"
                  rows={4}
                  value={form.remarks || ""}
                  onChange={(e) => update("remarks", e.target.value)}
                  placeholder="Any special notes..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onReset}
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Submit Complaint
          </button>
          {submitted && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onViewComplaint}
            >
              View Complaint
            </button>
          )}
        </div>
      </form>
    </div>
  );
}