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
    
    // Verificar si ya existen servicios
    const existingServices = await Service.countDocuments();
    
    if (existingServices > 0) {
      console.log('Ya existen servicios en la base de datos');
      process.exit(0);
    }
    
    // Crear servicios de ejemplo
    const services = [
      {
        name: 'Fabricación de Puertas',
        description: 'Puertas principales y de interior de hierro forjado con diseños personalizados. Creamos piezas únicas que combinan funcionalidad y arte.',
        price: 1200,
        category: 'Fabricación',
        duration: '2-3 semanas',
        image: 'https://images.unsplash.com/photo-1534889156217-81c2d90898d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Rejas Decorativas',
        description: 'Rejas para ventanas y balcones con patrones florales y geométricos. Protección y estilo para tu hogar.',
        price: 800,
        category: 'Fabricación',
        duration: '1-2 semanas',
        image: 'https://images.unsplash.com/photo-1595152872357-6b3f7d4a5f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Muebles de Hierro',
        description: 'Mesas, sillas y otros muebles de hierro forjado para interiores y exteriores. Piezas duraderas con diseño artesanal.',
        price: 1500,
        category: 'Fabricación',
        duration: '3-4 semanas',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Restauración',
        description: 'Restauración de piezas de hierro forjado antiguas y deterioradas. Devolvemos la vida a tus muebles y elementos decorativos.',
        price: null,
        category: 'Restauración',
        duration: 'Varía según el proyecto',
        image: 'https://images.unsplash.com/photo-1591476094392-5d5e0f0d2e1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Mantenimiento',
        description: 'Servicio de mantenimiento preventivo y correctivo para estructuras y elementos de hierro forjado.',
        price: 200,
        category: 'Mantenimiento',
        duration: '1 día',
        isActive: true
      },
      {
        name: 'Diseño Personalizado',
        description: 'Creamos piezas únicas según tus especificaciones y necesidades. Trabajamos contigo para materializar tu visión.',
        price: null,
        category: 'Diseño Personalizado',
        duration: 'Varía según el proyecto',
        isActive: true
      }
    ];
    
    await Service.insertMany(services);
    console.log('Servicios creados exitosamente');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });