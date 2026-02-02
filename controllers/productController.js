const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                activo: true
            },
            order: [['createdAt', 'DESC']]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (!product || !product.activo) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            codigo,
            nombre,
            precio,
            descripcion,
            imagen,
            categoria,
            stock
        } = req.body;

        // Verificar si el código ya existe
        const existingProduct = await Product.findOne({
            where: {
                codigo: codigo.toUpperCase()
            }
        });
        
        if (existingProduct) {
            return res.status(400).json({
                error: 'Ya existe un producto con ese código'
            });
        }

        const product = await Product.create({
            codigo: codigo.toUpperCase(),
            nombre,
            precio: parseFloat(precio),
            descripcion,
            imagen: imagen || '/placeholder.svg',
            categoria: categoria || 'smartphone',
            stock: parseInt(stock) || 0
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            codigo,
            nombre,
            precio,
            descripcion,
            imagen,
            categoria,
            stock,
            activo
        } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        // Si se está cambiando el código, verificar que no exista
        if (codigo && codigo.toUpperCase() !== product.codigo) {
            const existingProduct = await Product.findOne({
                where: {
                    codigo: codigo.toUpperCase()
                }
            });
            
            if (existingProduct) {
                return res.status(400).json({
                    error: 'Ya existe un producto con ese código'
                });
            }
        }

        await product.update({
            codigo: codigo ? codigo.toUpperCase() : product.codigo,
            nombre: nombre || product.nombre,
            precio: precio ? parseFloat(precio) : product.precio,
            descripcion: descripcion || product.descripcion,
            imagen: imagen !== undefined ? imagen : product.imagen,
            categoria: categoria || product.categoria,
            stock: stock !== undefined ? parseInt(stock) : product.stock,
            activo: activo !== undefined ? activo : product.activo
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        // Soft delete - marcar como inactivo
        await product.update({ activo: false });
        
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const searchProductByCode = async (req, res) => {
    try {
        const { codigo } = req.params;
        
        const product = await Product.findOne({
            where: {
                codigo: codigo.toUpperCase(),
                activo: true
            }
        });
        
        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProductByCode
};