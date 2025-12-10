const MainAssignment = require('../models/MainAssignment');

// Get all main assignments
exports.getAllMainAssignments = async (req, res) => {
    try {
        const assignments = await MainAssignment.find().populate('assignedTo', 'userName ContactNumber ActiveStatus');
        
        // Normalize populated user fields for consistent API shape
        const normalized = assignments.map(ma => ({
            _id: ma._id,
            title: ma.title,
            description: ma.description,
            status: ma.status,
            priority: ma.priority,
            dueDate: ma.dueDate,
            assignedTo: ma.assignedTo ? {
                id: ma.assignedTo._id,
                userName: ma.assignedTo.userName,
                contactNumber: ma.assignedTo.ContactNumber,
                activeStatus: ma.assignedTo.ActiveStatus
            } : null,
            assignedBy: ma.assignedBy,
            createdAt: ma.createdAt,
            updatedAt: ma.updatedAt
        }));
        
        res.status(200).json(normalized);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching main assignments', error: err });
    }
};

// Get a single main assignment by ID
exports.getMainAssignmentById = async (req, res) => {
    try {
        const assignment = await MainAssignment.findById(req.params.id).populate('assignedTo', 'userName ContactNumber ActiveStatus');
        if (!assignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching main assignment', error: err });
    }
};

// Create a new main assignment
exports.createMainAssignment = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.title || !req.body.assignedTo || !req.body.assignedBy) {
            return res.status(400).json({ message: 'Missing required fields: title, assignedTo, assignedBy' });
        }
        
        const mainAssignment = new MainAssignment(req.body);
        const savedAssignment = await mainAssignment.save();
        const populated = await savedAssignment.populate('assignedTo', 'userName ContactNumber ActiveStatus');
        
        res.status(201).json(populated);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error creating main assignment', error: err });
    }
};

// Update a main assignment
exports.updateMainAssignment = async (req, res) => {
    try {
        const updatedAssignment = await MainAssignment.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        ).populate('assignedTo', 'userName ContactNumber ActiveStatus');
        
        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }
        
        res.status(200).json(updatedAssignment);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error updating main assignment', error: err });
    }
};

// Delete a main assignment
exports.deleteMainAssignment = async (req, res) => {
    try {
        const deletedAssignment = await MainAssignment.findByIdAndDelete(req.params.id);
        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Main assignment not found' });
        }
        res.status(200).json({ message: 'Main assignment deleted successfully' });
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(400).json({ message: 'Error deleting main assignment', error: err });
    }
};
