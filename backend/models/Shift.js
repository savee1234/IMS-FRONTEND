const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shiftId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  fromTime: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20 // e.g., 09:00 AM
  },
  toTime: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20 // e.g., 05:00 PM
  },
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
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Auto-generate shiftId: SHF001, SHF002, ...
shiftSchema.pre('save', async function(next) {
  if (this.isNew && !this.shiftId) {
    try {
      const last = await this.constructor.findOne(
        { shiftId: { $exists: true, $ne: null } },
        {},
        { sort: { shiftId: -1 } }
      );
      let nextNumber = 1;
      if (last && last.shiftId) {
        const lastNumber = parseInt(last.shiftId.replace('SHF', ''));
        nextNumber = lastNumber + 1;
      }
      this.shiftId = `SHF${nextNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

shiftSchema.index({ shiftId: 1 });
shiftSchema.index({ name: 1 });
shiftSchema.index({ isActive: 1 });

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
