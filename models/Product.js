const {
    DataTypes
} = require('sequelize');
const sequelize = require('../conexion/db');

const Product = sequelize.define('Product', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '/placeholder.svg'
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'smartphone'
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Product;