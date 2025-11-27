import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SimplifiedComplaintForm.css";
import ContactPersonSelect from "../../components/ContactPersonSelect";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
  const [selectedContactPerson, setSelectedContactPerson] = useState("");
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

  // Fetch organizations
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

  // Fetch organization contact persons
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

  // Fetch solution data
  useEffect(() => {
    const fetchSolutionData = async () => {
      setLoadingSolutionData(true);
      try {
        const response = await fetch('http://localhost:44354/api/solution-projects');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const uniqueSolutionTypes = [...new Set(data.data.map(item => item.solutionType))];
            const uniqueSolutions = [...new Set(data.data.map(item => item.solution))];
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

  // Handlers
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
        staff.forEach(s => {
          if (s.empNo === empNo) {
            next[s.empNo] = 'Main Assignment';
          } else {
            next[s.empNo] = 'Sub Assignment';
          }
        });
      } else if (assignment === 'Sub Assignment' || assignment === '') {
        next[empNo] = assignment;
      } else {
        next[empNo] = assignment;
      }

      return next;
    });
  };

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
    setStaffAssignments({});
    setCollapsedSections({
      requestDetails: false,
      contactDetails: false,
      assignment: false
    });
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
      
      setComplaintId(savedComplaint.data._id);
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

  const onViewComplaint = () => {
    navigate('/my-tasks');
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="simplified-complaint-form">
      <Navbar />
      
      {/* Modern Header */}
      <div className="form-header">
        <h1>Complaint Management</h1>
        <p>Streamlined complaint submission and tracking system</p>
      </div>
      
      {/* Success Message */}
      {submitted && generatedRef && (
        <div className="success-message">
          <h3>✅ Complaint Submitted Successfully!</h3>
          <p>Reference Number: {generatedRef}</p>
        </div>
      )}
      
      <form className="form-container" onSubmit={onSubmit}>
        {/* Request Details Section */}
        <div className={`form-section ${collapsedSections.requestDetails ? 'collapsed' : ''}`}>
          <div 
            className="form-section-header"
            onClick={() => toggleSection('requestDetails')}
          >
            <h2>
              <svg style={{ width: '24px', height: '24px', color: 'white' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Request Details
            </h2>
            <span className="toggle-icon">▼</span>
          </div>
          
          <div className="form-section-content">
            <div className="form-grid form-grid-cols-2">
              <div className="form-field">
                <label className="form-label">Request Reference</label>
                <input
                  className="form-control"
                  value={form.requestRef}
                  readOnly
                  placeholder="Auto-generated reference number"
                  title="This reference number is automatically generated"
                  style={{ backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Category Type</label>
                <select
                  className="form-control"
                  value={form.categoryType}
                  onChange={(e) => update("categoryType", e.target.value)}
                >
                  <option value="">Select…</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Organization</label>
                <select
                  className="form-control"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                >
                  <option value="">Select…</option>
                  {loadingOrganizations ? (
                    <option disabled>Loading organizations...</option>
                  ) : (
                    organizations.map((org) => (
                      <option key={org._id} value={org.organization}>{org.organization}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Solution Type</label>
                <select
                  className="form-control"
                  value={form.solutionType}
                  onChange={(e) => update("solutionType", e.target.value)}
                  disabled={loadingSolutionData}
                >
                  <option value="">Select…</option>
                  {loadingSolutionData ? (
                    <option disabled>Loading...</option>
                  ) : solutionTypes.length > 0 ? (
                    solutionTypes.map((type) => (
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
                  value={form.solutionName}
                  onChange={(e) => update("solutionName", e.target.value)}
                  disabled={!form.solutionType || loadingSolutionData}
                >
                  <option value="">Select…</option>
                  {loadingSolutionData ? (
                    <option disabled>Loading...</option>
                  ) : form.solutionType ? (
                    filteredSolutions.length > 0 ? (
                      filteredSolutions.map((s) => (
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
                <label className="form-label form-label-required">Medium</label>
                <select
                  className="form-control"
                  value={form.medium}
                  onChange={(e) => update("medium", e.target.value)}
                >
                  <option value="">Select…</option>
                  {mediums.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Medium Source</label>
                <select
                  className="form-control"
                  value={form.mediumSource}
                  onChange={(e) => update("mediumSource", e.target.value)}
                >
                  <option value="">Select…</option>
                  {mediumSources.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field full">
                <label className="form-label form-label-required">Complaint</label>
                <textarea
                  className="form-control form-textarea"
                  rows={4}
                  value={form.complaint}
                  onChange={(e) => update("complaint", e.target.value)}
                  placeholder="Type the complaint here…"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Details Section */}
        <div className={`form-section ${collapsedSections.contactDetails ? 'collapsed' : ''}`}>
          <div 
            className="form-section-header"
            onClick={() => toggleSection('contactDetails')}
          >
            <h2>
              <svg style={{ width: '24px', height: '24px', color: 'white' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Contact Person Details
            </h2>
            <span className="toggle-icon">▼</span>
          </div>
          
          <div className="form-section-content">
            {/* Contact Person Searchable Dropdown */}
            <div className="contact-search-container">
              <div className="contact-search-field">
                <label className="form-label">Search Contact Person:</label>
                <ContactPersonSelect
                  contacts={organizationContactPersons}
                  onSelect={handleContactSelect}
                  isLoading={loadingContactPersons}
                  selectedPerson={selectedContactPerson}
                  placeholder="Search by name or mobile number..."
                />
              </div>
              {notFoundMsg && (
                <div className="note" style={{ color: '#ef4444' }}>{notFoundMsg}</div>
              )}
            </div>

            {/* Manual Contact Entry Section */}
            <div className="manual-contact-form">
              <h3 className="manual-contact-header">Manual Contact Entry</h3>
              
              <div className="form-grid form-grid-cols-2">
                <div className="form-field">
                  <label className="form-label">Title</label>
                  <select
                    className="form-control"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label form-label-required">Name</label>
                  <input
                    className="form-control"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label form-label-required">Mobile Number</label>
                  <input
                    className="form-control"
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => update("mobile", e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Office Contact Number</label>
                  <input
                    className="form-control"
                    type="tel"
                    value={form.officeMobile}
                    onChange={(e) => update("officeMobile", e.target.value)}
                    placeholder="Enter office contact number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Assignment Details Section */}
        <div className={`form-section ${collapsedSections.assignment ? 'collapsed' : ''}`}>
          <div 
            className="form-section-header"
            onClick={() => toggleSection('assignment')}
          >
            <h2>
              <svg style={{ width: '24px', height: '24px', color: 'white' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Assignment Details
            </h2>
            <span className="toggle-icon">▼</span>
          </div>
          
          <div className="form-section-content">
            <div className="form-grid form-grid-cols-2">
              <div className="form-field">
                <label className="form-label">Assignment</label>
                <input
                  className="form-control"
                  value={form.assignment}
                  onChange={(e) => update("assignment", e.target.value)}
                  placeholder="Enter assignment details"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Document Reference</label>
                <input
                  className="form-control"
                  value={form.docRef}
                  onChange={(e) => update("docRef", e.target.value)}
                  placeholder="Enter document reference"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Document Subject</label>
                <input
                  className="form-control"
                  value={form.docSubject}
                  onChange={(e) => update("docSubject", e.target.value)}
                  placeholder="Enter document subject"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Remarks</label>
                <textarea
                  className="form-control form-textarea"
                  rows={3}
                  value={form.remarks}
                  onChange={(e) => update("remarks", e.target.value)}
                  placeholder="Enter any additional remarks"
                />
              </div>
            </div>

            {/* Staff Assignment Table */}
            <div className="assignment-table-container">
              <table className="assignment-table">
                <thead>
                  <tr>
                    <th>Employee No</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Availability</th>
                    <th>Assignment</th>
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
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onReset}
          >
            Reset
          </button>
          <button 
            type="submit"
            className="btn btn-primary"
          >
            Submit Complaint
          </button>
        </div>
      </form>
      
      <Footer />
    </div>
  );
}