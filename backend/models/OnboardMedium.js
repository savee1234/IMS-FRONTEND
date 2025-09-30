const mongoose = require('mongoose');

const onboardMediumSchema = new mongoose.Schema({
  onboardMediumId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  createdBy: {
    type: String,
    required: true,
    maxlength: 50,
  },
  createdByName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  createdDtm: {
    type: Date,
    default: Date.now,
  },
  endedBy: {
    type: String,
    maxlength: 50,
  },
  endedByName: {
    type: String,
    maxlength: 50,
  },
  endDtm: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Auto-generate onboardMediumId: OBM001, OBM002, ...
onboardMediumSchema.pre('save', async function(next) {
  if (this.isNew && !this.onboardMediumId) {
    try {
      const last = await this.constructor.findOne(
        { onboardMediumId: { $exists: true, $ne: null } },
        {},
        { sort: { onboardMediumId: -1 } }
      );
      let nextNumber = 1;
      if (last && last.onboardMediumId) {
        const lastNumber = parseInt(last.onboardMediumId.replace('OBM', ''));
        nextNumber = lastNumber + 1;
      }
      this.onboardMediumId = `OBM${nextNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

onboardMediumSchema.index({ onboardMediumId: 1 });
onboardMediumSchema.index({ name: 1 });
onboardMediumSchema.index({ isActive: 1 });

const OnboardMedium = mongoose.model('OnboardMedium', onboardMediumSchema);
module.exports = OnboardMedium;