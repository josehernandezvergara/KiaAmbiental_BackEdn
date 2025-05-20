const { Op } = require('sequelize');
const ResidueLog = require('../models/ResidueLog'); // modelo de riduos

//notas: creamos la fun asyncrona para endpoint del dash res men
exports.obtenerResumenMensual = async (req, res) => {
  try {
    const ahora = new Date(); //fech act -> ejemp : hoy es 19-05-2025 entonces 'ahora' =  en formato ingles 2025-05-19:hrs:sgn
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);//inicio de mes- ejempp: 2025-05-01
    //consulta a db               solo los que cumplan la condicion /nota/
    const logs = await ResidueLog.findAll({
      where: {
        //solo deds el inicio de mes
        collection_date: {
          [Op.gte]: inicioMes,
        },
      },
      //del mas reciente al mas ant
      order: [['collection_date', 'DESC']],
      //atributos a traer
      attributes: [
        'id',
        'collection_date',
        'waste_type',
        'residue_type',
        'area',
        'weight',
        'quantity',
        'unit',
      ],
    });
    //enviar registros a front
    res.status(200).json({ data: logs });
    //manejo e errores
  } catch (error) {
    console.error('wrror al obtener datos del dashboard:', error);
    res.status(500).json({ error: 'error al obtener datos del dashboard' });
  }
};
