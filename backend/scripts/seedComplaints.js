const mongoose = require('mongoose');
const Complaint = require('../models/Complaint');
const { connectDB } = require('../config/database');

// Sample complaint data
const sampleComplaints = [
  {
    requestRef: "REQ-001",
    categoryType: "Billing",
    organization: "SLT",
    solutionName: "Pending",
    medium: "Hotline",
    mediumSource: "Customer",
    complaint: "Customer is facing issues with billing amount",
    searchMobile: "0771234567",
    contactName: "John Doe",
    email: "john.doe@example.com",
    mobile: "0771234567",
    officeMobile: "0112345678",
    title: "Mr.",
    mainAssignment: "Field Visit",
    subAssignment: "Billing Team",
    docRef: "DOC-001",
    docSubject: "Billing Issue",
    remarks: "Customer needs immediate attention"
  },
  {
    requestRef: "REQ-002",
    categoryType: "Technical",
    organization: "Mobitel",
    solutionName: "In Progress",
    medium: "Email",
    mediumSource: "Field Ops",
    complaint: "Internet connectivity issues in the area",
    searchMobile: "0771234568",
    contactName: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "0771234568",
    officeMobile: "0112345679",
    title: "Ms.",
    mainAssignment: "Remote Fix",
    subAssignment: "Tech Support",
    docRef: "DOC-002",
    docSubject: "Connectivity Issue",
    remarks: "Area affected for 3 days"
  }
];

async function seedComplaints() {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing complaints
    await Complaint.deleteMany({});
    console.log('Cleared existing complaints');
    
    // Insert sample complaints
    for (const complaintData of sampleComplaints) {
      const complaint = new Complaint(complaintData);
      await complaint.save();
      console.log(`Created complaint: ${complaint.requestRef}`);
    }
    
    console.log('Complaint seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding complaints:', error);
    process.exit(1);
  }
}

seedComplaints();