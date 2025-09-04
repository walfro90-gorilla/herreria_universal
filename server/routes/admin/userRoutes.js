const express = require('express');
const router = express.Router();
const { auth, admin } = require('../../middleware/auth');
const { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../../controllers/admin/userController');

// Todas las rutas requieren autenticación y rol de administrador
router.use(auth, admin);

// Rutas para usuarios
router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;