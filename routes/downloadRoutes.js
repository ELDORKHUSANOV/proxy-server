const express = require('express');
const router = express.Router();

const mibController = require('../controllers/download/downloadmib');
const ishonchnomaController = require('../controllers/download/ishonchnomadownload');
debugger
router.get('/mib', mibController.downloadMib);                 // /download/mib?id=...
router.get('/ishonchnoma', ishonchnomaController.downloadIshonchnoma); // /download/ishonchnoma?id=...

module.exports = router;
