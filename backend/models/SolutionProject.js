const mongoose = require('mongoose');

const solutionProjectSchema = new mongoose.Schema({
  // Auto-increment display ID
  solutionProjectId: {
    type: String,
    unique: true,
    sparse: true
  },
  employee: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  solutionType: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  solution: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
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

// Auto-generate solutionProjectId: SOLP001, SOLP002, ...
solutionProjectSchema.pre('save', async function(next) {
  if (this.isNew && !this.solutionProjectId) {
    try {
      const last = await this.constructor.findOne(
        { solutionProjectId: { $exists: true, $ne: null } },
        {},
        { sort: { solutionProjectId: -1 } }
      );
      let nextNumber = 1;
      if (last && last.solutionProjectId) {
        const lastNumber = parseInt(last.solutionProjectId.replace('SOLP', ''));
        nextNumber = lastNumber + 1;
      }
      this.solutionProjectId = `SOLP${nextNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

solutionProjectSchema.index({ solutionProjectId: 1 });
solutionProjectSchema.index({ employee: 1 });
solutionProjectSchema.index({ solutionType: 1 });
solutionProjectSchema.index({ solution: 1 });
solutionProjectSchema.index({ isActive: 1 });

const SolutionProject = mongoose.model('SolutionProject', solutionProjectSchema);
module.exports = SolutionProject;