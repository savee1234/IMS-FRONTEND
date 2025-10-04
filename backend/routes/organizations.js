const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');

// GET all organizations
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    // Build query filter
    let filter = { isActive: true };
    
    if (search) {
      filter.$or = [
        { organization: { $regex: search, $options: 'i' } },
        { organizationType: { $regex: search, $options: 'i' } },
        { organizationId: { $regex: search, $options: 'i' } },
        { createdByName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const [organizations, total] = await Promise.all([
      Organization.find(filter)
        .sort({ createdDtm: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Organization.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: organizations,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / limit),
        count: total,
        limit: Number(limit)
      }
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

// GET single organization by ID
router.get('/:id', async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    
    if (!organization || !organization.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }
    
    res.json({
      success: true,
      data: organization
    });
  } catch (error) {
    console.error('Error fetching organization:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch organization',
      error: error.message
    });
  }
});

// CREATE new organization
router.post('/', async (req, res) => {
  try {
    const {
      organization,
      organizationType,
      createdBy,
      createdByName
    } = req.body;
    
    // Validate required fields
    if (!organization || !organizationType || !createdBy || !createdByName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: organization, organizationType, createdBy, createdByName'
      });
    }
    
    // Validate organization type
    const validTypes = ['Type 1', 'Type 2', 'Type 3'];
    if (!validTypes.includes(organizationType)) {
      return res.status(400).json({
        success: false,
        message: 'Organization type must be one of: Type 1, Type 2, Type 3'
      });
    }
    
    // Check for duplicate organization name
    const existingOrg = await Organization.findOne({
      organization: { $regex: new RegExp(`^${organization.trim()}$`, 'i') },
      isActive: true
    });
    
    if (existingOrg) {
      return res.status(400).json({
        success: false,
        message: 'An organization with this name already exists'
      });
    }
    
    const newOrganization = new Organization({
      organization: organization.trim(),
      organizationType,
      createdBy,
      createdByName
    });
    
    await newOrganization.save();
    
    res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      data: newOrganization
    });
  } catch (error) {
    console.error('Error creating organization:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create organization',
      error: error.message
    });
  }
});

// UPDATE organization
router.put('/:id', async (req, res) => {
  try {
    const {
      organization,
      organizationType
    } = req.body;
    
    const existingOrg = await Organization.findById(req.params.id);
    
    if (!existingOrg || !existingOrg.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }
    
    // Validate organization type if provided
    if (organizationType) {
      const validTypes = ['Type 1', 'Type 2', 'Type 3'];
      if (!validTypes.includes(organizationType)) {
        return res.status(400).json({
          success: false,
          message: 'Organization type must be one of: Type 1, Type 2, Type 3'
        });
      }
    }
    
    // Check for duplicate organization name if it's being changed
    if (organization && organization.trim() !== existingOrg.organization) {
      const duplicateOrg = await Organization.findOne({
        organization: { $regex: new RegExp(`^${organization.trim()}$`, 'i') },
        isActive: true,
        _id: { $ne: req.params.id }
      });
      
      if (duplicateOrg) {
        return res.status(400).json({
          success: false,
          message: 'An organization with this name already exists'
        });
      }
    }
    
    // Update fields
    if (organization) existingOrg.organization = organization.trim();
    if (organizationType) existingOrg.organizationType = organizationType;
    
    await existingOrg.save();
    
    res.json({
      success: true,
      message: 'Organization updated successfully',
      data: existingOrg
    });
  } catch (error) {
    console.error('Error updating organization:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update organization',
      error: error.message
    });
  }
});

// DELETE organization
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await Organization.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    res.json({ success: true, message: 'Organization deleted' });
  } catch (error) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ success: false, message: 'Failed to delete organization', error: error.message });
  }
});

module.exports = router;