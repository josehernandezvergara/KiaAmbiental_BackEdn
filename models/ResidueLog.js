const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResidueLog = sequelize.define('residue_logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  collection_date: DataTypes.DATE,
  waste_type: DataTypes.STRING,
  residue_type: DataTypes.STRING,
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
