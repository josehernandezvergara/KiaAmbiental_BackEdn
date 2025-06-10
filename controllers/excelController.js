const ResidueLog = require('../models/ResidueLog');

// Supón que ya tienes implementada la función parseExcelDate(value)
function parseExcelDate(value) {
  if (!value) return null;
  if (typeof value === "number") {
    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  }
  // Aquí puedes implementar otro parseo si viene como string
  return value;
}

exports.procesarExcel = async (req, res) => {
  try {
    // Aquí 'rows' debe venir de req.body.data
    const rows = req.body.data;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'No se recibieron datos' });
    }

    // Filtra las filas que tengan valor en collection_date (posición 1)
    const validRows = rows.filter(row => row[1]);

    if (validRows.length === 0) {
      return res.status(400).json({ error: 'No se encontraron filas con fecha de colección válida' });
    }
    
    // Mapea las filas válidas a objetos para la DB
    const registros = validRows.map((row) => {
      // Parsea y valida valores numéricos
      let quantity = parseFloat(row[6]);
      if (isNaN(quantity)) quantity = null;
      
      return {
        collection_date: parseExcelDate(row[1]) || null,
        residue_type: null,
        transporter_name: row[3] || null,
        disposal_site : null,
        waste_type       : row[2] || null,
        area             : null,
        weight           : null,
        quantity         : quantity,
        unit             : row[7] || null,
        remission_hmmx   : row[8] || null,
        remision_kia     : row[9] || null,
        purchase_name    : row[4] || null,
        item             : row[5] || null
      };
    });
    
    // Para depurar, imprime los registros
    console.log("Registros a insertar:", JSON.stringify(registros, null, 2));
    
    // Insertar en la base de datos usando bulkCreate
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