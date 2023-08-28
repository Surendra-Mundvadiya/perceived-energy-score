 const express = require('express');
const router = express.Router();

const sleepController = require('../controllers/sleepController');

// GET /sleep
router.get('/addSleepData', sleepController.sleepDataImport);

module.exports = router;