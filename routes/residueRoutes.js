const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const { 
    crearResiduo,
    obtenerResiduoMes,
    obtenerLog,
    obtenerLogId } = require('../controllers/residueController');

// Crear un residuo (todos los usuarios autenticados)
router.post('/residuos', verificarToken, crearResiduo);

// Obtener un registro por ID
router.get('/residuos/:id', verificarToken, obtenerLogId);
//todos
router.get('/residuos/', verificarToken, obtenerLog);
// router.get('/residuos/:id', verificarToken, obtenerLog);

module.exports = router;
