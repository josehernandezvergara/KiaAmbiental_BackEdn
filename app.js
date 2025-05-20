require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');



//prueba db
const testRoutes = require('./testRoutes');
app.use('/api', testRoutes);

app.use(cors())
// Middleware para JSON
app.use(express.json()); //para req.body

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);


// Conexión y servidor

sequelize
  .authenticate()

  .then(() => {
    console.log('Conexión a base de datos exitosa');
    app.listen(port, () => {
      console.log('Servidor corriendo');
    });
  })
  .catch(error => console.error('Error al conectar:', error));




