const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                error: 'El email ya está registrado'
            });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Buscar usuario
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error: 'Contraseña incorrecta'
            });
        }

        // Generar Token JWT
        const token = jwt.sign({
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET || 'tu_clave_secreta_super_segura', {
                expiresIn: '24h'
            }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getUsers,
    register,
    login
};