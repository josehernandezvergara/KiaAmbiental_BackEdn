// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificarToken = require('../middleware/verificarToken');
const esAdmin = require('../middleware/esAdmin');


//al consumirla ingresaremos la informacion del usuario para obtener el token
router.post('/login', authController.login);
//para registrar un nuevo usuario
router.post('/registro', authController.crearUsuario, esAdmin, verificarToken);
//para obtener el perfil (informacion dle usuario) ruta protegida 
router.get('/perfil', verificarToken, authController.perfil);

module.exports = router;