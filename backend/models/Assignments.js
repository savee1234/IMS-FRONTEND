const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usermanagement',
    required: true
  },
  assignedBy: {
    type: String,
    required: true
  },
  Assignment: {
    type: String,
    enum: ['Main Assignment', 'Sub Assignment'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignments', assignmentSchema);