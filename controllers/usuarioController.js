const Usuario = require('../models/Usuario');

// Obtener todos
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

// Obtener uno
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id); // Usa el ID del usuario autenticado
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



// Actualizar
exports.actualizarUsuario = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  //si la id no existe o machea
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  //si viene vacio no actualiza
  //oye, viene algo? 
  if (req.body.type_user){

    //si viene, actualiza
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

//promover usuario
exports.promoverAdmin = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no existe' });
    }
    user.type_user = 'admin';
    await user.save();
    res.json({ mensaje: 'Usuario promovido a admin', usuario: { id: user.id, username: user.username, type_user: user.type_user } });
  } catch (err) {
    console.error('Error promoviendo a admin:', err);
    res.status(500).json({ error: 'No se pudo promover al usuario' });
  }
};