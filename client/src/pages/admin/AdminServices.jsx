import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../ui-components/Button';
import Card from '../../ui-components/Card';
import Container from '../../ui-components/Container';

const AdminServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Verificar si el usuario es administrador
  if (!user || user.role !== 'admin') {
    return (
      <Container>
        <div className="admin-container">
          <Card>
            <Card.Body>
              <h2>Acceso Denegado</h2>
              <p>No tienes permisos para acceder a esta sección.</p>
              <div className="admin-actions">
                <a href="/admin">
                  <Button variant="primary">Volver al Panel</Button>
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }

  const fetchServices = useCallback(async () => {
    if (!user || !user.token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/services`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al cargar los servicios');
      }
      
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error('Error al cargar los servicios:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = async (serviceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar el servicio');
        }
        
        // Actualizar la lista de servicios
        setServices(services.filter(service => service._id !== serviceId));
      } catch (err) {
        console.error('Error al eliminar el servicio:', err);
        alert('Error al eliminar el servicio');
      }
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setShowForm(true);
  };

  const handleCreate = () => {
    setCurrentService(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setCurrentService(null);
    fetchServices(); // Refrescar la lista
  };

  return (
    <Container>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestión de Servicios</h1>
          <Button variant="primary" onClick={handleCreate}>Agregar Nuevo Servicio</Button>
        </div>
        
        {loading && <p>Cargando servicios...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        
        {!loading && !error && (
          <div className="admin-services-grid">
            {services.map((service) => (
              <Card key={service._id} className="admin-service-card">
                <Card.Body>
                  <h3>{service.name}</h3>
                  <p><strong>Categoría:</strong> {service.category}</p>
                  {service.price && <p><strong>Precio:</strong> ${service.price}</p>}
                  {service.duration && <p><strong>Duración:</strong> {service.duration}</p>}
                  <p><strong>Activo:</strong> {service.isActive ? 'Sí' : 'No'}</p>
                  <div className="admin-service-actions">
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(service)}>
                      Editar
                    </Button>
                    <Button variant="accent" size="sm" onClick={() => handleDelete(service._id)}>
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
        
        {showForm && (
          <ServiceForm 
            service={currentService} 
            onClose={handleFormClose} 
            token={user.token}
          />
        )}
      </div>
    </Container>
  );
};

// Componente de formulario para crear/editar servicios
const ServiceForm = ({ service, onClose, token }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || '',
    category: service?.category || 'Fabricación',
    duration: service?.duration || '',
    image: service?.image || '',
    isActive: service?.isActive !== undefined ? service.isActive : true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'Fabricación',
    'Restauración',
    'Mantenimiento',
    'Diseño Personalizado',
    'Instalación'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const url = service 
        ? `${import.meta.env.VITE_API_URL}/admin/services/${service._id}`
        : `${import.meta.env.VITE_API_URL}/admin/services`;
        
      const method = service ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar el servicio');
      }
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <Card className="service-form-card">
        <Card.Body>
          <h2>{service ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
          
          {error && <div className="alert alert-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-control"
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Precio (opcional)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="duration">Duración (opcional)</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: 2-3 semanas"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">URL de imagen (opcional)</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Servicio activo
              </label>
            </div>
            
            <div className="form-actions">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminServices;