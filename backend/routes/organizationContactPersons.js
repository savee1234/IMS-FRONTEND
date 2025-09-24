const express = require('express');
const router = express.Router();
const OrganizationContactPerson = require('../models/OrganizationContactPerson');
const Organization = require('../models/Organization');

// GET all organization contact persons
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, organizationId, search } = req.query;
    
    // Build query filter
    let filter = { isActive: true };
    
    if (organizationId) {
      filter.organizationId = organizationId;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { contactPersonId: { $regex: search, $options: 'i' } },
        { callingName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const [contactPersons, total] = await Promise.all([
      OrganizationContactPerson.find(filter)
        .populate('organizationId', 'organizationId organization organizationType')
        .sort({ createdDtm: -1 })
        .skip(skip)
        .limit(Number(limit)),
      OrganizationContactPerson.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: contactPersons,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / limit),
        count: total,
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching organization contact persons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch organization contact persons',
      error: error.message
    });
  }
});

// GET single organization contact person by ID
router.get('/:id', async (req, res) => {
  try {
    const contactPerson = await OrganizationContactPerson.findById(req.params.id)
      .populate('organizationId', 'organization organizationType');
    
    if (!contactPerson || !contactPerson.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Organization contact person not found'
      });
    }
    
    res.json({
      success: true,
      data: contactPerson
    });
  } catch (error) {
    console.error('Error fetching organization contact person:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch organization contact person',
      error: error.message
    });
  }
});

// CREATE new organization contact person
router.post('/', async (req, res) => {
  try {
    const {
      name,
      title,
      organizationId,
      organizationName,
      email,
      mobileNumber,
      officeContactNumber,
      callingName,
      createdBy,
      createdByName
    } = req.body;
    
    // Validate required fields
    if (!name || !organizationId || !email || !createdBy || !createdByName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, organizationId, email, createdBy, createdByName'
      });
    }
    
    // Check if organization exists
    const organization = await Organization.findById(organizationId);
    if (!organization || !organization.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or inactive organization'
      });
    }
    
    // Check for duplicate email within the same organization
    const existingContact = await OrganizationContactPerson.findOne({
      email: email.toLowerCase(),
      organizationId,
      isActive: true
    });
    
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'A contact person with this email already exists for this organization'
      });
    }
    
    const contactPerson = new OrganizationContactPerson({
      name: name.trim(),
      title: title ? title.trim() : '',
      organizationId,
      organizationName: organizationName || organization.organization,
      email: email.toLowerCase(),
      mobileNumber: mobileNumber ? mobileNumber.trim() : '',
      officeContactNumber: officeContactNumber ? officeContactNumber.trim() : '',
      callingName: callingName ? callingName.trim() : '',
      createdBy,
      createdByName
    });
    
    await contactPerson.save();
    
    // Populate organization details before returning
    await contactPerson.populate('organizationId', 'organizationId organization organizationType');
    
    res.status(201).json({
      success: true,
      message: 'Organization contact person created successfully',
      data: contactPerson
    });
  } catch (error) {
    console.error('Error creating organization contact person:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create organization contact person',
      error: error.message
    });
  }
});

// UPDATE organization contact person
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      title,
      organizationId,
      organizationName,
      email,
      mobileNumber,
      officeContactNumber,
      callingName
    } = req.body;
    
    const contactPerson = await OrganizationContactPerson.findById(req.params.id);
    
    if (!contactPerson || !contactPerson.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Organization contact person not found'
      });
    }
    
    // If organizationId is being changed, validate it
    if (organizationId && organizationId !== contactPerson.organizationId.toString()) {
      const organization = await Organization.findById(organizationId);
      if (!organization || !organization.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or inactive organization'
        });
      }
    }
    
    // Check for duplicate email if email is being changed
    if (email && email !== contactPerson.email) {
      const existingContact = await OrganizationContactPerson.findOne({
        email,
        organizationId: organizationId || contactPerson.organizationId,
        isActive: true,
        _id: { $ne: req.params.id }
      });
      
      if (existingContact) {
        return res.status(400).json({
          success: false,
          message: 'A contact person with this email already exists for this organization'
        });
      }
    }
    
    // Update fields
    if (name) contactPerson.name = name;
    if (title !== undefined) contactPerson.title = title;
    if (organizationId) contactPerson.organizationId = organizationId;
    if (organizationName) contactPerson.organizationName = organizationName;
    if (email) contactPerson.email = email;
    if (mobileNumber !== undefined) contactPerson.mobileNumber = mobileNumber;
    if (officeContactNumber !== undefined) contactPerson.officeContactNumber = officeContactNumber;
    if (callingName !== undefined) contactPerson.callingName = callingName;
    
    await contactPerson.save();
    
    // Populate organization details before returning
    await contactPerson.populate('organizationId', 'organization organizationType');
    
    res.json({
      success: true,
      message: 'Organization contact person updated successfully',
      data: contactPerson
    });
  } catch (error) {
    console.error('Error updating organization contact person:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update organization contact person',
      error: error.message
    });
  }
});

// SOFT DELETE organization contact person
router.delete('/:id', async (req, res) => {
  try {
    const { endedBy, endedByName } = req.body;
    
    if (!endedBy || !endedByName) {
      return res.status(400).json({
        success: false,
        message: 'endedBy and endedByName are required for deletion'
      });
    }
    
    const contactPerson = await OrganizationContactPerson.findById(req.params.id);
    
    if (!contactPerson || !contactPerson.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Organization contact person not found'
      });
    }
    
    // Soft delete
    contactPerson.isActive = false;
    contactPerson.endedBy = endedBy;
    contactPerson.endedByName = endedByName;
    contactPerson.endDtm = new Date();
    
    await contactPerson.save();
    
    res.json({
      success: true,
      message: 'Organization contact person deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting organization contact person:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete organization contact person',
      error: error.message
    });
  }
});

// GET organizations for dropdown
router.get('/dropdown/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find(
      { isActive: true },
      { _id: 1, organizationId: 1, organization: 1, organizationType: 1 }
    ).sort({ organization: 1 });
    
    res.json({
      success: true,
      data: organizations
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch organizations',
      error: error.message
    });
  }
});

module.exports = router;