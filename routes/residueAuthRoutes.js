const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const { obtenerAuth } = require('../controllers/residueAuthController');

router.get('/residue_authorizations', verificarToken, obtenerAuth);

module.exports = router;