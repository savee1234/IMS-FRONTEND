import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css";
import ContactPersonSelect from "../../components/ContactPersonSelect";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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

  // Field component for form inputs
  const Field = ({ label, children, className = "", required = false }) => (
    <div className={`field ${className}`} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.75rem',
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
    }}>
      <label 
        className="label" 
        style={{ 
          fontWeight: required ? 600 : 500, 
          color: '#0f172a', 
          fontSize: '1rem',
          margin: 0,
          fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
        }}
      >
        {label}
        {required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="complaint-form-page">
      <Navbar />
      <div className="content-wrapper" style={{
        position: 'relative',
        zIndex: 1,
        padding: '15px',
        marginTop: '1rem',
        maxWidth: '1200px',
        margin: '1rem auto 0 auto',
        fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
      }}>
        {/* Modern Header without Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '15px 0'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            margin: '0 0 8px 0',
            fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
            background: 'linear-gradient(90deg, #1e40af, #3b82f6, #000000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Complaint Onboard
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            margin: 0,
            fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
            fontWeight: 400
          }}>
            Submit and manage customer complaints efficiently
          </p>
        </div>
        
        {/* Modern Tab Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          backgroundColor: '#ffffff',
          padding: '5px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          {['Request Details', 'Contact Person', 'Assignment'].map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                flex: 1,
                padding: '16px 5px',
                borderRadius: '12px',
                background: activeTab === index ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
                color: activeTab === index ? 'white' : '#64748b',
                fontWeight: activeTab === index ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', sans-serif",
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: activeTab === index ? 'none' : '1px solid transparent',
                boxShadow: activeTab === index ? '0 4px 8px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: activeTab === index ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                fontWeight: '600',
                fontSize: '0.875rem'
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
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            border: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0', 
              fontSize: '1.5rem',
              fontWeight: '800',
              fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
            }}>
              ✅ Complaint Submitted Successfully!
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '2rem', 
              fontWeight: '800',
              fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
            }}>
              Reference Number: {generatedRef}
            </p>
          </div>
        )}
        
        <form className="config-content" onSubmit={onSubmit} style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0'
        }}>
          
          {/* ======= TAB 0: Request Details ======= */}
          <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
            <section className="config-section">
              <div className="section-header" style={{
                marginBottom: '1.5rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(59, 130, 246, 0.2)',
                fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', sans-serif"
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: '0',
                  fontFamily: "'Montserrat', 'Poppins', 'Inter', 'Roboto', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'white' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                <Field label="Category Type" required>
                  <select
                    className="input"
                    value={form.categoryType}
                    onChange={(e) => update("categoryType", e.target.value)}
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  >
                    <option value="">Select…</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Organization" required>
                  <select
                    className="input"
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
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
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
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
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
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

                <Field label="Medium" required>
                  <select
                    className="input"
                    value={form.medium}
                    onChange={(e) => update("medium", e.target.value)}
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  >
                    <option value="">Select…</option>
                    {mediums.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Medium Source" required>
                  <select
                    className="input"
                    value={form.mediumSource}
                    onChange={(e) => update("mediumSource", e.target.value)}
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  >
                    <option value="">Select…</option>
                    {mediumSources.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Complaint" className="full" required>
                  <textarea
                    className="input textarea"
                    rows={4}
                    value={form.complaint}
                    onChange={(e) => update("complaint", e.target.value)}
                    placeholder="Type the complaint here…"
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
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
                  <div className="note" style={{ color: '#ef4444' }}>{notFoundMsg}</div>
                )}
              </div>

              {/* Manual Contact Entry Section */}
              <div style={{ 
                background: '#f0f9ff', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                border: '1px solid #93c5fd',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ 
                  margin: '0 0 1rem 0', 
                  color: '#0E3A7C', 
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif"
                }}>
                  Manual Contact Entry
                </h3>
                
                <div className="grid grid-2" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px'
                }}>
                  <Field label="Title">
                    <select
                      className="input"
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                      style={{
                        fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                      }}
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                    </select>
                  </Field>

                  <Field label="Name" required>
                    <input
                      className="input"
                      value={form.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      placeholder="Enter full name"
                      style={{
                        fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                      }}
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      className="input"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Enter email address"
                      style={{
                        fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                      }}
                    />
                  </Field>

                  <Field label="Mobile Number" required>
                    <input
                      className="input"
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => update("mobile", e.target.value)}
                      placeholder="Enter mobile number"
                      style={{
                        fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                      }}
                    />
                  </Field>

                  <Field label="Office Contact Number">
                    <input
                      className="input"
                      type="tel"
                      value={form.officeMobile}
                      onChange={(e) => update("officeMobile", e.target.value)}
                      placeholder="Enter office contact number"
                      style={{
                        fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                      }}
                    />
                  </Field>
                </div>
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

          {/* ======= TAB 2: Assignment Details ======= */}
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
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Assignment Details
                </h2>
              </div>

              <div className="grid grid-2" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <Field label="Assignment">
                  <input
                    className="input"
                    value={form.assignment}
                    onChange={(e) => update("assignment", e.target.value)}
                    placeholder="Enter assignment details"
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  />
                </Field>

                <Field label="Document Reference">
                  <input
                    className="input"
                    value={form.docRef}
                    onChange={(e) => update("docRef", e.target.value)}
                    placeholder="Enter document reference"
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  />
                </Field>

                <Field label="Document Subject">
                  <input
                    className="input"
                    value={form.docSubject}
                    onChange={(e) => update("docSubject", e.target.value)}
                    placeholder="Enter document subject"
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  />
                </Field>

                <Field label="Remarks">
                  <textarea
                    className="input textarea"
                    rows={3}
                    value={form.remarks}
                    onChange={(e) => update("remarks", e.target.value)}
                    placeholder="Enter any additional remarks"
                    style={{
                      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
                    }}
                  />
                </Field>
              </div>

              {/* Staff Assignment Table */}
              <div className="table-wrap" style={{
                overflow: 'auto',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                marginBottom: '20px'
              }}>
                <table className="table" style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: 0
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        borderBottom: '2px solid #e2e8f0',
                        padding: '1rem',
                        textAlign: 'left',
                        background: '#f1f5f9',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}>Employee No</th>
                      <th style={{
                        borderBottom: '2px solid #e2e8f0',
                        padding: '1rem',
                        textAlign: 'left',
                        background: '#f1f5f9',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}>Name</th>
                      <th style={{
                        borderBottom: '2px solid #e2e8f0',
                        padding: '1rem',
                        textAlign: 'left',
                        background: '#f1f5f9',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}>Designation</th>
                      <th style={{
                        borderBottom: '2px solid #e2e8f0',
                        padding: '1rem',
                        textAlign: 'left',
                        background: '#f1f5f9',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}>Availability</th>
                      <th style={{
                        borderBottom: '2px solid #e2e8f0',
                        padding: '1rem',
                        textAlign: 'left',
                        background: '#f1f5f9',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}>Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((s) => (
                      <tr key={s.empNo} style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'background-color 0.2s ease'
                      }}>
                        <td style={{ padding: '1rem' }}>{s.empNo}</td>
                        <td style={{ padding: '1rem' }}>{s.name}</td>
                        <td style={{ padding: '1rem' }}>{s.designation}</td>
                        <td style={{ padding: '1rem' }}>{s.availability}</td>
                        <td style={{ padding: '1rem' }}>
                          <select
                            className="input"
                            value={staffAssignments[s.empNo] || ""}
                            onChange={(e) => updateStaffAssignment(s.empNo, e.target.value)}
                            style={{
                              width: '100%',
                              height: '40px',
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '2px solid #e2e8f0',
                              background: '#ffffff',
                              color: '#0f172a',
                              outline: 'none',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif"
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
                  ← Previous
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={onReset}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#f8fafc',
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
                      e.target.style.backgroundColor = '#f1f5f9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Reset
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '10px 24px',
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
                    Submit Complaint
                  </button>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}