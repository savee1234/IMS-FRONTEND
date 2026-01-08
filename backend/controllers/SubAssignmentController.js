const AssignmentModel = require('../models/Assignments');
const Usermanagement = require('../models/Usermanagement');

/**
 * Get all sub assignments (assignments with Sub Assignment type)
 */
exports.getSubAssignment = async (req, res) => {
    try {
        // Find assignments and populate user details for each assignee
        const assignments = await AssignmentModel.find().populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');
        
        // Filter to only include assignments that have at least one Sub Assignment type
        // and filter the assignedTo array to only include Sub Assignment entries
        const subAssignments = assignments
            .filter(a => a.assignedTo && a.assignedTo.some(assignee => assignee.assignmentType === 'Sub Assignment'))
            .map(a => ({
                ...a.toObject(),
                assignedTo: a.assignedTo.filter(assignee => assignee.assignmentType === 'Sub Assignment')
            }));

        res.status(200).json(subAssignments);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching sub assignments', error: err });
    }
};

/**
 * Get a single sub assignment by ID (must have Sub Assignment type)
 */
exports.getSubAssignmentById = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await AssignmentModel.findById(assignmentId).populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');
        
        if (!assignment) {
            return res.status(404).json({ message: 'Sub assignment not found' });
        }

        // Verify it has at least one Sub Assignment type
        const hasSubAssignment = assignment.assignedTo && assignment.assignedTo.some(assignee => assignee.assignmentType === 'Sub Assignment');
        if (!hasSubAssignment) {
            return res.status(404).json({ message: 'Sub assignment not found' });
        }

        // Filter assignedTo to only include Sub Assignment entries
        const filtered = {
            ...assignment.toObject(),
            assignedTo: assignment.assignedTo.filter(assignee => assignee.assignmentType === 'Sub Assignment')
        };

        res.status(200).json(filtered);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching sub assignment', error: err });
    }
};

/**
 * Create a new sub assignment with users assigned as Sub Assignment type
 */
exports.createSubAssignment = async (req, res) => {
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

        // Create assignment with all assignees as Sub Assignment type
        const subAssignmentData = {
            assignedTo: userIds.map(userId => ({
                user: userId,
                assignmentType: 'Sub Assignment'
            })),
            assignedBy: assignedBy || 'System',
            title: title,
            description: description || '',
            status: status || 'Pending',
            priority: priority || 'Medium'
        };

        const newAssignment = new AssignmentModel(subAssignmentData);
        await newAssignment.save();
        await newAssignment.populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');

        res.status(201).json(newAssignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error creating sub assignment', error: err });
    }
};

/**
 * Update a sub assignment
 */
exports.updateSubAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const updates = req.body;

        const assignment = await AssignmentModel.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Sub assignment not found' });
        }

        // Verify it's a sub assignment
        const hasSubAssignment = assignment.assignedTo && assignment.assignedTo.some(assignee => assignee.assignmentType === 'Sub Assignment');
        if (!hasSubAssignment) {
            return res.status(404).json({ message: 'Sub assignment not found' });
        }

        // Update allowed fields
        if (updates.title !== undefined) assignment.title = updates.title;
        if (updates.description !== undefined) assignment.description = updates.description;
        if (updates.status !== undefined) assignment.status = updates.status;
        if (updates.priority !== undefined) assignment.priority = updates.priority;

        // Handle assignedTo updates (if provided, maintain Sub Assignment type)
        if (updates.assignedTo && Array.isArray(updates.assignedTo)) {
            const userIds = updates.assignedTo;
            const users = await Usermanagement.find({ _id: { $in: userIds } });
            if (users.length !== userIds.length) {
                return res.status(400).json({ message: 'One or more users do not exist' });
            }
            assignment.assignedTo = userIds.map(userId => ({
                user: userId,
                assignmentType: 'Sub Assignment'
            }));
        }

        await assignment.save();
        await assignment.populate('assignedTo.user', 'userName userId Designation ContactNumber ActiveStatus');

        res.status(200).json(assignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error updating sub assignment', error: err });
    }
};

/**
 * Delete a sub assignment
 */
exports.deleteSubAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await AssignmentModel.findById(assignmentId);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Sub assignment not found' });
        }

        // Verify it's a sub assignment
        const hasSubAssignment = assignment.assignedTo && assignment.assignedTo.some(assignee => assignee.assignmentType === 'Sub Assignment');
        if (!hasSubAssignment) {
            return res.status(404).json({ message: 'Sub assignment not found' });
        }

        await AssignmentModel.findByIdAndDelete(assignmentId);
        res.status(200).json({ message: 'Sub assignment deleted successfully' });
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error deleting sub assignment', error: err });
    }
};

