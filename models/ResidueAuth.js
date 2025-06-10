const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResidueAuth = sequelize.define('residue_authorizations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  residue_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  folio: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  time: {
    type: DataTypes.TIME,
  },
  requester_name: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  origin: {
    type: DataTypes.STRING,
  },
  destination: {
    type: DataTypes.STRING,
  },
  reason: {
    type: DataTypes.STRING,
  },
  material_type: {
    type: DataTypes.STRING,
  },
  container_type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  tara: {
    type: DataTypes.DECIMAL,
  },
  gross_weight: {
    type: DataTypes.DECIMAL,
  },
  net_weight: {
    type: DataTypes.DECIMAL,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  license_plate: {
    type: DataTypes.STRING,
  },
  economic_number: {
    type: DataTypes.STRING,
  },
  authorized_by: {
    type: DataTypes.STRING,
  },
  authorization_date: {
    type: DataTypes.DATE,
  },
  file_name:{
    type: DataTypes.STRING,
  }
}, {
  tableName: 'residue_authorizations',
  timestamps: false,
});

module.exports = ResidueAuth;
