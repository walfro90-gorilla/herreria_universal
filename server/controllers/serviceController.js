const Service = require('../models/Service');

// @desc    Obtener todos los servicios
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un servicio por ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear un nuevo servicio
// @route   POST /api/admin/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const { name, description, price, category, duration, image, isActive } = req.body;
    
    const service = new Service({
      name,
      description,
      price,
      category,
      duration,
      image,
      isActive
    });
    
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar un servicio
// @route   PUT /api/admin/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const { name, description, price, category, duration, image, isActive } = req.body;
    
    const service = await Service.findById(req.params.id);
    
    if (service) {
      service.name = name || service.name;
      service.description = description || service.description;
      service.price = price !== undefined ? price : service.price;
      service.category = category || service.category;
      service.duration = duration || service.duration;
      service.image = image || service.image;
      service.isActive = isActive !== undefined ? isActive : service.isActive;
      
      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar un servicio
// @route   DELETE /api/admin/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (service) {
      await service.remove();
      res.json({ message: 'Servicio eliminado' });
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener todos los servicios (incluyendo inactivos) para administradores
// @route   GET /api/admin/services
// @access  Private/Admin
const getServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesAdmin
};