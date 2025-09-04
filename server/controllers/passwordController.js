const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

// @desc    Solicitar recuperación de contraseña
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Verificar que se haya proporcionado un email
    if (!email) {
      return res.status(400).json({ message: 'Por favor proporciona tu email' });
    }
    
    // Buscar al usuario por email
    const user = await User.findOne({ email });
    
    if (!user) {
      // Por razones de seguridad, no revelamos si el email existe o no
      return res.json({ 
        message: 'Si el email existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña.' 
      });
    }
    
    // Generar token de restablecimiento
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Establecer fecha de expiración (1 hora)
    const resetTokenExpiration = Date.now() + 3600000; // 1 hora
    
    // Guardar el token y su expiración en el usuario
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = resetTokenExpiration;
    
    await user.save();
    
    // En una implementación real, aquí enviaríamos un email con el enlace
    // Por ahora, solo devolvemos un mensaje de éxito
    res.json({ 
      message: 'Si el email existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Restablecer contraseña
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Verificar que se hayan proporcionado todos los datos
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
    }
    
    // Hashear el token
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    // Buscar al usuario con el token válido y no expirado
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }
    
    // Establecer la nueva contraseña
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  forgotPassword,
  resetPassword
};