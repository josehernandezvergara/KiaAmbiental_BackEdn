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

exports.obtenerResumenCompleto = async (req, res) => {
  try {
    const ahora = new Date(); // fecha actual
    // demas fechas - inicio del mesAct, mesAnt y el fin del mesAnt
    const inicioMesActual = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const inicioMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth() - 1, 1);
    const finMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);

    // buscar logs del mes actual
    const logsMesActual = await ResidueLog.findAll({
      where: {
        collection_date: { [Op.gte]: inicioMesActual } // si 'inicioMesActual' = 19/05/2025 la condicion es >= 2025/05/0q
      },
      attributes: ['area', 'residue_type', 'weight']
    });

    // buscar logs del mes anterior
    const logsMesAnterior = await ResidueLog.findAll({
      where: {
        collection_date: {
          [Op.gte]: inicioMesAnterior, //>=2025/04/01
          [Op.lte]: finMesAnterior //<= 2025/04/30
        }
      },
      attributes: ['weight']
    });

    // procesar mes actual
    const resumenPorDepartamento = {}; //area: x, tw: 100kg
    const resumenPorResiduo = {}; //vidrio: 80, plastico: 50
    let totalMesActual = 0; //total

    logsMesActual.forEach(log => {
      const { area, residue_type, weight } = log;

      // Agrupar por área
      if (!resumenPorDepartamento[area]) {
        resumenPorDepartamento[area] = 0;
      }
      resumenPorDepartamento[area] += parseFloat(weight || 0);

      // Agrupar por tipo de residuo
      if (!resumenPorResiduo[residue_type]) {
        resumenPorResiduo[residue_type] = 0;
      }
      resumenPorResiduo[residue_type] += parseFloat(weight || 0);

      totalMesActual += parseFloat(weight || 0);
    });

    // Procesar mes anterior
    const totalMesAnterior = logsMesAnterior.reduce((acc, log) => {
      return acc + parseFloat(log.weight || 0); //sum todos los psos
    }, 0);

    // comparar
    let comparacionMensual = null;
    if (totalMesAnterior > 0) {
      const variacion = ((totalMesActual - totalMesAnterior) / totalMesAnterior) * 100;
      comparacionMensual = {
        mesActual: totalMesActual.toFixed(2),
        mesAnterior: totalMesAnterior.toFixed(2),
        variacion: `${variacion >= 0 ? '+' : ''}${variacion.toFixed(2)}%`//calculo automatico de las metricas
      };
    }

    // Enviar resultado final
    return res.status(200).json({
      totalMesActual: totalMesActual.toFixed(2),
      porDepartamento: resumenPorDepartamento,
      porTipoResiduo: resumenPorResiduo,
      comparacionMensual
    });

  } catch (error) {
    console.error('Error al obtener resumen completo:', error);
    return res.status(500).json({ error: 'Error al obtener resumen mensual completo' });
  }
};
