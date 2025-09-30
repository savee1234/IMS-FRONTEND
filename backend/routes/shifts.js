const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');

// GET all shifts with pagination and search
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    let filter = { isActive: true };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shiftId: { $regex: search, $options: 'i' } },
        { createdByName: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Shift.find(filter).sort({ createdDtm: -1 }).skip(skip).limit(Number(limit)),
      Shift.countDocuments(filter)
    ]);
    res.json({ success: true, data: items, pagination: { current: Number(page), total: Math.ceil(total / limit), count: total, limit: Number(limit) } });
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch shifts', error: error.message });
  }
});

// GET single shift by _id
router.get('/:id', async (req, res) => {
  try {
    const doc = await Shift.findById(req.params.id);
    if (!doc || !doc.isActive) return res.status(404).json({ success: false, message: 'Shift not found' });
    res.json({ success: true, data: doc });
  } catch (error) {
    console.error('Error fetching shift:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch shift', error: error.message });
  }
});

// CREATE shift
router.post('/', async (req, res) => {
  try {
    const { name, fromTime, toTime, createdBy, createdByName } = req.body;
    if (!name || !fromTime || !toTime || !createdBy || !createdByName) {
      return res.status(400).json({ success: false, message: 'Required fields: name, fromTime, toTime, createdBy, createdByName' });
    }
    const newDoc = new Shift({ name: name.trim(), fromTime: fromTime.trim(), toTime: toTime.trim(), createdBy, createdByName });
    await newDoc.save();
    res.status(201).json({ success: true, message: 'Shift created successfully', data: newDoc });
  } catch (error) {
    console.error('Error creating shift:', error);
    res.status(500).json({ success: false, message: 'Failed to create shift', error: error.message });
  }
});

// UPDATE shift
router.put('/:id', async (req, res) => {
  try {
    const { name, fromTime, toTime } = req.body;
    const doc = await Shift.findById(req.params.id);
    if (!doc || !doc.isActive) return res.status(404).json({ success: false, message: 'Shift not found' });
    if (name) doc.name = String(name).trim();
    if (fromTime) doc.fromTime = String(fromTime).trim();
    if (toTime) doc.toTime = String(toTime).trim();
    await doc.save();
    res.json({ success: true, message: 'Shift updated successfully', data: doc });
  } catch (error) {
    console.error('Error updating shift:', error);
    res.status(500).json({ success: false, message: 'Failed to update shift', error: error.message });
  }
});

// SOFT DELETE shift
router.delete('/:id', async (req, res) => {
  try {
    const { endedBy, endedByName } = req.body;
    if (!endedBy || !endedByName) {
      return res.status(400).json({ success: false, message: 'endedBy and endedByName are required for deletion' });
    }
    const doc = await Shift.findById(req.params.id);
    if (!doc || !doc.isActive) return res.status(404).json({ success: false, message: 'Shift not found' });
    doc.isActive = false;
    doc.endedBy = endedBy;
    doc.endedByName = endedByName;
    doc.endDtm = new Date();
    await doc.save();
    res.json({ success: true, message: 'Shift deleted successfully' });
  } catch (error) {
    console.error('Error deleting shift:', error);
    res.status(500).json({ success: false, message: 'Failed to delete shift', error: error.message });
  }
});

// RESET: soft-delete existing and insert new list
// Body: { items: [{ name, fromTime, toTime }], createdBy, createdByName }
router.post('/reset', async (req, res) => {
  const session = await Shift.startSession();
  session.startTransaction();
  try {
    const { items, createdBy, createdByName } = req.body;
    if (!Array.isArray(items) || !createdBy || !createdByName) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'Required: items[], createdBy, createdByName' });
    }

    await Shift.updateMany(
      { isActive: true },
      { $set: { isActive: false, endedBy: createdBy, endedByName: createdByName, endDtm: new Date() } },
      { session }
    );

    const toInsert = items
      .filter(i => i && i.name && i.fromTime && i.toTime)
      .map(i => ({
        name: String(i.name).trim(),
        fromTime: String(i.fromTime).trim(),
        toTime: String(i.toTime).trim(),
        createdBy,
        createdByName
      }));

    if (toInsert.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'No valid items to insert' });
    }

    const inserted = await Shift.insertMany(toInsert, { session });
    await session.commitTransaction();
    session.endSession();
    res.json({ success: true, message: 'Shifts reset successfully', data: inserted });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error resetting shifts:', error);
    res.status(500).json({ success: false, message: 'Failed to reset shifts', error: error.message });
  }
});

module.exports = router;
