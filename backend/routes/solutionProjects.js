const express = require('express');
const router = express.Router();
const SolutionProject = require('../models/SolutionProject');

// GET all
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    let filter = { isActive: true };
    if (search) {
      filter.$or = [
        { employee: { $regex: search, $options: 'i' } },
        { solutionType: { $regex: search, $options: 'i' } },
        { solution: { $regex: search, $options: 'i' } },
        { solutionProjectId: { $regex: search, $options: 'i' } },
        { createdByName: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      SolutionProject.find(filter).sort({ createdDtm: -1 }).skip(skip).limit(Number(limit)),
      SolutionProject.countDocuments(filter)
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
    console.error('Error fetching solution projects:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch solution projects', error: error.message });
  }
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const doc = await SolutionProject.findById(req.params.id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    console.error('Error fetching solution project item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch item', error: error.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const { employee, solutionType, solution, createdBy, createdByName } = req.body;
    if (!employee || !solutionType || !solution || !createdBy || !createdByName) {
      return res.status(400).json({ success: false, message: 'Required fields: employee, solutionType, solution, createdBy, createdByName' });
    }

    const newDoc = new SolutionProject({
      employee: String(employee).trim(),
      solutionType: String(solutionType).trim(),
      solution: String(solution).trim(),
      createdBy,
      createdByName
    });
    await newDoc.save();
    res.status(201).json({ success: true, message: 'Solution project created successfully', data: newDoc });
  } catch (error) {
    console.error('Error creating solution project:', error);
    res.status(500).json({ success: false, message: 'Failed to create solution project', error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { employee, solutionType, solution } = req.body;
    const doc = await SolutionProject.findById(req.params.id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    if (employee) doc.employee = String(employee).trim();
    if (solutionType) doc.solutionType = String(solutionType).trim();
    if (solution) doc.solution = String(solution).trim();
    await doc.save();
    res.json({ success: true, message: 'Solution project updated successfully', data: doc });
  } catch (error) {
    console.error('Error updating solution project:', error);
    res.status(500).json({ success: false, message: 'Failed to update solution project', error: error.message });
  }
});

// SOFT DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { endedBy, endedByName } = req.body;
    if (!endedBy || !endedByName) {
      return res.status(400).json({ success: false, message: 'endedBy and endedByName are required for deletion' });
    }
    const doc = await SolutionProject.findById(req.params.id);
    if (!doc || !doc.isActive) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    doc.isActive = false;
    doc.endedBy = endedBy;
    doc.endedByName = endedByName;
    doc.endDtm = new Date();
    await doc.save();
    res.json({ success: true, message: 'Solution project deleted successfully' });
  } catch (error) {
    console.error('Error deleting solution project:', error);
    res.status(500).json({ success: false, message: 'Failed to delete solution project', error: error.message });
  }
});

// RESET: soft-delete existing active and insert new list
// Body: { items: [{ employee, solutionType, solution }], createdBy, createdByName }
router.post('/reset', async (req, res) => {
  const session = await SolutionProject.startSession();
  session.startTransaction();
  try {
    const { items, createdBy, createdByName } = req.body;
    if (!Array.isArray(items) || !createdBy || !createdByName) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'Required: items[], createdBy, createdByName' });
    }

    await SolutionProject.updateMany(
      { isActive: true },
      { $set: { isActive: false, endedBy: createdBy, endedByName: createdByName, endDtm: new Date() } },
      { session }
    );

    const toInsert = items
      .filter(i => i && i.employee && i.solutionType && i.solution)
      .map(i => ({
        employee: String(i.employee).trim(),
        solutionType: String(i.solutionType).trim(),
        solution: String(i.solution).trim(),
        createdBy,
        createdByName
      }));

    if (toInsert.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'No valid items to insert' });
    }

    const inserted = await SolutionProject.insertMany(toInsert, { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: 'Solution projects reset successfully', data: inserted });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error resetting solution projects:', error);
    res.status(500).json({ success: false, message: 'Failed to reset solution projects', error: error.message });
  }
});

module.exports = router;