const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secreto_por_defecto', {
    expiresIn: '30d'
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    // Crear usuario
    const user = await User.create({
      name,
      email,
      password
    });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error en el servidor' });
  }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error en el servidor' });
  }
};

// @desc    Obtener perfil de usuario
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // req.user se establece en el middleware de autenticación
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error en el servidor' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};