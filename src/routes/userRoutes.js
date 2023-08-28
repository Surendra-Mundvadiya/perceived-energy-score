const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /users/register
router.post('/register', userController.registerUser);

// GET /users/:userId
router.get('/:userId', userController.getUserByAggregation);

// GET /users/v2/:userId
router.get('/v2/:userId', userController.getUserBySplitQuery);

module.exports = router;
