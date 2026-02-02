require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./conexion/db');

// Importar modelos
require('./models/User');
require('./models/Product');

// Importar rutas
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api', postRoutes);
app.use('/api', getRoutes);

// Sincronizar DB y arrancar servidor
sequelize.sync()
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });