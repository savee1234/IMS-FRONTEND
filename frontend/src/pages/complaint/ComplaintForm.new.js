import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css";

export default function ComplaintOnboarding() {
  const navigate = useNavigate();


  
  // ------- Dummy data (replace with real API data) --------
  // const organizations = ["SLT", "Mobitel", "ABC Pvt Ltd", "Other"]; // Removed hardcoded data
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
    mainAssignment: "",
    subAssignment: "",
    docRef: "",
    docSubject: "",
    remarks: ""
  });

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

  // Generate reference number when component mounts
  useEffect(() => {
    const refNumber = generateReferenceNumber();
    setGeneratedRef(refNumber);
    setForm(prev => ({ ...prev, requestRef: refNumber }));
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

  // ------- Handlers --------
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onContactPersonSelect = async (contactPersonId) => {
    setSelectedContactPerson(contactPersonId);
    try {
      const response = await fetch(`http://localhost:44354/api/organization-contact-persons/${contactPersonId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const person = data.data;
          update("contactName", person.name);
          update("email", person.email);
          update("mobile", person.mobileNumber);
          update("officeMobile", person.officeContactNumber);
          update("title", person.title);
          update("organizationContactPersonId", person._id);
        }
      }
    } catch (error) {
      console.error('Error fetching contact person details:', error);
    }
  };

  const onSearchContact = async () => {
    if (!form.mobile && !nameSearch) {
      setNotFoundMsg("Please enter a mobile number or name to search");
      return;
    }

    try {
      const searchQuery = searchType === 'mobile' ? form.mobile : nameSearch;
      const response = await fetch(`http://localhost:44354/api/organization-contact-persons/search?${searchType}=${searchQuery}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setSearchResult('found');
          update("contactName", data.data.name);
          update("email", data.data.email);
          update("mobile", data.data.mobileNumber);
          update("officeMobile", data.data.officeContactNumber);
          update("title", data.data.title);
          update("organizationContactPersonId", data.data._id);
          setNotFoundMsg("");
        } else {
          setSearchResult('not_found');
          setShowAddDetails(true);
          setNotFoundMsg(`No contact found with this ${searchType}. Please add details.`);
        }
      }
    } catch (error) {
      console.error('Error searching contact:', error);
      setNotFoundMsg("Error searching contact. Please try again.");
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
      mainAssignment: "",
      subAssignment: "",
      docRef: "",
      docSubject: "",
      remarks: ""
    });
    setNotFoundMsg("");
    setGeneratedRef("");
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
    setSubmitted(false);
    setComplaintId(null);
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
          console.log('New contact created:', createData.data);

          // Update form with the created contact details
          if (createData.created) {
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

      console.log('Submitting complaint data:', submissionData);

      const response = await fetch("http://localhost:44354/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Submission failed:', response.status, errorText);
        throw new Error(`Submission failed: ${response.status} ${errorText}`);
      }

      const savedComplaint = await response.json();
      console.log('Complaint saved successfully:', savedComplaint);
      setComplaintId(savedComplaint.data._id);
      setSubmitted(true);

      // The backend should generate and return the requestRef
      const referenceNumber = savedComplaint.data.requestRef || "Generated";
      setGeneratedRef(referenceNumber);

      alert(`Complaint submitted successfully! Reference: ${referenceNumber}`);
      
      // Don't reset form if you want to show the success state
      // onReset();
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error submitting complaint: ${error.message}`);
    }
  };

  const onViewComplaint = () => {
    navigate('/my-tasks');
  };

  // Component render code...
  // The rest of your JSX code here...
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`field ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}