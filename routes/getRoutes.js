const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

router.get('/users', userController.getUsers);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/search/:codigo', productController.searchProductByCode);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;