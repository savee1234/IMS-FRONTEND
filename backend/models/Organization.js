const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  // Auto-increment organization ID for display purposes
  organizationId: {
    type: String,
    unique: true,
    sparse: true // Allow null during creation
  },
  organization: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  organizationType: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    enum: ['Type 1', 'Type 2', 'Type 3'] // Restrict to valid types
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
  timestamps: true // This will add createdAt and updatedAt automatically
});

// Pre-save middleware to auto-generate organizationId
organizationSchema.pre('save', async function(next) {
  if (this.isNew && !this.organizationId) {
    try {
      // Generate a unique organization ID format: ORG001, ORG002, etc.
      const lastOrg = await this.constructor.findOne(
        { organizationId: { $exists: true, $ne: null } },
        {},
        { sort: { organizationId: -1 } }
      );
      
      let nextNumber = 1;
      if (lastOrg && lastOrg.organizationId) {
        const lastNumber = parseInt(lastOrg.organizationId.replace('ORG', ''));
        nextNumber = lastNumber + 1;
      }
      
      this.organizationId = `ORG${nextNumber.toString().padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Index for better query performance
organizationSchema.index({ organizationId: 1 });
organizationSchema.index({ organization: 1 });
organizationSchema.index({ isActive: 1 });
organizationSchema.index({ organizationType: 1 });

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;