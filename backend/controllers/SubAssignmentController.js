const AssignmentModel = require('../models/Assignments');

exports.getSubAssignment = async (req, res) => {
    try {
        // Query the Assignments collection for sub assignments.
        // Note: the Assignment enum uses 'Sub Assignment' (no hyphen).
        const subAssignments = await AssignmentModel.find({ Assignment: 'Sub Assignment' }).populate('assignedTo', 'userName ContactNumber ActiveStatus');

        // Optional: normalize populated user fields for a consistent API shape
        const normalized = subAssignments.map(sa => ({
            _id: sa._id,
            assignedTo: sa.assignedTo ? {
                id: sa.assignedTo._id,
                userName: sa.assignedTo.userName,
                contactNumber: sa.assignedTo.ContactNumber,
                activeStatus: sa.assignedTo.ActiveStatus
            } : null,
            assignedBy: sa.assignedBy,
            Assignment: sa.Assignment,
            createdAt: sa.createdAt,
            updatedAt: sa.updatedAt
        }));

        res.status(200).json(normalized);
    } catch (error) {
        const err = { message: error.message };
        if (process.env.NODE_ENV !== 'production') err.stack = error.stack;
        res.status(500).json({ message: 'Error fetching sub-assignments', error: err });
    }
};