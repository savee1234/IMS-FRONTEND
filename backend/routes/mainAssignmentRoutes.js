const express = require('express');
const router = express.Router();
const MainAssignmentController = require('../controllers/MainAssignmentController');

// Routes for main assignments
router.get('/', MainAssignmentController.getAllMainAssignments);
router.get('/:id', MainAssignmentController.getMainAssignmentById);
router.post('/', MainAssignmentController.createMainAssignment);
router.put('/:id', MainAssignmentController.updateMainAssignment);
router.delete('/:id', MainAssignmentController.deleteMainAssignment);

module.exports = router;
