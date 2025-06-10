const ResidueAuth = require('../models/ResidueAuth');

exports.obtenerAuth = async (req, res) => {
  const log = await ResidueAuth.findAll();
  res.json(log);
};