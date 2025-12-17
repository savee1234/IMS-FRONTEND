const AssignmentModel = require("../models/Assignments");
const Usermanagement = require("../models/Usermanagement");

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { assignedTo, assignedBy, Assignment: assignmentType } = req.body;
    const newAssignment = new AssignmentModel({
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [assignedTo],
      assignedBy,
      Assignment: assignmentType
    });
    await newAssignment.save();
    await newAssignment.populate('assignedTo', 'userName name email');
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
    const assignments = await AssignmentModel.find({ assignedTo: { $in: [userId] } }).populate('assignedTo', 'userName name email');
    res.status(200).json(assignments);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error fetching assignments", error: err });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await AssignmentModel.find().populate('assignedTo', 'userName name email');
    res.status(200).json(assignments);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error fetching assignments", error: err });
  }
};

// Seed assignments for all users
exports.seedAllUserAssignments = async (req, res) => {
  try {
    const users = await Usermanagement.find();

    if (users.length === 0) {
      return res.status(400).json({ message: 'No users found. Please create users first.' });
    }

    // Clear existing assignments
    await AssignmentModel.deleteMany({});

    // Get the first user as the default assignedBy
    const defaultAssigner = users[0].userName || users[0].name || 'System';

    // Create assignments for each user
    const assignmentsToCreate = [];

    users.forEach(user => {
      assignmentsToCreate.push({
        assignedTo: [user._id],
        assignedBy: defaultAssigner,
        Assignment: 'Main Assignment'
      });

      assignmentsToCreate.push({
        assignedTo: [user._id],
        assignedBy: defaultAssigner,
        Assignment: 'Sub Assignment'
      });
    });

    const createdAssignments = await AssignmentModel.insertMany(assignmentsToCreate);

    res.status(201).json({
      message: `Successfully created ${createdAssignments.length} assignments`,
      totalMainAssignments: users.length,
      totalSubAssignments: users.length,
      totalUsers: users.length
    });
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error seeding assignments", error: err });
  }
};
