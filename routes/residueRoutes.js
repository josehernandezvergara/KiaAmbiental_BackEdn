const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const { crearResiduo, obtenerResiduoMes } = require('../controllers/residueController');

// Crear un residuo (todos los usuarios autenticados)
router.post('/residuos', verificarToken, crearResiduo);

// Obtener un registro por ID
router.get('/residuos/:id', verificarToken, obtenerResiduoMes);

module.exports = router;
