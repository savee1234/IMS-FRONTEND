const express = require('express');
const { getSubAssignment } = require('../controllers/SubAssignmentController');

const router = express.Router();

router.get('/', getSubAssignment);

module.exports = router;    