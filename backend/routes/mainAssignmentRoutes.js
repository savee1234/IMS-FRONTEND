const express = require('express');
const router = express.Router();
const MainAssignmentController = require('../controllers/MainAssignmentController');

// Routes for main assignments (filtered from Assignments model)
router.get('/', MainAssignmentController.getAllMainAssignments);
router.post('/', MainAssignmentController.createMainAssignment);
router.get('/:assignmentId', MainAssignmentController.getMainAssignmentById);
router.put('/:assignmentId', MainAssignmentController.updateMainAssignment);
router.delete('/:assignmentId', MainAssignmentController.deleteMainAssignment);

module.exports = router;
