const express = require('express');
const {
	createAssignment,
	getAssignmentsByUserId,
	getAllAssignments,
	seedAllUserAssignments,
	getAssignmentById,
	updateAssignment,
	deleteAssignment
} = require('../controllers/AssignmentController');

const router = express.Router();

router.post('/seed', seedAllUserAssignments);
router.post('/', createAssignment);
router.get('/user/:userId', getAssignmentsByUserId);
router.get('/:assignmentId', getAssignmentById);
router.put('/:assignmentId', updateAssignment);
router.delete('/:assignmentId', deleteAssignment);
router.get('/', getAllAssignments);

module.exports = router;