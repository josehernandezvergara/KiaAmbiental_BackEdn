const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.contraseña) {
        const hash = await bcrypt.hash(usuario.contraseña, 10);
        usuario.contraseña = hash;
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('contraseña')) {
        const hash = await bcrypt.hash(usuario.contraseña, 10);
        usuario.contraseña = hash;
      }
    }
  }
});

// Método de instancia para comparar contraseña
Usuario.prototype.validarContraseña = function (textoPlano) {
  return bcrypt.compare(textoPlano, this.contraseña);
};

module.exports = Usuario;
