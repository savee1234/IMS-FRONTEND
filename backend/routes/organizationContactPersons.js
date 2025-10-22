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
    
    // Handle show all case (limit=1000)
    const isShowAll = limit === '1000';
    const actualLimit = isShowAll ? 1000 : Number(limit);
    const skip = isShowAll ? 0 : (page - 1) * actualLimit;

    const [contactPersons, total] = await Promise.all([
      OrganizationContactPerson.find(filter)
        .populate('organizationId', 'organizationId organization organizationType')
        .sort({ createdDtm: -1 })
        .skip(skip)
        .limit(actualLimit),
      OrganizationContactPerson.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: contactPersons,
      pagination: isShowAll ? null : {
        current: Number(page),
        total: Math.ceil(total / actualLimit),
        count: total,
        limit: actualLimit
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

// Search contact persons for complaint form
router.get('/search-for-complaint', async (req, res) => {
  try {
    const { search, mobile, organization } = req.query;

    let filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { callingName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (mobile) {
      filter.mobileNumber = { $regex: mobile, $options: 'i' };
    }

    if (organization) {
      filter.organizationName = { $regex: organization, $options: 'i' };
    }

    const contacts = await OrganizationContactPerson.find(filter)
      .populate('organizationId', 'organization organizationType')
      .select('name email mobileNumber officeContactNumber title organizationName callingName contactPersonId')
      .sort({ name: 1 })
      .limit(20);

    // Format for frontend dropdown
    const formattedContacts = contacts.map(contact => ({
      id: contact._id,
      contactPersonId: contact.contactPersonId,
      name: contact.name,
      email: contact.email,
      mobile: contact.mobileNumber,
      officeMobile: contact.officeContactNumber,
      title: contact.title,
      organization: contact.organizationName,
      callingName: contact.callingName,
      label: `${contact.name} (${contact.organizationName}) - ${contact.mobileNumber || contact.email}`
    }));

    res.json({
      success: true,
      data: formattedContacts,
      count: formattedContacts.length
    });
  } catch (error) {
    console.error('Error searching contacts for complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search contacts',
      error: error.message
    });
  }
});

// Search contact by name
router.get('/search-by-name', async (req, res) => {
  try {
    const { name, limit = 10 } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required for search'
      });
    }

    const contacts = await OrganizationContactPerson.find({
      isActive: true,
      $or: [
        { name: { $regex: name, $options: 'i' } },
        { callingName: { $regex: name, $options: 'i' } }
      ]
    })
    .populate('organizationId', 'organization organizationType')
    .sort({ name: 1 })
    .limit(Number(limit));

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    console.error('Error searching contacts by name:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search contacts by name',
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

// GET contact persons with mobile numbers for dropdown
router.get('/dropdown/mobile-numbers', async (req, res) => {
  try {
    const { organizationId } = req.query;

    // Build filter for active contact persons with mobile numbers
    let filter = {
      isActive: true,
      mobileNumber: { $exists: true, $ne: null, $ne: '' }
    };

    if (organizationId) {
      filter.organizationId = organizationId;
    }

    const contactPersons = await OrganizationContactPerson.find(filter)
      .populate('organizationId', 'organization organizationType')
      .select('name mobileNumber officeContactNumber email title organizationName callingName')
      .sort({ organizationName: 1, name: 1 });

    // Format data for dropdown (value: mobileNumber, label: name + organization)
    const mobileOptions = contactPersons.map(person => ({
      value: person.mobileNumber,
      label: `${person.name} (${person.organizationName}) - ${person.mobileNumber}`,
      contactPerson: {
        name: person.name,
        email: person.email,
        mobile: person.mobileNumber,
        officeMobile: person.officeContactNumber,
        title: person.title,
        organization: person.organizationName,
        callingName: person.callingName
      }
    }));

    res.json({
      success: true,
      data: mobileOptions
    });
  } catch (error) {
    console.error('Error fetching mobile numbers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mobile numbers',
      error: error.message
    });
  }
});


// Search contact by mobile number and create if not found
router.post('/search-or-create', async (req, res) => {
  try {
    const { mobileNumber, contactData, organizationId, createdBy, createdByName } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    // First, try to find existing contact
    let contactPerson = await OrganizationContactPerson.findOne({
      mobileNumber: mobileNumber,
      isActive: true
    });

    if (contactPerson) {
      // Contact exists, return existing data
      await contactPerson.populate('organizationId', 'organization organizationType');
      return res.json({
        success: true,
        found: true,
        data: contactPerson
      });
    }

    // Contact doesn't exist, check if we have data to create new contact
    if (!contactData || !contactData.name || !contactData.email) {
      return res.status(404).json({
        success: false,
        found: false,
        message: 'Contact not found. Please provide name and email to create new contact.'
      });
    }

    // Validate organization if provided
    let finalOrganizationId = organizationId;
    if (organizationId) {
      const organization = await Organization.findById(organizationId);
      if (!organization || !organization.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or inactive organization'
        });
      }
    } else {
      // If no organization provided, try to find a default organization
      const defaultOrg = await Organization.findOne({ isActive: true });
      if (defaultOrg) {
        finalOrganizationId = defaultOrg._id;
      } else {
        return res.status(400).json({
          success: false,
          message: 'No active organizations found. Please create an organization first.'
        });
      }
    }

    // Create new contact person
    const newContactPerson = new OrganizationContactPerson({
      name: contactData.name.trim(),
      title: contactData.title ? contactData.title.trim() : '',
      organizationId: finalOrganizationId,
      organizationName: contactData.organization || 'Unknown',
      email: contactData.email.toLowerCase(),
      mobileNumber: mobileNumber,
      officeContactNumber: contactData.officeMobile ? contactData.officeMobile.trim() : '',
      callingName: contactData.callingName || contactData.name.trim(),
      createdBy,
      createdByName
    });

    await newContactPerson.save();

    // Populate organization details before returning
    if (newContactPerson.organizationId) {
      await newContactPerson.populate('organizationId', 'organization organizationType');
    }

    res.status(201).json({
      success: true,
      found: false,
      created: true,
      message: `New contact person "${newContactPerson.name}" created successfully`,
      data: newContactPerson
    });
  } catch (error) {
    console.error('Error in search-or-create contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search or create contact person',
      error: error.message
    });
  }
});

module.exports = router;