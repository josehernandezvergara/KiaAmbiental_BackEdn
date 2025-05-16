const Usuario = require('../models/Usuario');

// Obtener todos
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

// Obtener uno
exports.obtenerUsuario = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.json(usuario);
};



// Actualizar
exports.actualizarUsuario = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).send('Usuario no encontrado');

  if (req.body.type_user){
    usuario.type_user = req.body.type_user;
  }
  
  if (req.body.username){
    usuario.username = req.body.username;
  }

  await usuario.save();
  res.json(usuario);
};

// Eliminar
exports.eliminarUsuario = async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.status(204).send();
};
