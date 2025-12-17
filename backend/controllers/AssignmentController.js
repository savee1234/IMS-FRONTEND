const AssignmentModel = require("../models/Assignments");
const Usermanagement = require("../models/Usermanagement");

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { assignedTo, assignedBy, title, description, status, priority } = req.body;
    
    const newAssignment = new AssignmentModel({
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [],
      assignedBy: assignedBy || 'System',
      title: title || 'New Assignment',
      description: description || '',
      status: status || 'Pending',
      priority: priority || 'Medium'
    });
    
    await newAssignment.save();
    await newAssignment.populate('assignedTo.user', 'userName userId Designation ContactNumber');
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
    const assignments = await AssignmentModel.find({ 
      'assignedTo.user': userId 
    }).populate('assignedTo.user', 'userName userId Designation ContactNumber');
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
    const assignments = await AssignmentModel.find().populate('assignedTo.user', 'userName userId Designation ContactNumber');
    res.status(200).json(assignments);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error fetching assignments", error: err });
  }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await AssignmentModel.findById(assignmentId).populate('assignedTo.user', 'userName userId Designation ContactNumber');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json(assignment);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error fetching assignment", error: err });
  }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { assignedTo, assignedBy, title, description, status, priority } = req.body;

    const updates = {};
    if (assignedTo !== undefined) updates.assignedTo = Array.isArray(assignedTo) ? assignedTo : [];
    if (assignedBy !== undefined) updates.assignedBy = assignedBy;
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;

    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      assignmentId,
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo.user', 'userName userId Designation ContactNumber');

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json(updatedAssignment);
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error updating assignment", error: err });
  }
};

// Delete an assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const deletedAssignment = await AssignmentModel.findByIdAndDelete(assignmentId);

    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({ message: 'Assignment deleted successfully', assignmentId });
  } catch (error) {
    const err = { message: error.message };
    if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
    res.status(500).json({ message: "Error deleting assignment", error: err });
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

    // Create ONE assignment with all users (both Main and Sub)
    const mainAssignments = users.map(user => ({
      user: user._id,
      assignmentType: 'Main Assignment'
    }));

    const subAssignments = users.map(user => ({
      user: user._id,
      assignmentType: 'Sub Assignment'
    }));

    // Create two assignments: one with all main, one with all sub
    const assignmentsToCreate = [
      {
        assignedTo: mainAssignments,
        assignedBy: defaultAssigner,
        title: 'Seeded Main Assignments',
        description: 'All users as main assignments',
        status: 'Pending',
        priority: 'Medium'
      },
      {
        assignedTo: subAssignments,
        assignedBy: defaultAssigner,
        title: 'Seeded Sub Assignments',
        description: 'All users as sub assignments',
        status: 'Pending',
        priority: 'Medium'
      }
    ];

    const createdAssignments = await AssignmentModel.insertMany(assignmentsToCreate);

    res.status(201).json({
      message: `Successfully created ${createdAssignments.length} assignment documents`,
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
