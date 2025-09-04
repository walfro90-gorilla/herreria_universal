const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/passwordController');

// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer contraseña
router.post('/reset-password', resetPassword);

module.exports = router;