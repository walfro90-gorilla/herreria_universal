import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../ui-components/Button';
import Card from '../../ui-components/Card';
import Container from '../../ui-components/Container';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Verificar si el usuario es administrador
  if (!user || user.role !== 'admin') {
    return (
      <Container>
        <div className="admin-container">
          <Card>
            <Card.Body>
              <h2>Acceso Denegado</h2>
              <p>No tienes permisos para acceder al panel de administración.</p>
              <div className="admin-actions">
                <a href="/">
                  <Button variant="primary">Volver al Inicio</Button>
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }

  const adminSections = [
    {
      title: 'Gestión de Productos',
      description: 'Agregar, editar y eliminar productos',
      link: '/admin/products'
    },
    {
      title: 'Gestión de Servicios',
      description: 'Agregar, editar y eliminar servicios',
      link: '/admin/services'
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Ver y administrar usuarios',
      link: '/admin/users'
    },
    {
      title: 'Estadísticas',
      description: 'Ver estadísticas del sitio',
      link: '/admin/analytics'
    },
    {
      title: 'Configuración',
      description: 'Configurar opciones del sitio',
      link: '/admin/settings'
    }
  ];

  return (
    <Container>
      <div className="admin-container">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user.name}. Aquí puedes gestionar tu sitio.</p>
        
        <div className="admin-grid">
          {adminSections.map((section, index) => (
            <Card key={index} className="admin-card">
              <Card.Body>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <a href={section.link}>
                  <Button variant="primary" fullWidth>
                    Acceder
                  </Button>
                </a>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;