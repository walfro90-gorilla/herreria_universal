const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { auth, admin } = require('../middleware/auth');

// Rutas públicas
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);

// Rutas protegidas para administradores
router.get('/admin', auth, admin, serviceController.getServicesAdmin);
router.post('/admin', auth, admin, serviceController.createService);
router.put('/admin/:id', auth, admin, serviceController.updateService);
router.delete('/admin/:id', auth, admin, serviceController.deleteService);

module.exports = router;