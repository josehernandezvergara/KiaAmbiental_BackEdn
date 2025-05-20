const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
console.log('authController cargado', bcrypt);

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const usuario = await Usuario.findOne({ where: { username } });
// buscar usuario
  if (!usuario) return res.status(401).send('No encontrado');
//ver contrasena
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) return res.status(401).send('datos incorrectos c');
//firmar token
  const token = jwt.sign({ id: usuario.id, username: usuario.username, type_user: usuario.type_user }, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};



exports.crearUsuario = async (req, res) => {
    const { type_user, username, password } = req.body;
    console.log("post check", req.body)
    try {
      // Validar datos
      if (!type_user || !username || !password) {
        return res.status(400).json({ error: ' hace falta info' });
      }
      // Verificar si ya existe
      //await porque es operacion de db
      const existe = await Usuario.findOne({ where: { username } });
      if (existe) {
        return res.status(409).json({ error: 'ese correo ya se dio de alta' });
      }
  
      // Encriptar password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear usuario
      const nuevoUsuario = await Usuario.create({
        type_user,
        username,
        password: hashedPassword
      });

        const token = jwt.sign({ id: nuevoUsuario.id, username: nuevoUsuario.username, type_user: nuevoUsuario.type_user }, 
          JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ mensaje: 'Usuario creado correctamente',
          usuario: { id: nuevoUsuario.id, username: nuevoUsuario.username,
          type_user: nuevoUsuario.type_user },
          //token: token 
        });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' + error });
    }
  };
  
  exports.perfil = async (req, res) => {
    res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
  };