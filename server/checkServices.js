const mongoose = require('mongoose');
require('dotenv').config();

// Importar el modelo de servicio
const Service = require('./models/Service');

// Obtener la URI de MongoDB desde variables de entorno o usar la local por defecto
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/herreria';

// Conexión a MongoDB
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Conectado a MongoDB');
    
    // Obtener todos los servicios
    const services = await Service.find({});
    console.log(`Total de servicios: ${services.length}`);
    
    // Mostrar detalles de cada servicio
    services.forEach((service, index) => {
      console.log(`\nServicio ${index + 1}:`);
      console.log(`  ID: ${service._id}`);
      console.log(`  Nombre: ${service.name}`);
      console.log(`  Activo: ${service.isActive}`);
      console.log(`  Categoría: ${service.category}`);
    });
    
    // Contar servicios activos
    const activeServices = await Service.countDocuments({ isActive: true });
    console.log(`\nServicios activos: ${activeServices}`);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });