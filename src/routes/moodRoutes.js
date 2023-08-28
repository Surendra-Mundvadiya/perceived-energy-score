const express = require('express');
const router = express.Router();

const moodController = require('../controllers/moodController');

router.post('/addMoodData', moodController.addMoodData);

module.exports = router;