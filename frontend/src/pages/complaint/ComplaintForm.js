// ComplaintOnboarding.jsx
// Drop this file into your React app (e.g., src/pages/ComplaintOnboarding.jsx)
// Then import and render <ComplaintOnboarding />
// -------------------------------------------------
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css";
import ContactPersonSelect from "../../components/ContactPersonSelect";

// Add font link for modern fonts
const addFontLink = () => {
  if (!document.getElementById('complaint-form-modern-fonts')) {
    const link = document.createElement('link');
    link.id = 'complaint-form-modern-fonts';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

addFontLink();

export default function ComplaintForm() {
  const navigate = useNavigate();
  
  // Add state for tab navigation
  const [activeTab, setActiveTab] = useState(0);
  
  // ------- Dummy data (replace with real API data) --------
  // const organizations = ["SLT", "Mobitel", "ABC Pvt Ltd", "Other"]; // Removed hardcoded data
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
  // Removed hardcoded solutions - will fetch from API
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
  
  // New state for solution types and solutions
  const [solutionTypes, setSolutionTypes] = useState([]);
  const [solutions, setSolutions] = useState([]);
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
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(false);

  // State for staff assignments (each row has independent selection)
  const [staffAssignments, setStaffAssignments] = useState({});

  // Track which empNo is currently marked as Main Assignment (if any)
  const mainAssignedEmp = React.useMemo(() => {
    return Object.keys(staffAssignments).find(emp => staffAssignments[emp] === 'Main Assignment');
  }, [staffAssignments]);

  // Generate reference number when component mounts
  useEffect(() => {
    const refNumber = generateReferenceNumber();
    setGeneratedRef(refNumber);
    update("requestRef", refNumber);
  }, []);

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
            const uniqueSolutions = [...new Set(data.data.map(item => item.solution))];
            
            setSolutionTypes(uniqueSolutionTypes);
            setSolutions(uniqueSolutions);
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

  return (
    <div className="content-wrapper" style={{
      position: 'relative',
      zIndex: 1,
      padding: '15px',
      marginTop: '1rem',
      maxWidth: '1200px',
      margin: '1rem auto 0 auto',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif"
    }}>
      {/* Modern Header without Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '15px 0'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#0E3A7C',
          margin: '0 0 8px 0',
          fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif"
        }}>
          Complaint Onboard
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: '#64748b',
          margin: 0,
          fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
        }}>
          Submit and manage customer complaints efficiently
        </p>
      </div>
      
      {/* Modern Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        backgroundColor: '#f8fafc',
        padding: '5px',
        borderRadius: '12px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.03)',
        border: '1px solid #e2e8f0'
      }}>
        {['Request Details', 'Contact Person', 'Assignment'].map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: '12px 5px',
              borderRadius: '8px',
              backgroundColor: activeTab === index ? '#0E3A7C' : 'transparent',
              color: activeTab === index ? 'white' : '#64748b',
              fontWeight: activeTab === index ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: activeTab === index ? 'none' : '1px solid transparent'
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: activeTab === index ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}>
              {index + 1}
            </span>
            <span>{tab}</span>
          </div>
        ))}
      </div>
      
      {/* Success Message with Generated Reference - Only show after submission */}
      {submitted && generatedRef && (
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h3 style={{ 
            margin: '0 0 0.75rem 0', 
            fontSize: '1.25rem',
            fontWeight: '700',
            fontFamily: "'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
          }}>
            ✅ Complaint Submitted Successfully!
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '1.5rem', 
            fontWeight: '800',
            fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
          }}>
            Reference Number: {generatedRef}
          </p>
        </div>
      )}
      
      <form className="config-content" onSubmit={onSubmit} style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(0, 0, 0, 0.02)'
      }}>
        
        {/* ======= TAB 0: Request Details ======= */}
        <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
          <section className="config-section">
            <div className="section-header">
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#0E3A7C',
                margin: '0 0 20px 0',
                fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg style={{ width: '24px', height: '24px', color: '#0E3A7C' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Request Details
              </h2>
            </div>

            <div className="grid grid-2" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
              marginBottom: '10px'
            }}>
              <Field label="Request Reference">
                <input
                  className="input"
                  value={form.requestRef}
                  readOnly
                  placeholder="Auto-generated reference number"
                  title="This reference number is automatically generated"
                  style={{ backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }}
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
                  {loadingOrganizations ? (
                    <option disabled>Loading organizations...</option>
                  ) : (
                    organizations.map((org) => (
                      <option key={org._id} value={org.organization}>{org.organization}</option>
                    ))
                  )}
                </select>
              </Field>

              <Field label="Solution Type">
                <select
                  className="input"
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
              </Field>

              <Field label="Solution Name">
                <select
                  className="input"
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
            
            {/* Navigation Buttons */}
            <div className="actions" style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <button 
                type="button" 
                onClick={nextTab}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#0E3A7C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                  boxShadow: '0 2px 4px rgba(14, 58, 124, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#0b2f64';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(14, 58, 124, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#0E3A7C';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(14, 58, 124, 0.2)';
                }}
              >
                Next →
              </button>
            </div>
          </section>
        </div>
        
        {/* ======= TAB 1: Contact Person Details ======= */}
        <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <section className="config-section">
            <div className="section-header">
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#0E3A7C',
                margin: '0 0 20px 0',
                fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg style={{ width: '24px', height: '24px', color: '#0E3A7C' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Contact Person Details
              </h2>
            </div>

            {/* Contact Person Searchable Dropdown */}
            <div className="search-row">
              <div className="search-inline">
                <label className="label">Search Contact Person:</label>
                <ContactPersonSelect
                  contacts={organizationContactPersons}
                  onSelect={handleContactSelect}
                  isLoading={loadingContactPersons}
                  selectedPerson={selectedContactPerson}
                  placeholder="Search by name or mobile number..."
                />
              </div>
              {notFoundMsg && (
                <div className="note">
                  {notFoundMsg}
                </div>
              )}
            </div>

            {/* Contact Search Results */}
            {searchResult === 'found' && (
              <div className="contact-found" style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#d1fae5',
                borderRadius: '10px',
                border: '1px solid #6ee7b7',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    fontWeight: '600',
                    color: '#065f46',
                    fontSize: '1.1rem'
                  }}>
                    <strong>Contact Found:</strong> {form.contactName} ({form.mobile})
                  </div>
                  <div>
                    <button type="button" className="btn ghost" style={{ 
                      height: '40px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem'
                    }} onClick={() => {
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
                  backgroundColor: '#f0fdf4',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #bbf7d0',
                  fontSize: '0.95rem'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '0.75rem' 
                  }}>
                    <div><strong>Email:</strong> {form.email || 'N/A'}</div>
                    <div><strong>Office Mobile:</strong> {form.officeMobile || 'N/A'}</div>
                    <div><strong>Title:</strong> {form.title || 'N/A'}</div>
                  </div>
                </div>
              </div>
            )}

            {searchResult === 'not_found' && (
              <div className="contact-not-found" style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#fffbeb',
                borderRadius: '10px',
                border: '1px solid #fde68a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  fontWeight: '600',
                  color: '#92400e',
                  fontSize: '1.1rem'
                }}>
                  <strong>Contact not found.</strong> Click "Add Details" to create new contact.
                </div>
                <button type="button" className="btn primary" style={{ 
                  height: '40px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem'
                }} onClick={() => {
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
                marginTop: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '10px',
                border: '1px solid #93c5fd',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}>
                <h4 style={{
                  margin: '0 0 1.25rem 0',
                  color: '#1e40af',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  fontFamily: "'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
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
                    <select
                      className="input"
                      value={newContactData.organization}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewContactData({...newContactData, organization: value});
                      }}
                    >
                      <option value="">Select Organization</option>
                      {loadingOrganizations ? (
                        <option disabled>Loading organizations...</option>
                      ) : (
                        organizations.map((org) => (
                          <option key={org._id} value={org.organization}>{org.organization}</option>
                        ))
                      )}
                    </select>
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
                  marginTop: '1.25rem',
                  padding: '1rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '8px',
                  border: '1px solid #93c5fd',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#1e40af'
                }}>
                  ℹ️ This new contact will be automatically saved to the organization contact person database when you submit the complaint.
                </div>
              </div>
            )}

            {/* Manual Contact Entry Fields */}
            <div className="grid grid-2" style={{ marginTop: '1.5rem' }}>
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

              <Field label="Mobile No">
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
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </Field>
            </div>
            
            {/* Navigation Buttons */}
            <div className="actions" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <button 
                type="button" 
                onClick={prevTab}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#64748b';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#94a3b8';
                }}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                onClick={nextTab}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#0E3A7C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                  boxShadow: '0 2px 4px rgba(14, 58, 124, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#0b2f64';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(14, 58, 124, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#0E3A7C';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(14, 58, 124, 0.2)';
                }}
              >
                Next →
              </button>
            </div>
          </section>
        </div>
        
        {/* ======= TAB 2: Assignment ======= */}
        <div style={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <section className="config-section">
            <div className="section-header">
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#0E3A7C',
                margin: '0 0 20px 0',
                fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg style={{ width: '24px', height: '24px', color: '#0E3A7C' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Assignment
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
                          className="input"
                          value={staffAssignments[s.empNo] || ""}
                          onChange={(e) => updateStaffAssignment(s.empNo, e.target.value)}
                          style={{ 
                            height: '40px',
                            padding: '0.5rem',
                            minWidth: '160px'
                          }}
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

            <div className="grid grid-2" style={{ marginTop: '1.5rem' }}>
              <Field label="Document Reference">
                <div className="inline">
                  <input
                    className="input"
                    value={form.docRef}
                    onChange={(e) => update("docRef", e.target.value)}
                    placeholder="DOC-REF"
                    style={{ flex: 1 }}
                  />
                  <label className="upload">
                    <input 
                      type="file" 
                      onChange={() => {}} 
                    />
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
            
            {/* Navigation Buttons */}
            <div className="actions" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <button 
                type="button" 
                onClick={prevTab}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#64748b';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#94a3b8';
                }}
              >
                ← Previous
              </button>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={onReset}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#64748b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#475569';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#64748b';
                  }}
                >
                  Reset Form
                </button>
                <button 
                  type="submit" 
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#F8991D',
                    color: '#0E3A7C',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                    boxShadow: '0 2px 4px rgba(248, 153, 29, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#e68a0d';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(248, 153, 29, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#F8991D';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(248, 153, 29, 0.3)';
                  }}
                >
                  Submit Complaint
                </button>
                {submitted && (
                  <button 
                    type="button" 
                    onClick={onViewComplaint}
                    style={{
                      padding: '10px 24px',
                      background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  >
                    View Complaint
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
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