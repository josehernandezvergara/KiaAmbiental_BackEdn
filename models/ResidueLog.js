const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResidueLog = sequelize.define('residue_logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  collection_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  transporter_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  disposal_site: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  waste_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  remission_hmmx: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  remision_kia: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  purchase_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  item: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
  collection_date: DataTypes.DATE,
  waste_type: DataTypes.STRING,
  transporter_name: DataTypes.STRING,
  disposal_site: DataTypes.STRING,
  area: DataTypes.STRING,
  weight: DataTypes.DECIMAL,
  quantity: DataTypes.DECIMAL,
  unit: DataTypes.STRING,
  remission_number: DataTypes.STRING,
  manifest_number: DataTypes.STRING,
}, {
  tableName: 'residue_logs',
  timestamps: false,
});

module.exports = ResidueLog;
