const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
console.log('authController cargado', bcrypt);

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
// buscar usuario
  if (!usuario) return res.status(401).send('No encontrado');
//ver contrasena
  const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!esValido) return res.status(401).send('datos incorrectos c');
//firmar token
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};


exports.crearUsuario = async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    console.log(req.body)
    try {
      // Validar datos
      if (!nombre || !email || !contraseña) {
        return res.status(400).json({ error: ' hace falta info' });
      }
  
      // Verificar si ya existe

      //await porque es operacion de db
      const existe = await Usuario.findOne({ where: { email } });
      if (existe) {
        return res.status(409).json({ error: 'ese correo ya se dio de alta' });
      }
  
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);
  
      // Crear usuario
      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        contraseña: hashedPassword
      });

        const token = jwt.sign({ id: nuevoUsuario.id, email: nuevoUsuario.email,name: nuevoUsuario.nombre }, JWT_SECRET, {
    expiresIn: '1h'
  });
  
      res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email, nombre: nuevoUsuario.nombre }, token: token });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' + error });
    }
  };
  
  
  exports.perfil = async (req, res) => {
    res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
  };