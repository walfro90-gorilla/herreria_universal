const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false // Algunos servicios pueden no tener precio fijo
  },
  category: {
    type: String,
    required: true,
    enum: ['Fabricación', 'Restauración', 'Mantenimiento', 'Diseño Personalizado', 'Instalación']
  },
  duration: {
    type: String, // Ej: "2-3 semanas", "1 mes", etc.
    required: false
  },
  image: {
    type: String, // URL de la imagen del servicio
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);