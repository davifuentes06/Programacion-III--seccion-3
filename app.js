require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./conexion/db');

// Importar rutas
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api', getRoutes);
app.use('/api', postRoutes);

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