const express = require('express');
const router = express.Router();
const sequelize = require('./config/database');

router.get('/test-db', async (req, res) => {
  try {
 // Prueba simple para consultar la hora actual en Postgres
    const [results, metadata] = await sequelize.query('SELECT NOW()');
    res.json({ success: true, time: results[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
