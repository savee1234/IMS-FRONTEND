const mongoose = require('mongoose');
const Complaint = require('../models/Complaint');
const { connectDB } = require('../config/database');

async function testComplaints() {
  try {
    // Connect to database
    await connectDB();
    
    // Create a sample complaint
    const sampleComplaint = {
      requestRef: "TEST-002",
      categoryType: "Billing",
      organization: "Mobitel",
      solutionName: "In Progress",
      medium: "Hotline",
      mediumSource: "Field Ops",
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
    };
    
    const complaint = new Complaint(sampleComplaint);
    const savedComplaint = await complaint.save();
    console.log('Created complaint:', savedComplaint.requestRef);
    
    // Retrieve all complaints
    const complaints = await Complaint.find();
    console.log(`Found ${complaints.length} complaints`);
    
    // Retrieve specific complaint
    const specificComplaint = await Complaint.findById(savedComplaint._id);
    console.log('Retrieved complaint:', specificComplaint.requestRef);
    
    console.log('Complaint testing completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error testing complaints:', error);
    process.exit(1);
  }
}

testComplaints();