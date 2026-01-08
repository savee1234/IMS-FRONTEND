const AssignmentModel = require('../models/Assignments');
const Usermanagement = require('../models/Usermanagement');

/**
 * Get all main assignments (assignments with Main Assignment type)
 */
exports.getAllMainAssignments = async (req, res) => {
    try {
        // Find assignments and populate user details for each assignee
        const assignments = await AssignmentModel.find().populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');
        
        // Filter to only include assignments that have at least one Main Assignment type
        const mainAssignments = assignments.filter(a => 
            a.assignedTo && a.assignedTo.some(assignee => assignee.assignmentType === 'Main Assignment')
        );

        res.status(200).json(mainAssignments);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching main assignments', error: err });
    }
};

/**
 * Get a single main assignment by ID (must have Main Assignment type)
 */
exports.getMainAssignmentById = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await AssignmentModel.findById(assignmentId).populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');
        
        if (!assignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }

        // Verify it has at least one Main Assignment type
        const hasMainAssignment = assignment.assignedTo && assignment.assignedTo.some(assignee => assignee.assignmentType === 'Main Assignment');
        if (!hasMainAssignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }

        res.status(200).json(assignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching main assignment', error: err });
    }
};

/**
 * Create a new main assignment with users assigned as Main Assignment type
 */
exports.createMainAssignment = async (req, res) => {
    try {
        const { assignedTo, assignedBy, title, description, status, priority } = req.body;

        if (!assignedTo || !Array.isArray(assignedTo) || assignedTo.length === 0) {
            return res.status(400).json({ message: 'assignedTo must be a non-empty array of user IDs' });
        }
        if (!assignedBy || !title) {
            return res.status(400).json({ message: 'Missing required fields: assignedBy, title' });
        }

        // Verify users exist
        const userIds = assignedTo;
        const users = await Usermanagement.find({ _id: { $in: userIds } });
        if (users.length !== userIds.length) {
            return res.status(400).json({ message: 'One or more users do not exist' });
        }

        // Create assignment with all assignees as Main Assignment type
        const mainAssignmentData = {
            assignedTo: userIds.map(userId => ({
                user: userId,
                assignmentType: 'Main Assignment'
            })),
            assignedBy: assignedBy || 'System',
            title: title,
            description: description || '',
            status: status || 'Pending',
            priority: priority || 'Medium'
        };

        const newAssignment = new AssignmentModel(mainAssignmentData);
        await newAssignment.save();
        await newAssignment.populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');

        res.status(201).json(newAssignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error creating main assignment', error: err });
    }
};

/**
 * Update a main assignment
 */
exports.updateMainAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { assignedTo, assignedBy, title, description, status, priority } = req.body;

        const updates = {};
        if (assignedTo !== undefined) {
            if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
                return res.status(400).json({ message: 'assignedTo must be a non-empty array' });
            }
            // Verify users exist
            const users = await Usermanagement.find({ _id: { $in: assignedTo } });
            if (users.length !== assignedTo.length) {
                return res.status(400).json({ message: 'One or more users do not exist' });
            }
            updates.assignedTo = assignedTo.map(userId => ({
                user: userId,
                assignmentType: 'Main Assignment'
            }));
        }
        if (assignedBy !== undefined) updates.assignedBy = assignedBy;
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;
        if (priority !== undefined) updates.priority = priority;

        const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
            assignmentId,
            updates,
            { new: true, runValidators: true }
        ).populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');

        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }

        // Verify it has Main Assignment type
        const hasMainAssignment = updatedAssignment.assignedTo && updatedAssignment.assignedTo.some(assignee => assignee.assignmentType === 'Main Assignment');
        if (!hasMainAssignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }

        res.status(200).json(updatedAssignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error updating main assignment', error: err });
    }
};

/**
 * Delete a main assignment
 */
exports.deleteMainAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const deletedAssignment = await AssignmentModel.findByIdAndDelete(assignmentId);

        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }

        res.status(200).json({ message: 'Main assignment deleted successfully', assignmentId });
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error deleting main assignment', error: err });
    }
};
