const express = require('express');
const router = express.Router();
const OperationAvailability = require('../models/OperationAvailability');

// GET all operation availability entries
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let filter = { isActive: true };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { operationAvailabilityId: { $regex: search, $options: 'i' } },
        { createdByName: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      OperationAvailability.find(filter)
        .sort({ createdDtm: -1 })
        .skip(skip)
        .limit(Number(limit)),
      OperationAvailability.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: items,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / limit),
        count: total,
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching operation availability:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch operation availability', error: error.message });
  }
});

// GET single by database _id
router.get('/:id', async (req, res) => {
  try {
    const doc = await OperationAvailability.findById(req.params.id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    console.error('Error fetching operation availability item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch item', error: error.message });
  }
});

// CREATE operation availability
router.post('/', async (req, res) => {
  try {
    const { name, isAvailable = true, createdBy, createdByName } = req.body;

    if (!name || !createdBy || !createdByName) {
      return res.status(400).json({ success: false, message: 'Required fields: name, createdBy, createdByName' });
    }

    // Check duplicate by name (active)
    const existing = await OperationAvailability.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      isActive: true
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An entry with this name already exists' });
    }

    const newItem = new OperationAvailability({
      name: name.trim(),
      isAvailable: Boolean(isAvailable),
      createdBy,
      createdByName
    });

    await newItem.save();
    res.status(201).json({ success: true, message: 'Operation availability created successfully', data: newItem });
  } catch (error) {
    console.error('Error creating operation availability:', error);
    res.status(500).json({ success: false, message: 'Failed to create operation availability', error: error.message });
  }
});

// UPDATE operation availability
router.put('/:id', async (req, res) => {
  try {
    const { name, isAvailable } = req.body;

    const doc = await OperationAvailability.findById(req.params.id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    if (name && name.trim() !== doc.name) {
      const duplicate = await OperationAvailability.findOne({
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
        isActive: true,
        _id: { $ne: req.params.id }
      });
      if (duplicate) {
        return res.status(400).json({ success: false, message: 'An entry with this name already exists' });
      }
    }

    if (name) doc.name = name.trim();
    if (typeof isAvailable === 'boolean') doc.isAvailable = isAvailable;

    await doc.save();
    res.json({ success: true, message: 'Operation availability updated successfully', data: doc });
  } catch (error) {
    console.error('Error updating operation availability:', error);
    res.status(500).json({ success: false, message: 'Failed to update operation availability', error: error.message });
  }
});

// SOFT DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { endedBy, endedByName } = req.body;
    if (!endedBy || !endedByName) {
      return res.status(400).json({ success: false, message: 'endedBy and endedByName are required for deletion' });
    }

    const doc = await OperationAvailability.findById(req.params.id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    doc.isActive = false;
    doc.endedBy = endedBy;
    doc.endedByName = endedByName;
    doc.endDtm = new Date();
    await doc.save();

    res.json({ success: true, message: 'Operation availability deleted successfully' });
  } catch (error) {
    console.error('Error deleting operation availability:', error);
    res.status(500).json({ success: false, message: 'Failed to delete operation availability', error: error.message });
  }
});

// RESET: remove existing active data and insert new list
// Body: { items: [{ name, isAvailable }], createdBy, createdByName }
router.post('/reset', async (req, res) => {
  const session = await OperationAvailability.startSession();
  session.startTransaction();
  try {
    const { items, createdBy, createdByName } = req.body;

    if (!Array.isArray(items) || !createdBy || !createdByName) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'Required: items[], createdBy, createdByName' });
    }

    // Soft-delete all existing active docs
    await OperationAvailability.updateMany(
      { isActive: true },
      { $set: { isActive: false, endedBy: createdBy, endedByName: createdByName, endDtm: new Date() } },
      { session }
    );

    // Insert new docs
    const toInsert = items
      .filter(i => i && i.name)
      .map(i => ({
        name: String(i.name).trim(),
        isAvailable: typeof i.isAvailable === 'boolean' ? i.isAvailable : true,
        createdBy,
        createdByName
      }));

    if (toInsert.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'No valid items to insert' });
    }

    const inserted = await OperationAvailability.insertMany(toInsert, { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: 'Operation availability reset successfully', data: inserted });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error resetting operation availability:', error);
    res.status(500).json({ success: false, message: 'Failed to reset operation availability', error: error.message });
  }
});

module.exports = router;
