const express = require('express');
const { createAssignment, getAssignmentsByUserId, getAllAssignments, seedAllUserAssignments } = require('../controllers/AssignmentController');

const router = express.Router();

router.post('/seed', seedAllUserAssignments);
router.post('/', createAssignment);
router.get('/user/:userId', getAssignmentsByUserId);
router.get('/', getAllAssignments);

module.exports = router;