const express = require('express');
const router = express.Router();
const Roster = require('../models/Roster');

// GET all rosters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, month } = req.query;
    
    // Build query filter
    let filter = { isActive: true };
    
    if (search) {
      filter.$or = [
        { rosterName: { $regex: search, $options: 'i' } },
        { rosterId: { $regex: search, $options: 'i' } },
        { createdByName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (month) {
      filter.month = month;
    }
    
    const skip = (page - 1) * limit;
    
    const [rosters, total] = await Promise.all([
      Roster.find(filter)
        .sort({ createdDtm: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Roster.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: rosters,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / limit),
        count: total,
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching rosters:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rosters',
      error: error.message
    });
  }
});

// GET single roster by ID
router.get('/:id', async (req, res) => {
  try {
    const roster = await Roster.findById(req.params.id);
    
    if (!roster || !roster.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Roster not found'
      });
    }
    
    res.json({
      success: true,
      data: roster
    });
  } catch (error) {
    console.error('Error fetching roster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch roster',
      error: error.message
    });
  }
});

// CREATE new roster
router.post('/', async (req, res) => {
  try {
    const {
      rosterName,
      month,
      data,
      createdBy,
      createdByName
    } = req.body;
    
    // Validate required fields
    if (!rosterName || !month || !data || !createdBy || !createdByName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: rosterName, month, data, createdBy, createdByName'
      });
    }
    
    // Validate month format
    if (!/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({
        success: false,
        message: 'Month must be in YYYY-MM format'
      });
    }
    
    // Check for duplicate roster for the same month
    const existingRoster = await Roster.findOne({
      month: month,
      isActive: true
    });
    
    if (existingRoster) {
      return res.status(400).json({
        success: false,
        message: 'A roster for this month already exists'
      });
    }
    
    // Validate roster data structure
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Roster data must be a non-empty array'
      });
    }
    
    // Validate each day in the roster data
    for (const day of data) {
      if (!day.date || !day.dayName || !Array.isArray(day.shifts)) {
        return res.status(400).json({
          success: false,
          message: 'Each day must have date, dayName, and shifts array'
        });
      }
      
      for (const shift of day.shifts) {
        if (!shift.shift || !Array.isArray(shift.employees)) {
          return res.status(400).json({
            success: false,
            message: 'Each shift must have shift name and employees array'
          });
        }
      }
    }
    
    const newRoster = new Roster({
      rosterName: rosterName.trim(),
      month,
      data,
      createdBy,
      createdByName
    });
    
    await newRoster.save();
    
    res.status(201).json({
      success: true,
      message: 'Roster created successfully',
      data: newRoster
    });
  } catch (error) {
    console.error('Error creating roster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create roster',
      error: error.message
    });
  }
});

// UPDATE roster
router.put('/:id', async (req, res) => {
  try {
    const {
      rosterName,
      data
    } = req.body;
    
    const existingRoster = await Roster.findById(req.params.id);
    
    if (!existingRoster || !existingRoster.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Roster not found'
      });
    }
    
    // Validate roster data structure if provided
    if (data) {
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Roster data must be a non-empty array'
        });
      }
      
      // Validate each day in the roster data
      for (const day of data) {
        if (!day.date || !day.dayName || !Array.isArray(day.shifts)) {
          return res.status(400).json({
            success: false,
            message: 'Each day must have date, dayName, and shifts array'
          });
        }
        
        for (const shift of day.shifts) {
          if (!shift.shift || !Array.isArray(shift.employees)) {
            return res.status(400).json({
              success: false,
              message: 'Each shift must have shift name and employees array'
            });
          }
        }
      }
    }
    
    // Update fields
    if (rosterName) existingRoster.rosterName = rosterName.trim();
    if (data) existingRoster.data = data;
    
    await existingRoster.save();
    
    res.json({
      success: true,
      message: 'Roster updated successfully',
      data: existingRoster
    });
  } catch (error) {
    console.error('Error updating roster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update roster',
      error: error.message
    });
  }
});

// SOFT DELETE roster
router.delete('/:id', async (req, res) => {
  try {
    const { endedBy, endedByName } = req.body;
    
    if (!endedBy || !endedByName) {
      return res.status(400).json({
        success: false,
        message: 'endedBy and endedByName are required for deletion'
      });
    }
    
    const roster = await Roster.findById(req.params.id);
    
    if (!roster || !roster.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Roster not found'
      });
    }
    
    // Soft delete
    roster.isActive = false;
    roster.endedBy = endedBy;
    roster.endedByName = endedByName;
    roster.endDtm = new Date();
    
    await roster.save();
    
    res.json({
      success: true,
      message: 'Roster deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting roster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete roster',
      error: error.message
    });
  }
});

// GET rosters by month (for calendar view)
router.get('/month/:month', async (req, res) => {
  try {
    const { month } = req.params;
    
    // Validate month format
    if (!/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({
        success: false,
        message: 'Month must be in YYYY-MM format'
      });
    }
    
    const rosters = await Roster.find({
      month: month,
      isActive: true
    }).sort({ createdDtm: -1 });
    
    res.json({
      success: true,
      data: rosters
    });
  } catch (error) {
    console.error('Error fetching rosters by month:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rosters by month',
      error: error.message
    });
  }
});

// RESET: remove existing active rosters for a month and insert new one
router.post('/reset', async (req, res) => {
  const session = await Roster.startSession();
  session.startTransaction();
  
  try {
    const {
      month,
      rosterName,
      data,
      createdBy,
      createdByName
    } = req.body;
    
    if (!month || !rosterName || !data || !createdBy || !createdByName) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Required: month, rosterName, data, createdBy, createdByName'
      });
    }
    
    // Soft-delete all existing active rosters for this month
    await Roster.updateMany(
      { month: month, isActive: true },
      {
        $set: {
          isActive: false,
          endedBy: createdBy,
          endedByName: createdByName,
          endDtm: new Date()
        }
      },
      { session }
    );
    
    // Create new roster
    const newRoster = new Roster({
      rosterName: rosterName.trim(),
      month,
      data,
      createdBy,
      createdByName
    });
    
    await newRoster.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.json({
      success: true,
      message: 'Roster reset successfully',
      data: newRoster
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error resetting roster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset roster',
      error: error.message
    });
  }
});

module.exports = router;