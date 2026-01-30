const express = require('express');
const router = express.Router();

const mibController = require('../controllers/download/downloadmib');
const ishonchnomaController = require('../controllers/download/ishonchnomadownload');
const tenderGetfileController = require('../controllers/download/tenderGetfile');
// MIB
router.get('/mib', mibController.downloadMib);
// /download/mib?id=...
// Ishonchnoma
router.get('/ishonchnoma', ishonchnomaController.downloadIshonchnoma);
// /download/ishonchnoma?id=...

// Tender / ATM file (id1, id2 bilan)
router.get(
    '/tender-getfile/:id1/:id2',
    tenderGetfileController.getAtmFile
);
// /download/tender-getfile/123/456

module.exports = router;
