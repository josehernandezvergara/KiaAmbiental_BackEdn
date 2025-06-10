const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const esAdmin = require('../middleware/esAdmin');
const verificarToken = require('../middleware/verificarToken');

//para obtener todos los usuarios
router.get('/usuarios',
  verificarToken,
  esAdmin,
  usuarioController.obtenerUsuarios);
//usuario por id (uno)
router.get('/usuarios/:id',
  verificarToken,
  usuarioController.obtenerUsuario);
//actualizar un usuario
router.put('/usuarios/:id',
  verificarToken,
  esAdmin,
  usuarioController.actualizarUsuario);
//eliminar un usuario
router.delete('/usuarios/:id',
  verificarToken,
  esAdmin,
  usuarioController.eliminarUsuario);
//promover
router.post(
  '/usuarios/promote/:id',
  verificarToken,
  esAdmin,
  usuarioController.promoverAdmin
);


module.exports = router;
