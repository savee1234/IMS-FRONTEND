const Complaint = require("../models/Complaint");
const OrganizationContactPerson = require("../models/OrganizationContactPerson");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const complaintData = { ...req.body };

    // Handle contact person search/creation logic
    if (complaintData.contactName && complaintData.email && complaintData.mobile) {

      // First, try to find existing contact by mobile number
      let contactPerson = await OrganizationContactPerson.findOne({
        mobileNumber: complaintData.mobile,
        isActive: true
      });

      if (contactPerson) {
        complaintData.organizationContactPersonId = contactPerson._id;
      } else {
        // Contact doesn't exist, create new one

        // Find organization by name if provided
        let organizationId = null;
        if (complaintData.organization) {
          const Organization = require('../models/Organization');
          const organization = await Organization.findOne({
            organization: { $regex: complaintData.organization, $options: 'i' },
            isActive: true
          });

          if (organization) {
            organizationId = organization._id;
          }
        }

        // Create new contact person
        const newContactPerson = new OrganizationContactPerson({
          name: complaintData.contactName,
          title: complaintData.title || '',
          organizationId: organizationId,
          organizationName: complaintData.organization || 'Unknown',
          email: complaintData.email,
          mobileNumber: complaintData.mobile,
          officeContactNumber: complaintData.officeMobile || '',
          callingName: complaintData.contactName,
          createdBy: 'system', // You might want to get this from auth
          createdByName: 'System'
        });

        await newContactPerson.save();
        complaintData.organizationContactPersonId = newContactPerson._id;
      }

      // Populate contact fields from the organization contact person
      if (complaintData.organizationContactPersonId) {
        const finalContactPerson = await OrganizationContactPerson.findById(complaintData.organizationContactPersonId);
        if (finalContactPerson) {
          complaintData.contactName = finalContactPerson.name;
          complaintData.email = finalContactPerson.email;
          complaintData.mobile = finalContactPerson.mobileNumber;
          complaintData.officeMobile = finalContactPerson.officeContactNumber;
          complaintData.title = finalContactPerson.title;

          if (!complaintData.organization && finalContactPerson.organizationName) {
            complaintData.organization = finalContactPerson.organizationName;
          }
        }
      }
    }

    const complaint = await Complaint.create(complaintData);
    
    // Populate assignments and contact person
    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('organizationContactPersonId', 'name organizationName email mobileNumber')
      .populate('assignments', 'Assignment assignedBy assignedTo');
    
    res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: populatedComplaint
    });
  } catch (error) {
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A complaint with this reference already exists",
        error: "Duplicate reference number"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Error creating complaint",
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('organizationContactPersonId', 'name organizationName email mobileNumber')
      .populate('assignments', 'Assignment assignedBy assignedTo')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Complaints fetched successfully",
      data: complaints
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching complaints", 
      error: error.message 
    });
  }
};

module.exports = { createComplaint, getAllComplaints };
