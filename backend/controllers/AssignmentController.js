const Assignment = require("../models/Assignments");
const Usermanagement = require("../models/Usermanagement");

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { assignedTo, assignedBy, Assignment } = req.body;
    const newAssignment = new Assignment({
      assignedTo,
      assignedBy,
      Assignment
    });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error });
  }
};
    res.status(500).json({ message: "Error creating complaint", error });
// Get assignments by user ID


exports.getAssignmentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await Assignment.find({ assignedTo: userId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};

//get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('assignedTo', 'name email');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};
