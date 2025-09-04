const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta protegida
router.get('/profile', auth, getUserProfile);

module.exports = router;