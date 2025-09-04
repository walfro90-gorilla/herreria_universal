const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }
    
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_por_defecto');
    
    // Buscar el usuario
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    
    // Adjuntar el usuario al request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

// Middleware para verificar si es administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};

module.exports = { auth, admin };