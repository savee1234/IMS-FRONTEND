const MainAssignment = require('../models/MainAssignment');

// Get all main assignments
exports.getAllMainAssignments = async (req, res) => {
    try {
        const assignments = await MainAssignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new main assignment
exports.createMainAssignment = async (req, res) => {
    const mainAssignment = new MainAssignment(req.body);
    try {
        const savedAssignment = await mainAssignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a main assignment
exports.updateMainAssignment = async (req, res) => {
    try {
        const updatedAssignment = await MainAssignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a main assignment
exports.deleteMainAssignment = async (req, res) => {
    try {
        await MainAssignment.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
