const AssignmentModel = require("../models/Assignments");
const Usermanagement = require("../models/Usermanagement");

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    // Avoid shadowing the model name by renaming the incoming field
    const { assignedTo, assignedBy, Assignment: assignmentType } = req.body;
    const newAssignment = new AssignmentModel({
      assignedTo,
      assignedBy,
      Assignment: assignmentType
    });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error creating assignment", error: err });
  }
};
// Get assignments by user ID


exports.getAssignmentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await AssignmentModel.find({ assignedTo: userId });
    res.status(200).json(assignments);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error fetching assignments", error: err });
  }
};

//get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await AssignmentModel.find().populate('assignedTo', 'name email');
    res.status(200).json(assignments);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error fetching assignments", error: err });
  }
};
