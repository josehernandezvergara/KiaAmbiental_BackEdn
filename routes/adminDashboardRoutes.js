const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const esAdmin = require('../middleware/esAdmin');
const { obtenerResumenCompleto } = require('../controllers/dashboardController');

//admins
// router.get('/admin/resumen-completo', verificarToken, esAdmin, obtenerResumenCompleto);

module.exports = router;
