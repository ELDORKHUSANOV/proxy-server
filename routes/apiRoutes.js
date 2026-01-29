const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/timestamp', apiController.timestamp);
router.post('/verify/attached', apiController.verifyAttached);
router.post('/join', apiController.join);

module.exports = router;
