const mongoose = require('mongoose');

/**
 * Sub-schema for assigned users
 */
const assignedUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usermanagement',
    required: true
  },
  assignmentType: {
    type: String,
    enum: ['Main Assignment', 'Sub Assignment'],
    required: true
  }
}, { _id: false });

/**
 * Main Assignment Schema
 */
const assignmentSchema = new mongoose.Schema({
  assignedTo: {
    type: [assignedUserSchema],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'On Hold'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  assignedBy: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true   // automatically adds createdAt & updatedAt
});

module.exports = mongoose.model('Assignments', assignmentSchema);
