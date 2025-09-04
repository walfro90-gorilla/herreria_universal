import React, { useState, useEffect } from 'react';
import { Row, Col } from '../ui-components/Grid';
import Card from '../ui-components/Card';
import Button from '../ui-components/Button';
import Container from '../ui-components/Container';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('ServicesPage useEffect mounted');
    
    const fetchServices = async () => {
      try {
        console.log('Fetching services from:', `${import.meta.env.VITE_API_URL}/services`);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Services data:', data);
        console.log('Setting services state with', data.length, 'items');
        setServices(data);
        setLoading(false);
        console.log('Services state updated');
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
    
    // Cleanup function
    return () => {
      console.log('ServicesPage useEffect cleanup');
    };
  }, []);

  console.log('ServicesPage render - services length:', services.length, 'loading:', loading, 'error:', error);

  if (loading) {
    console.log('Rendering loading state');
    return <Container><p>Cargando servicios...</p></Container>;
  }
  
  if (error) {
    console.log('Rendering error state');
    return <Container><p>Error: {error}</p></Container>;
  }

  if (services.length === 0) {
    console.log('Rendering no services state');
    return (
      <Container>
        <section className="services-header">
          <h1>Nuestros Servicios</h1>
          <p className="services-subtitle">
            Ofrecemos una amplia gama de servicios de herrería artesanal de la más alta calidad
          </p>
        </section>
        <p>No se encontraron servicios disponibles en este momento.</p>
      </Container>
    );
  }

  console.log('Rendering services grid with', services.length, 'items');

  return (
    <Container>
      <section className="services-header">
        <h1>Nuestros Servicios</h1>
        <p className="services-subtitle">
          Ofrecemos una amplia gama de servicios de herrería artesanal de la más alta calidad
        </p>
      </section>

      <section className="services-grid">
        <Row>
          {services.map((service) => (
            <Col key={service._id} md={6} lg={3}>
              <Card className="service-card">
                {service.image && (
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                  </div>
                )}
                <Card.Body>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  {service.price && <p className="price">Desde ${service.price}</p>}
                  {service.duration && <p className="duration">Duración: {service.duration}</p>}
                  <Button variant="primary" fullWidth>
                    Más Información
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="services-cta">
        <Card className="cta-card">
          <Card.Body>
            <h2>¿Buscas un proyecto personalizado?</h2>
            <p>
              Contáctanos para discutir tus ideas y obtener una cotización sin compromiso.
            </p>
            <Button variant="accent" size="lg">
              Solicitar Cotización
            </Button>
          </Card.Body>
        </Card>
      </section>
    </Container>
  );
};

export default ServicesPage;