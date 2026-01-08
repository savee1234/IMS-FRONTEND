const express = require('express');
const router = express.Router();
const SubAssignmentController = require('../controllers/SubAssignmentController');

// Routes for sub assignments (filtered from Assignments model)
router.get('/', SubAssignmentController.getSubAssignment);
router.post('/', SubAssignmentController.createSubAssignment);
router.get('/:assignmentId', SubAssignmentController.getSubAssignmentById);
router.put('/:assignmentId', SubAssignmentController.updateSubAssignment);
router.delete('/:assignmentId', SubAssignmentController.deleteSubAssignment);

module.exports = router;