import React, { useState, useEffect } from 'react';
import { Row, Col } from '../ui-components/Grid';
import Card from '../ui-components/Card';
import Button from '../ui-components/Button';
import Container from '../ui-components/Container';
import ContactForm from '../components/ContactForm';
import FAQSection from '../components/FAQSection';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <Container><p>Cargando servicios...</p></Container>;
  if (error) return <Container><p>Error: {error}</p></Container>;

  if (services.length === 0) {
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

  return (
    <div>
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
              <Col key={service._id} md={6} lg={4}>
                <Card className="service-card">
                  {service.image && (
                    <div className="service-image">
                      <img src={service.image} alt={service.name} />
                    </div>
                  )}
                  <Card.Body>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    {service.price && (
                      <div className="service-price">
                        <span className="price-label">Desde</span>
                        <span className="price-amount">${service.price}</span>
                      </div>
                    )}
                    {service.price === null && (
                      <div className="service-price">
                        <span className="price-label">Precio a cotizar</span>
                      </div>
                    )}
                    {service.duration && <p className="duration">Duración estimada: {service.duration}</p>}
                    <Button variant="primary" fullWidth>
                      Solicitar Cotización
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
      
      {/* Formulario de Contacto */}
      <ContactForm />
      
      {/* Sección de Preguntas Frecuentes */}
      <FAQSection />
      
      <Container>
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
    </div>
  );
};

export default ServicesPage;