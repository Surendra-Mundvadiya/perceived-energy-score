const express = require('express');
const router = express.Router();

const activityController = require('../controllers/activityController');

// GET /activity
router.get('/addActivityData', activityController.activityDataImport);

module.exports = router;
