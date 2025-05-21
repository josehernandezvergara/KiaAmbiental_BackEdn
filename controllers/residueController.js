const { Op } = require('sequelize');
const ResidueLog = require('../models/ResidueLog');

exports.crearResiduo = async (req, res) => {
  try {
    const {
      collection_date,
      waste_type,
      residue_type,
      transporter_name,
      disposal_site,
      area,
      weight,
      quantity,
      unit,
      remission_number,
      manifest_number
    } = req.body;

    // val básica
    if (!collection_date || !waste_type || !weight || !residue_type) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevo = await ResidueLog.create({
      collection_date,
      waste_type,
      residue_type,
      transporter_name,
      disposal_site,
      area,
      weight,
      quantity,
      unit,
      remission_number,
      manifest_number
    });

    res.status(201).json({ mensaje: 'Residuo creado', data: nuevo });
  } catch (error) {
    console.error('Error al crear residuo:', error);
    res.status(500).json({ error: 'Error al crear residuo' });
  }
};

exports.obtenerResiduoMes = async (req, res) => {
  try {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const logs = await ResidueLog.findAll({
      where: {
        collection_date: { [Op.gte]: inicioMes }
      },
      order: [['collection_date', 'DESC']]
    });

    res.json({ data: logs });
  } catch (error) {
    console.error('Error al obtener residuos del mes:', error);
    res.status(500).json({ error: 'Error al obtener residuos del mes' });
  }
};
//obtener manifiesto sin filtro
// Obtener todos
exports.obtenerLog = async (req, res) => {
  const log = await ResidueLog.findAll();
  res.json(log);
};

// Obtener uno
exports.obtenerLogId = async (req, res) => {
  const log = await ResidueLog.findByPk(req.params.id);
  if (!log) return res.status(404).send('log no encontrado');
  res.json(log);
};