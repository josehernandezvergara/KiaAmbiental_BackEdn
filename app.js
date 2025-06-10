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
const residueRoutes = require('./routes/residueRoutes');
const excelRoutes = require('./routes/excelRoutes');
const residueAuthRoutes = require('./routes/residueAuthRoutes');


//prueba db
const testRoutes = require('./testRoutes');
app.use('/api', testRoutes);

app.use(cors())
// Middleware para JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/admin', adminDashboardRoutes);
app.use('/api', residueRoutes);
app.use('/api', excelRoutes);
app.use('/api', residueAuthRoutes);

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




