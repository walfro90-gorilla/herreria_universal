const mongoose = require('mongoose');
require('dotenv').config();

// Importar el modelo de Producto
const Product = require('./models/Product');

// Conexión a MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/herreria';
mongoose.connect(mongoURI);

// Datos de ejemplo
const sampleProducts = [
  {
    name: 'Puerta de Hierro Forjado',
    description: 'Puerta principal de hierro forjado con diseño clásico',
    price: 1200,
    category: 'Puertas',
    inStock: true
  },
  {
    name: 'Reja Decorativa',
    description: 'Reja decorativa para ventanas con patrón floral',
    price: 800,
    category: 'Rejas',
    inStock: true
  },
  {
    name: 'Mesa de Comedor',
    description: 'Mesa de comedor de hierro forjado con capacidad para 6 personas',
    price: 1500,
    category: 'Muebles',
    inStock: false
  },
  {
    name: 'Lámpara de Pie',
    description: 'Lámpara de pie con base de hierro forjado y pantalla de tela',
    price: 350,
    category: 'Iluminación',
    inStock: true
  },
  {
    name: 'Barandilla de Escalera',
    description: 'Barandilla de escalera de hierro forjado con diseño elegante',
    price: 950,
    category: 'Barandillas',
    inStock: true
  }
];

// Función para insertar los datos de ejemplo
const seedProducts = async () => {
  try {
    // Eliminar todos los productos existentes
    await Product.deleteMany({});
    console.log('Colección de productos limpiada');
    
    // Insertar los nuevos productos
    await Product.insertMany(sampleProducts);
    console.log('Datos de ejemplo insertados correctamente');
    
    // Cerrar la conexión
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al insertar datos de ejemplo:', error);
    mongoose.connection.close();
  }
};

// Ejecutar la función
seedProducts();