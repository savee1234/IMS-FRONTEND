import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./ComplaintForm.css";

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

export default function ComplaintFormModern() {
  const navigate = useNavigate();
  
  // Add state for tab navigation
  const [activeTab, setActiveTab] = useState(0);
  
  // ------- Dummy data (replace with real API data) --------
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
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
            setShowAddDetails(true);
          }
        } else {
          setNotFoundMsg(data.message || "Error searching for contact");
        }
      } else {
        // For name search, fetch matching contact persons from the configuration module
        const response = await fetch(`http://localhost:44354/api/organization-contact-persons/search-by-name?name=${encodeURIComponent(searchValue)}&limit=20`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            setSearchResult('found');
            // For simplicity, we'll use the first result
            const contact = data.data[0];
            update("contactName", contact.name);
            update("email", contact.email);
            update("mobile", contact.mobileNumber);
            update("officeMobile", contact.officeContactNumber);
            update("title", contact.title);
            update("organizationContactPersonId", contact._id);
          } else {
            setSearchResult('not_found');
            setNotFoundMsg("No contact found with that name");
          }
        } else {
          setNotFoundMsg("Error searching for contact");
        }
      }
    } catch (error) {
      console.error("Error searching contact:", error);
      setNotFoundMsg("Network error occurred while searching for contact");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.categoryType) {
      alert("Please select a category");
      return;
    }
    
    if (!form.contactName) {
      alert("Please enter contact name");
      return;
    }
    
    if (!form.mobile) {
      alert("Please enter mobile number");
      return;
    }
    
    if (!form.complaint) {
      alert("Please enter complaint details");
      return;
    }
    
    // Prepare data for submission
    const complaintData = {
      referenceNumber: form.requestRef,
      category: form.categoryType,
      organization: form.organization,
      solutionType: form.solutionType,
      solutionName: form.solutionName,
      onboardMedium: form.medium,
      mediumSource: form.mediumSource,
      complaint: form.complaint,
      contactPerson: {
        name: form.contactName,
        mobile: form.mobile,
        email: form.email,
        officeContactNumber: form.officeMobile,
        title: form.title
      },
      organizationContactPersonId: form.organizationContactPersonId,
      assignment: form.assignment,
      docRef: form.docRef,
      docSubject: form.docSubject,
      remarks: form.remarks,
      createdBy: 'complaint_system',
      createdByName: 'Complaint Management System'
    };
    
    try {
      const response = await fetch('http://localhost:44354/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitted(true);
        setComplaintId(data.data._id);
        alert("Complaint submitted successfully!");
        // Reset form
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
        // Generate new reference number
        const refNumber = generateReferenceNumber();
        setGeneratedRef(refNumber);
        update("requestRef", refNumber);
      } else {
        alert(data.message || "Error submitting complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Network error occurred while submitting complaint");
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
    setActiveTab(0); // Reset to first tab
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

  // Function to get SVG icons for form sections
  const getSectionIcon = (sectionName) => {
    const iconStyle = {
      width: '24px',
      height: '24px',
      color: '#0E3A7C',
      marginRight: '10px'
    };

    switch (sectionName) {
      case 'complaint':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'contact':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'assignment':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      {/* Form Section - Without Hero */}
      <section style={styles.formSection}>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Submit a New Complaint</h2>
            <p style={styles.formSubtitle}>
              Please fill in all required information to submit your complaint
            </p>
            
            {/* Tab Navigation */}
            <div style={styles.tabNavigation}>
              {['Request Details', 'Contact Information', 'Assignment Details'].map((tab, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.tab,
                    ...(activeTab === index ? styles.activeTab : {})
                  }}
                  onClick={() => setActiveTab(index)}
                >
                  <span style={styles.tabNumber}>{index + 1}</span>
                  <span style={styles.tabLabel}>{tab}</span>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} onReset={onReset}>
              {/* ======= TAB 0: Request Details ======= */}
              <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
                {/* Reference Number */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    {getSectionIcon('complaint')}
                    Reference Number
                  </label>
                  <input
                    type="text"
                    value={form.requestRef}
                    readOnly
                    style={{...styles.input, ...styles.viewField}}
                  />
                </div>
                
                {/* Category */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category *</label>
                  <select
                    value={form.categoryType}
                    onChange={(e) => update("categoryType", e.target.value)}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                {/* Organization */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Organization</label>
                  <select
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select Organization</option>
                    {loadingOrganizations ? (
                      <option disabled>Loading organizations...</option>
                    ) : (
                      organizations.map((org) => (
                        <option key={org._id} value={org.name}>{org.name}</option>
                      ))
                    )}
                  </select>
                </div>
                
                {/* Solution Type and Solution Name */}
                <div style={styles.grid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Solution Type</label>
                    <select
                      value={form.solutionType}
                      onChange={(e) => update("solutionType", e.target.value)}
                      style={styles.input}
                    >
                      <option value="">Select Solution Type</option>
                      {solutionTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Solution Name</label>
                    <select
                      value={form.solutionName}
                      onChange={(e) => update("solutionName", e.target.value)}
                      style={styles.input}
                      disabled={!form.solutionType}
                    >
                      <option value="">Select Solution</option>
                      {(form.solutionType ? filteredSolutions : solutions).map((solution, index) => (
                        <option key={index} value={solution}>{solution}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Medium and Medium Source */}
                <div style={styles.grid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Onboard Medium</label>
                    <select
                      value={form.medium}
                      onChange={(e) => update("medium", e.target.value)}
                      style={styles.input}
                    >
                      <option value="">Select Medium</option>
                      {mediums.map((med, index) => (
                        <option key={index} value={med}>{med}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Medium Source</label>
                    <select
                      value={form.mediumSource}
                      onChange={(e) => update("mediumSource", e.target.value)}
                      style={styles.input}
                    >
                      <option value="">Select Source</option>
                      {mediumSources.map((src, index) => (
                        <option key={index} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Complaint Details */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Complaint Details *</label>
                  <textarea
                    value={form.complaint}
                    onChange={(e) => update("complaint", e.target.value)}
                    style={{...styles.input, ...styles.textarea}}
                    placeholder="Please describe your complaint in detail..."
                    required
                  />
                </div>
              </div>
              
              {/* ======= TAB 1: Contact Information ======= */}
              <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
                {/* Contact Search Section */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Search Contact</label>
                  <div style={styles.searchRow}>
                    <div style={styles.searchInline}>
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        style={{...styles.input, width: '120px'}}
                      >
                        <option value="mobile">Mobile</option>
                        <option value="name">Name</option>
                      </select>
                      {searchType === 'mobile' ? (
                        <input
                          type="text"
                          value={form.searchMobile}
                          onChange={(e) => update("searchMobile", e.target.value)}
                          placeholder="Enter mobile number"
                          style={styles.input}
                        />
                      ) : (
                        <input
                          type="text"
                          value={nameSearch}
                          onChange={(e) => setNameSearch(e.target.value)}
                          placeholder="Enter name"
                          style={styles.input}
                        />
                      )}
                      <button
                        type="button"
                        onClick={onSearchContact}
                        style={styles.searchButton}
                        disabled={loadingMobiles}
                      >
                        {loadingMobiles ? 'Searching...' : 'Search'}
                      </button>
                    </div>
                  </div>
                  
                  {notFoundMsg && (
                    <div style={styles.note}>{notFoundMsg}</div>
                  )}
                  
                  {searchResult === 'not_found' && showAddDetails && (
                    <div style={styles.newContactForm}>
                      <h4 style={styles.newContactTitle}>New Contact Details</h4>
                      <div style={styles.grid}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Name *</label>
                          <input
                            type="text"
                            value={form.contactName}
                            onChange={(e) => update("contactName", e.target.value)}
                            style={styles.input}
                            required
                          />
                        </div>
                        
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Title</label>
                          <select
                            value={form.title}
                            onChange={(e) => update("title", e.target.value)}
                            style={styles.input}
                          >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Dr.">Dr.</option>
                          </select>
                        </div>
                      </div>
                      
                      <div style={styles.grid}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Email</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            style={styles.input}
                          />
                        </div>
                        
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Mobile *</label>
                          <input
                            type="text"
                            value={form.mobile}
                            onChange={(e) => update("mobile", e.target.value)}
                            style={styles.input}
                            required
                          />
                        </div>
                      </div>
                      
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Office Contact Number</label>
                        <input
                          type="text"
                          value={form.officeMobile}
                          onChange={(e) => update("officeMobile", e.target.value)}
                          style={styles.input}
                        />
                      </div>
                    </div>
                  )}
                  
                  {searchResult === 'found' && (
                    <div style={styles.foundContact}>
                      <h4 style={styles.foundContactTitle}>Contact Found</h4>
                      <div style={styles.contactDetails}>
                        <p><strong>Name:</strong> {form.contactName}</p>
                        <p><strong>Email:</strong> {form.email}</p>
                        <p><strong>Mobile:</strong> {form.mobile}</p>
                        {form.officeMobile && <p><strong>Office:</strong> {form.officeMobile}</p>}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Contact Details Section */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contact Name *</label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                
                <div style={styles.grid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Mobile *</label>
                    <input
                      type="text"
                      value={form.mobile}
                      onChange={(e) => update("mobile", e.target.value)}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Office Contact Number</label>
                  <input
                    type="text"
                    value={form.officeMobile}
                    onChange={(e) => update("officeMobile", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>
              
              {/* ======= TAB 2: Assignment Details ======= */}
              <div style={{ display: activeTab === 2 ? 'block' : 'none' }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Assignment</label>
                  <input
                    type="text"
                    value={form.assignment}
                    onChange={(e) => update("assignment", e.target.value)}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.grid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Document Reference</label>
                    <input
                      type="text"
                      value={form.docRef}
                      onChange={(e) => update("docRef", e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Document Subject</label>
                    <input
                      type="text"
                      value={form.docSubject}
                      onChange={(e) => update("docSubject", e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Remarks</label>
                  <textarea
                    value={form.remarks}
                    onChange={(e) => update("remarks", e.target.value)}
                    style={{...styles.input, ...styles.textarea}}
                    placeholder="Any additional remarks..."
                  />
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div style={styles.tabNavigationButtons}>
                <button 
                  type="button" 
                  onClick={prevTab}
                  style={{...styles.tabButton, ...styles.prevButton}}
                  disabled={activeTab === 0}
                >
                  Previous
                </button>
                {activeTab < 2 ? (
                  <button 
                    type="button" 
                    onClick={nextTab}
                    style={{...styles.tabButton, ...styles.nextButton}}
                  >
                    Next
                  </button>
                ) : (
                  <>
                    <button 
                      type="button" 
                      onClick={onReset}
                      style={{...styles.tabButton, ...styles.resetButton}}
                    >
                      Reset Form
                    </button>
                    <button 
                      type="submit" 
                      style={{...styles.tabButton, ...styles.submitButton}}
                    >
                      Submit Complaint
                    </button>
                    <button 
                      type="button" 
                      onClick={() => navigate('/')}
                      style={{...styles.tabButton, ...styles.cancelButton}}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif"
  },
  
  // Form Section (without hero)
  formSection: {
    padding: '15px 10px',
    backgroundColor: '#f8fafc'
  },
  formContainer: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  formCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(0, 0, 0, 0.02)',
    position: 'relative',
    overflow: 'hidden'
  },
  formTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#0E3A7C',
    marginBottom: '5px',
    textAlign: 'center',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
  },
  formSubtitle: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: '15px',
    textAlign: 'center',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  
  // Tab Navigation
  tabNavigation: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
    backgroundColor: '#f1f5f9',
    padding: '3px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
    border: '1px solid #e2e8f0'
  },
  tab: {
    flex: 1,
    padding: '8px 10px',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: '#64748b',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
  },
  activeTab: {
    backgroundColor: '#0E3A7C',
    color: 'white',
    fontWeight: '500',
    boxShadow: '0 1px 4px rgba(14, 58, 124, 0.15)'
  },
  tabNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontWeight: '500',
    fontSize: '0.7rem'
  },
  
  // Form Elements
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginBottom: '10px'
  },
  formGroup: {
    marginBottom: '12px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: 500,
    marginBottom: '4px',
    color: '#0E3A7C',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  input: {
    width: '100%',
    height: '36px',
    padding: '0.5rem 0.7rem',
    borderRadius: '5px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    color: '#0f172a',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontSize: '0.8rem',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.01)'
  },
  viewField: {
    background: '#f1f5f9',
    cursor: 'not-allowed'
  },
  textarea: {
    height: 'auto',
    minHeight: '70px',
    resize: 'vertical'
  },
  searchRow: {
    marginBottom: '8px'
  },
  searchInline: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center'
  },
  searchButton: {
    backgroundColor: '#0E3A7C',
    color: 'white',
    border: 'none',
    padding: '0.5rem 0.8rem',
    fontSize: '0.8rem',
    fontWeight: 500,
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  note: {
    fontSize: '11px',
    color: '#ef4444',
    borderLeft: '2px solid #ef4444',
    paddingLeft: '6px',
    background: '#fffbeb',
    padding: '0.4rem 0.4rem 0.4rem 0.6rem',
    borderRadius: '3px',
    fontWeight: 400,
    marginTop: '5px'
  },
  newContactForm: {
    background: '#f8fafc',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #e2e8f0',
    marginTop: '10px'
  },
  newContactTitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#0E3A7C',
    marginBottom: '8px',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  foundContact: {
    background: '#f0f9ff',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #bae6fd',
    marginTop: '10px'
  },
  foundContactTitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#0E3A7C',
    marginBottom: '8px',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  contactDetails: {
    fontSize: '0.8rem',
    color: '#334155'
  },
  
  // Tab Navigation Buttons
  tabNavigationButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #e2e8f0'
  },
  tabButton: {
    border: 'none',
    padding: '8px 16px',
    fontSize: '0.8rem',
    fontWeight: 500,
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  prevButton: {
    backgroundColor: '#94a3b8',
    color: 'white'
  },
  nextButton: {
    backgroundColor: '#0E3A7C',
    color: 'white',
    boxShadow: '0 1px 3px rgba(14, 58, 124, 0.1)'
  },
  resetButton: {
    backgroundColor: '#64748b',
    color: 'white'
  },
  submitButton: {
    backgroundColor: '#F8991D',
    color: '#0E3A7C',
    boxShadow: '0 1px 3px rgba(248, 153, 29, 0.15)'
  },
  cancelButton: {
    backgroundColor: '#64748b',
    color: 'white'
  },
  
  // Responsive
  '@media (max-width: 768px)': {
    formCard: {
      padding: '12px'
    },
    grid: {
      gridTemplateColumns: '1fr'
    },
    tabNavigation: {
      flexDirection: 'column',
      gap: '3px'
    },
    tabNavigationButtons: {
      flexDirection: 'column',
      gap: '6px'
    },
    tabButton: {
      width: '100%'
    }
  }
};
