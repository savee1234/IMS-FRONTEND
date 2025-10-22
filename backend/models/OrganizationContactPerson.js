const mongoose = require('mongoose');

const organizationContactPersonSchema = new mongoose.Schema({
  // Auto-increment contact person ID for display purposes
  contactPersonId: {
    type: String,
    unique: true,
    sparse: true // Allow null during creation
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  // Store organization name for quick access
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  mobileNumber: {
    type: String,
    trim: true,
    maxlength: 15
  },
  officeContactNumber: {
    type: String,
    trim: true,
    maxlength: 15
  },
  callingName: {
    type: String,
    trim: true,
    maxlength: 50
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
}, {
  timestamps: true
});

// Pre-save middleware to auto-generate contactPersonId
organizationContactPersonSchema.pre('save', async function(next) {
  if (this.isNew && !this.contactPersonId) {
    try {
      // Generate a unique contact person ID format: CP001, CP002, etc.
      const lastContact = await this.constructor.findOne(
        { contactPersonId: { $exists: true, $ne: null } }
      ).sort({ contactPersonId: -1 });

      let nextNumber = 1;
      if (lastContact && lastContact.contactPersonId) {
        const lastNumber = parseInt(lastContact.contactPersonId.replace('CP', ''));
        nextNumber = lastNumber + 1;
      }

      this.contactPersonId = `CP${nextNumber.toString().padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Index for better query performance
organizationContactPersonSchema.index({ contactPersonId: 1 });
organizationContactPersonSchema.index({ organizationId: 1 });
organizationContactPersonSchema.index({ email: 1 });
organizationContactPersonSchema.index({ isActive: 1 });
organizationContactPersonSchema.index({ organizationName: 1 });

const OrganizationContactPerson = mongoose.model('OrganizationContactPerson', organizationContactPersonSchema);

module.exports = OrganizationContactPerson;