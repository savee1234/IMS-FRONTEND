const mongoose = require('mongoose');

const MainAssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    // Add other fields as necessary
});

module.exports = mongoose.model('MainAssignment', MainAssignmentSchema);
