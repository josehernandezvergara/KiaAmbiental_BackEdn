const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const { procesarExcel } = require('../controllers/excelController');
const { datosExcel } = require('../controllers/excelController');
const esAdmin = require('../middleware/esAdmin');


router.post('/excel-upload', verificarToken, esAdmin, procesarExcel);
router.get('/excel-data', verificarToken, esAdmin, datosExcel)
module.exports = router;
