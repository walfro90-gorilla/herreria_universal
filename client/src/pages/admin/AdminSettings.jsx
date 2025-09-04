import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../ui-components/Button';
import Card from '../../ui-components/Card';
import Container from '../../ui-components/Container';

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    siteName: 'Herrería Universal',
    contactEmail: 'info@herreria.com',
    phone: '+1234567890',
    address: 'Calle Principal 123, Ciudad'
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una implementación real, aquí haríamos una llamada a la API
    alert('Configuración guardada correctamente');
  };

  return (
    <Container>
      <div className="admin-container">
        <h1>Configuración del Sitio</h1>
        
        <Card>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="siteName">Nombre del Sitio</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactEmail">Email de Contacto</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <textarea
                  id="address"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              
              <Button type="submit" variant="primary">
                Guardar Configuración
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AdminSettings;