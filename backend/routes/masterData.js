const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');

// GET - Get all system organizations
router.get('/GetSystemOrganization', async (req, res) => {
  try {
    const organizations = await Organization.findAll({
      order: [['CREATED_DTM', 'DESC']]
    });
    
    res.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch organizations',
      details: error.message 
    });
  }
});

// POST - Save new system organization
router.post('/SaveSystemOrganization', async (req, res) => {
  try {
    const { organization, organizationId, organizationType } = req.body;
    
    // Validation
    if (!organization || !organizationId || !organizationType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['organization', 'organizationId', 'organizationType']
      });
    }

    // Check if organization ID already exists
    const existingOrg = await Organization.findByPk(organizationId);
    if (existingOrg) {
      return res.status(409).json({ 
        error: 'Organization ID already exists' 
      });
    }

    // Create new organization
    const newOrganization = await Organization.create({
      ORGANIZATION_ID: organizationId,
      ORGANIZATION: organization,
      ORGANIZATION_TYPE: organizationType,
      CREATED_BY: '015777', // Default user ID - replace with actual user from auth
      CREATED_BY_NAME: 'Romaine Murcott', // Default user name - replace with actual user from auth
      CREATED_DTM: new Date()
    });

    res.status(201).json({ 
      message: 'System Organization Successfully Saved',
      organization: newOrganization
    });
  } catch (error) {
    console.error('Error saving organization:', error);
    res.status(500).json({ 
      error: 'Failed to save organization',
      details: error.message 
    });
  }
});

// PUT - Update organization
router.put('/UpdateSystemOrganization/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { organization, organizationType } = req.body;
    
    const org = await Organization.findByPk(id);
    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    await org.update({
      ORGANIZATION: organization,
      ORGANIZATION_TYPE: organizationType
    });

    res.json({ 
      message: 'Organization updated successfully',
      organization: org
    });
  } catch (error) {
    console.error('Error updating organization:', error);
    res.status(500).json({ 
      error: 'Failed to update organization',
      details: error.message 
    });
  }
});

// DELETE - Delete organization (soft delete)
router.delete('/DeleteSystemOrganization/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const org = await Organization.findByPk(id);
    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Soft delete - mark as ended
    await org.update({
      ENDED_BY: '015777', // Default user ID - replace with actual user from auth
      ENDED_BY_NAME: 'Romaine Murcott', // Default user name - replace with actual user from auth
      END_DTM: new Date()
    });

    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ 
      error: 'Failed to delete organization',
      details: error.message 
    });
  }
});

module.exports = router;
