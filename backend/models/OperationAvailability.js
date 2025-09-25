const mongoose = require('mongoose');

const operationAvailabilitySchema = new mongoose.Schema({
  // Auto-increment ID for display purposes
  operationAvailabilityId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true
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
  // Soft delete flag
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to auto-generate operationAvailabilityId
operationAvailabilitySchema.pre('save', async function(next) {
  if (this.isNew && !this.operationAvailabilityId) {
    try {
      // Format: OPAV001, OPAV002, etc.
      const lastDoc = await this.constructor.findOne(
        { operationAvailabilityId: { $exists: true, $ne: null } },
        {},
        { sort: { operationAvailabilityId: -1 } }
      );

      let nextNumber = 1;
      if (lastDoc && lastDoc.operationAvailabilityId) {
        const lastNumber = parseInt(lastDoc.operationAvailabilityId.replace('OPAV', ''));
        nextNumber = lastNumber + 1;
      }

      this.operationAvailabilityId = `OPAV${nextNumber.toString().padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

operationAvailabilitySchema.index({ operationAvailabilityId: 1 });
operationAvailabilitySchema.index({ name: 1 });
operationAvailabilitySchema.index({ isActive: 1 });

const OperationAvailability = mongoose.model('OperationAvailability', operationAvailabilitySchema);

module.exports = OperationAvailability;
