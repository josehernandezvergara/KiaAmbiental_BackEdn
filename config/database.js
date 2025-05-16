const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,        // Requiere SSL
      rejectUnauthorized: false //  ambientes de prueba
    }
  },
  logging: false //desactiva logs de SQL
});

module.exports = sequelize;




