const Product = require('../models/Product');

// Datos mock para cuando no hay conexión a la base de datos
const mockProducts = [
  {
    _id: '1',
    name: 'Puerta de Hierro Forjado',
    description: 'Puerta principal de hierro forjado con diseño clásico',
    price: 1200,
    category: 'Puertas',
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Reja Decorativa',
    description: 'Reja decorativa para ventanas con patrón floral',
    price: 800,
    category: 'Rejas',
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Mesa de Comedor',
    description: 'Mesa de comedor de hierro forjado con capacidad para 6 personas',
    price: 1500,
    category: 'Muebles',
    inStock: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  // Verificar si hay conexión a la base de datos
  if (require('mongoose').connection.readyState !== 1) {
    // En modo mock, simplemente devolvemos un mensaje
    return res.status(201).json({ message: 'Producto creado (mock)' });
  }
  
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  // Verificar si hay conexión a la base de datos
  if (require('mongoose').connection.readyState !== 1) {
    // En modo mock, devolvemos los datos mock
    return res.status(200).json(mockProducts);
  }
  
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  // Verificar si hay conexión a la base de datos
  if (require('mongoose').connection.readyState !== 1) {
    // En modo mock, buscamos en los datos mock
    const product = mockProducts.find(p => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.status(200).json(product);
  }
  
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  // Verificar si hay conexión a la base de datos
  if (require('mongoose').connection.readyState !== 1) {
    // En modo mock, simplemente devolvemos un mensaje
    return res.status(200).json({ message: 'Producto actualizado (mock)' });
  }
  
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Ejecuta las validaciones del esquema
    });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  // Verificar si hay conexión a la base de datos
  if (require('mongoose').connection.readyState !== 1) {
    // En modo mock, simplemente devolvemos un mensaje
    return res.status(200).json({ message: 'Producto eliminado (mock)' });
  }
  
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};