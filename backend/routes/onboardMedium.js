const express = require('express');
const router = express.Router();
const OnboardMedium = require('../models/OnboardMedium');

// GET all active onboard mediums with optional search and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = { isActive: true };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { onboardMediumId: { $regex: search, $options: 'i' } },
        { createdByName: { $regex: search, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      OnboardMedium.find(filter).sort({ createdDtm: -1 }).skip(skip).limit(Number(limit)),
      OnboardMedium.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: items,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / Number(limit)),
        count: total,
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching onboard mediums:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch onboard mediums', error: error.message });
  }
});

// CREATE onboard medium
router.post('/', async (req, res) => {
  try {
    let { name, createdBy, createdByName } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Required field: name' });
    }
    name = String(name).trim();
    // Fallback defaults to avoid client-side omissions breaking creation
    createdBy = createdBy || 'system';
    createdByName = createdByName || 'System';

    const dup = await OnboardMedium.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, isActive: true });
    if (dup) {
      return res.status(400).json({ success: false, message: 'An onboard medium with this name already exists' });
    }

    const doc = new OnboardMedium({ name, createdBy, createdByName });
    await doc.save();
    return res.status(201).json({ success: true, message: 'Onboard medium created', data: doc });
  } catch (error) {
    console.error('Error creating onboard medium:', error);
    res.status(500).json({ success: false, message: 'Failed to create onboard medium', error: error.message });
  }
});

// UPDATE onboard medium
router.put('/:id', async (req, res) => {
  try {
    let { name } = req.body;
    const id = req.params.id;

    const doc = await OnboardMedium.findById(id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Onboard medium not found' });
    }

    if (name) {
      name = String(name).trim();
      if (name && name !== doc.name) {
        const dup = await OnboardMedium.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, isActive: true, _id: { $ne: id } });
        if (dup) {
          return res.status(400).json({ success: false, message: 'An onboard medium with this name already exists' });
        }
        doc.name = name;
      }
    }

    await doc.save();
    res.json({ success: true, message: 'Onboard medium updated', data: doc });
  } catch (error) {
    console.error('Error updating onboard medium:', error);
    res.status(500).json({ success: false, message: 'Failed to update onboard medium', error: error.message });
  }
});

// DELETE onboard medium 
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await OnboardMedium.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Onboard medium not found' });
    }

    res.json({ success: true, message: 'Onboard medium deleted' });
  } catch (error) {
    console.error('Error deleting onboard medium:', error);
    res.status(500).json({ success: false, message: 'Failed to delete onboard medium', error: error.message });
  }
});

module.exports = router;