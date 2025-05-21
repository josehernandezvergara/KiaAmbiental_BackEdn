const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const esAdmin = require('../middleware/esAdmin');
const verificarToken = require('../middleware/verificarToken');

//para obtener todos los usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);
//usuario por id (uno)
router.get('/usuarios/:id', usuarioController.obtenerUsuario);
//actualizar un usuario
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
//eliminar un usuario
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);
//promover
router.post(
  '/usuarios/promote/:id',
  verificarToken,
  esAdmin,
  usuarioController.promoverAdmin
);


module.exports = router;
