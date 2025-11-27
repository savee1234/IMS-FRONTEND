const express = require('express');
const Assignment = require('../models/Assignments');
const { createAssignment, getAssignmentsByUserId, getAllAssignments } = require('../controllers/AssignmentController');

const router = express.Router();

router.post('/', createAssignment);
router.get('/user/:userId', getAssignmentsByUserId);
router.get('/', getAllAssignments);

module.exports = router;

//jryj