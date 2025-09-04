const mongoose = require('mongoose');
require('dotenv').config();

// Importar el modelo de usuario
const User = require('./models/User');

// Obtener la URI de MongoDB desde variables de entorno o usar la local por defecto
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/herreria';

// Conexión a MongoDB
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Conectado a MongoDB');
    
    // Verificar si ya existe un usuario admin
    const existingAdmin = await User.findOne({ email: 'admin@herreria.com' });
    
    if (existingAdmin) {
      console.log('Usuario administrador ya existe');
      process.exit(0);
    }
    
    // Crear usuario administrador
    const adminUser = new User({
      name: 'Administrador',
      email: 'admin@herreria.com',
      password: 'admin123', // En producción, usa una contraseña más segura
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Usuario administrador creado exitosamente');
    console.log('Email: admin@herreria.com');
    console.log('Contraseña: admin123');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });