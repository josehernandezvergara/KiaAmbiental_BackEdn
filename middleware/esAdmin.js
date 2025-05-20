// middleware/esAdmin.js
module.exports = (req, res, next) => {
  if (req.usuario.type_user !== 'admin') {
    return res.status(403).json({ message: 'acceso denegado' });
  }
  next();
};
