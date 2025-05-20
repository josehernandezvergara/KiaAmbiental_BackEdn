const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const { obtenerResumenMensual } = require('../controllers/dashboardController');

//normales
router.get('/resumen-mensual', verificarToken, obtenerResumenMensual);

module.exports = router;
