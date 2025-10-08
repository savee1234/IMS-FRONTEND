const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  requestRef: {
    type: String,
    required: true
  },
  categoryType: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  solutionName: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  mediumSource: {
    type: String,
    required: true
  },
  complaint: {
    type: String,
    required: true
  },
  // contact details
  searchMobile: {
    type: String
  },
  contactName: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  officeMobile: {
    type: String
  },
  title: {
    type: String
  },
  // assignment details
  mainAssignment: {
    type: String
  },
  subAssignment: {
    type: String
  },
  docRef: {
    type: String
  },
  docSubject: {
    type: String
  },
  remarks: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
complaintSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);