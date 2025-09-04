import React from 'react';
import { Row, Col } from '../ui-components/Grid';
import Card from '../ui-components/Card';
import Button from '../ui-components/Button';
import Container from '../ui-components/Container';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: 'Fabricación de Puertas',
      description: 'Puertas principales y de interior de hierro forjado con diseños personalizados.',
      image: 'https://images.unsplash.com/photo-1534889156217-81c2d90898d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      title: 'Rejas Decorativas',
      description: 'Rejas para ventanas y balcones con patrones florales y geométricos.',
      image: 'https://images.unsplash.com/photo-1595152872357-6b3f7d4a5f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 3,
      title: 'Muebles de Hierro',
      description: 'Mesas, sillas y otros muebles de hierro forjado para interiores y exteriores.',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      title: 'Restauración',
      description: 'Restauración de piezas de hierro forjado antiguas y deterioradas.',
      image: 'https://images.unsplash.com/photo-1591476094392-5d5e0f0d2e1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

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
            <Col key={service.id} md={6} lg={3}>
              <Card className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <Card.Body>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
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