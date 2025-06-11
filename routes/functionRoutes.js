const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const verificarToken = require('../middleware/verificarToken');

router.get('/waste-counts', verificarToken, async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM get_waste_type_counts()");
    res.json(results);
  } catch (error) {
    console.error("Error al ejecutar get_waste_type_counts:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get('/quantity-sum-by-transporter', verificarToken, async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM get_quantity_sum_by_transporter()");
    res.json(results);
  } catch (error) {
    console.error("Error al ejecutar get_waste_kg_per_year:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
router.get('/porcentaje-residuos', verificarToken, async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM obtener_porcentaje_residuos()");
    res.json(results);
  } catch (error) {
    console.error("Error al ejecutar get_waste_percentage_by_year:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get('/sum-month', verificarToken, async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM sum_quantity_by_month()");
    res.json(results);
  } catch (error) {
    console.error("Error al ejecutar get_waste_kg_per_month:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;