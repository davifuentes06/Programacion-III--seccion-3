const {
    DataTypes
} = require('sequelize');
const sequelize = require('../conexion/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cliente',
        validate: {
            isIn: [['admin', 'cliente']]
        }
    },
});

module.exports = User;