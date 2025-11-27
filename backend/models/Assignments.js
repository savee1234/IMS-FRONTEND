const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
    required: true,
  },
  assignedTo: { type: String, required: true },
  assignedBy: { type: String, required: true },
  status: { type: String, enum: ["assigned", "in-progress", "completed"], default: "assigned" },
  remarks: String,
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);