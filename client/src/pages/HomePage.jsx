import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';
import { Row, Col } from '../ui-components/Grid';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Puerta de Hierro Forjado',
      description: 'Puerta principal de hierro forjado con diseño clásico',
      price: 1200,
    },
    {
      id: 2,
      name: 'Reja Decorativa',
      description: 'Reja decorativa para ventanas con patrón floral',
      price: 800,
    },
  ];

  const services = [
    {
      id: 1,
      title: 'Fabricación',
      description: 'Creación de piezas únicas de hierro forjado',
    },
    {
      id: 2,
      title: 'Restauración',
      description: 'Restauración de piezas antiguas y deterioradas',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">Arte en Hierro Forjado</h1>
            <p className="hero-subtitle">
              Creando piezas únicas de herrería artesanal con más de 20 años de experiencia
            </p>
            <div className="hero-buttons">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Ver Catálogo
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="featured-section">
        <Container>
          <h2 className="section-title">Productos Destacados</h2>
          <Row>
            {featuredProducts.map((product) => (
              <Col key={product.id} md={6} lg={6}>
                <Card className="featured-card">
                  <Card.Body>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">Desde ${product.price}</p>
                    <Link to="/products">
                      <Button variant="primary" fullWidth>
                        Ver Detalles
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Servicios */}
      <section className="services-section">
        <Container>
          <h2 className="section-title">Nuestros Servicios</h2>
          <Row>
            {services.map((service) => (
              <Col key={service.id} md={6} lg={6}>
                <Card className="service-card">
                  <Card.Body>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link to="/services">
                      <Button variant="secondary">
                        Más Información
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de CTA */}
      <section className="cta-section">
        <Container>
          <Card className="cta-card">
            <Card.Body>
              <h2>¿Tienes un proyecto en mente?</h2>
              <p>
                Trabajamos proyectos personalizados adaptados a tus necesidades y espacio.
              </p>
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  Solicita una Cotización
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;