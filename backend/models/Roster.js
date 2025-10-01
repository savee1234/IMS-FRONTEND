const mongoose = require('mongoose');

// Shift schema for individual shift data
const shiftSchema = new mongoose.Schema({
  shift: {
    type: String,
    required: true,
    enum: ['Shift 01', 'Shift 02']
  },
  employees: [{
    type: String,
    trim: true
  }]
}, { _id: false });

// Day schema for roster data
const daySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  dayName: {
    type: String,
    required: true
  },
  shifts: [shiftSchema]
}, { _id: false });

const rosterSchema = new mongoose.Schema({
  // Auto-increment roster ID for display purposes
  rosterId: {
    type: String,
    unique: true,
    sparse: true
  },
  rosterName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  month: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}$/ // Format: YYYY-MM
  },
  data: [daySchema],
  createdBy: {
    type: String,
    required: true,
    maxlength: 50
  },
  createdByName: {
    type: String,
    required: true,
    maxlength: 50
  },
  createdDtm: {
    type: Date,
    default: Date.now
  },
  endedBy: {
    type: String,
    maxlength: 50
  },
  endedByName: {
    type: String,
    maxlength: 50
  },
  endDtm: {
    type: Date
  },
  // Soft delete flag
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to auto-generate rosterId
rosterSchema.pre('save', async function(next) {
  if (this.isNew && !this.rosterId) {
    try {
      // Generate a unique roster ID format: RST001, RST002, etc.
      const lastRoster = await this.constructor.findOne(
        { rosterId: { $exists: true, $ne: null } },
        {},
        { sort: { rosterId: -1 } }
      );
      
      let nextNumber = 1;
      if (lastRoster && lastRoster.rosterId) {
        const lastNumber = parseInt(lastRoster.rosterId.replace('RST', ''));
        nextNumber = lastNumber + 1;
      }
      
      this.rosterId = `RST${nextNumber.toString().padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Index for better query performance
rosterSchema.index({ rosterId: 1 });
rosterSchema.index({ rosterName: 1 });
rosterSchema.index({ month: 1 });
rosterSchema.index({ isActive: 1 });
rosterSchema.index({ createdBy: 1 });

const Roster = mongoose.model('Roster', rosterSchema);

module.exports = Roster;