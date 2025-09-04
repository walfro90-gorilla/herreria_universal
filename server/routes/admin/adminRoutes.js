const express = require('express');
const router = express.Router();
const { auth, admin } = require('../../middleware/auth');
const { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../../controllers/admin/productController');

// Todas las rutas requieren autenticación y rol de administrador
router.use(auth, admin);

// Rutas para productos
router.route('/products')
  .get(getProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;