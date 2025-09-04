const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const adminUserRoutes = require('./routes/admin/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Obtener la URI de MongoDB desde variables de entorno o usar la local por defecto
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/herreria';

// Conexión a MongoDB con manejo de errores
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    console.log('Continuando sin conexión a la base de datos. Usando datos mock.');
  });

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', require('./routes/passwordRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/admin/services', require('./routes/serviceRoutes'));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;