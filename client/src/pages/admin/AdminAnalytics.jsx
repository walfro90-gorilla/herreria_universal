import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../ui-components/Button';
import Card from '../../ui-components/Card';
import Container from '../../ui-components/Container';
import { Row, Col } from '../../ui-components/Grid';

const AdminAnalytics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

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

  // En una implementación real, aquí haríamos llamadas a la API
  // Por ahora, simulamos datos
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos simulados
        const mockStats = {
          totalProducts: 24,
          totalUsers: 142,
          totalOrders: 56,
          revenue: 24500
        };
        
        setStats(mockStats);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container>
      <div className="admin-container">
        <h1>Estadísticas</h1>
        
        {loading && <p>Cargando estadísticas...</p>}
        
        {!loading && (
          <div className="admin-analytics">
            <Row>
              <Col md={6} lg={3}>
                <Card className="stat-card">
                  <Card.Body>
                    <h3>Productos</h3>
                    <p className="stat-number">{stats.totalProducts}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3}>
                <Card className="stat-card">
                  <Card.Body>
                    <h3>Usuarios</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3}>
                <Card className="stat-card">
                  <Card.Body>
                    <h3>Pedidos</h3>
                    <p className="stat-number">{stats.totalOrders}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3}>
                <Card className="stat-card">
                  <Card.Body>
                    <h3>Ingresos</h3>
                    <p className="stat-number">${stats.revenue}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <div className="chart-container">
              <Card>
                <Card.Body>
                  <h3>Ventas por Mes</h3>
                  <div className="chart-placeholder">
                    <p>Gráfico de ventas (en implementación)</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminAnalytics;