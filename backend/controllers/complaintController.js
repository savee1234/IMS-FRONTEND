const Complaint = require("../models/Complaint");
const OrganizationContactPerson = require("../models/OrganizationContactPerson");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const complaintData = { ...req.body };
    console.log('Received complaint data:', complaintData);

    // Handle contact person search/creation logic
    if (complaintData.contactName && complaintData.email && complaintData.mobile) {
      console.log('Processing contact person search/creation...');

      // First, try to find existing contact by mobile number
      let contactPerson = await OrganizationContactPerson.findOne({
        mobileNumber: complaintData.mobile,
        isActive: true
      });

      if (contactPerson) {
        console.log('Found existing contact person:', contactPerson._id);
        complaintData.organizationContactPersonId = contactPerson._id;
      } else {
        // Contact doesn't exist, create new one
        console.log('Creating new contact person...');

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
        console.log('Created new contact person:', newContactPerson._id);

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

    console.log('Creating complaint with data:', complaintData);
    const complaint = await Complaint.create(complaintData);
    console.log('Complaint created successfully:', complaint);
    res.status(201).json(complaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({
      message: "Error creating complaint",
      error: error.message,
      details: error.stack
    });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('organizationContactPersonId', 'name organizationName email mobileNumber')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

module.exports = { createComplaint, getAllComplaints };
