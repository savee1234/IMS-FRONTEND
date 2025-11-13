const express = require('express');
const router = express.Router();

const { createUser,viewUsers,viewUserById,updateUser,deleteUser} = require('../controllers/UsermanagementController');

router.post('/', createUser);
router.get('/', viewUsers);
router.get('/:id', viewUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;