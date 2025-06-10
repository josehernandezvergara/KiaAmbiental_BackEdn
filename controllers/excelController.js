const ResidueLog = require('../models/ResidueLog');

exports.procesarExcel = async (req, res) => {
  try {
    const rows = req.body.data; // -> array de arrays {xls}
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'No se recibieron datos' });
    }
    console.log("rows:",rows);

    // Formato tabla
    const registros = rows.map((row) => ({
        //uhm, puente para comvertir las filas del excel en arrays 
      // depende de los indices de las filas del excel corregir en caso de que en el excel venga dif
      collection_date:  row[1] || null,     // segunda fila
      waste_type:       row[2] || null,
      residue_type:     row[3] || null,
      transporter_name: row[4] || null,
      disposal_site:    row[5] || null,
      area:             row[6] || null,
      weight:           row[7] !== "" ? parseFloat(row[7]) : null,
      quantity:         row[8] !== "" ? parseFloat(row[8]) : null,
      unit:             row[9] || null,
      remission_number: row[10] || null,
      manifest_number:  row[11] || null,
    }));

    // insert cn Sequelize
    const creados = await ResidueLog.bulkCreate(registros);

    res.status(201).json({
      mensaje: `${creados.length} subido a la db`,
      data: creados
    });
  } catch (err) {
    console.error('Error procesando Excel:', err);
    res.status(500).json({ error: 'Error interno al procesar datos' });
  }
};


//obtener data (excel)
exports.datosExcel= async (req, res) => {
  const datos = await ResidueLog.findAll();
  res.status(200).json({data: datos})
};