import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';
import { Row, Col } from '../ui-components/Grid';

// Componentes cargados de forma diferida
const WorkGallery = lazy(() => import('../components/WorkGallery'));
const HomeFAQSection = lazy(() => import('../components/HomeFAQSection'));

// Componente de fallback para carga diferida
const LoadingFallback = () => (
  <div className="loading-fallback">
    <p>Cargando...</p>
  </div>
);

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

  const testimonials = [
    {
      id: 1,
      text: 'La puerta que hicieron para nuestra casa es una obra de arte. La atención al detalle es impresionante.',
      author: 'María González',
      role: 'Cliente Satisfecha'
    },
    {
      id: 2,
      text: 'Excelente calidad y servicio. Nos entregaron el proyecto antes de lo acordado y superó nuestras expectativas.',
      author: 'Carlos Rodríguez',
      role: 'Arquitecto'
    },
    {
      id: 3,
      text: 'Hemos contratado sus servicios por años. Siempre cumplen con lo prometido y la calidad es inigualable.',
      author: 'Ana Martínez',
      role: 'Cliente Corporativo'
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Cambiar testimonio automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-page">
      <SEO 
        title="Inicio"
        description="Herrería Universal - Creando piezas únicas de herrería artesanal con más de 20 años de experiencia. Especialistas en fabricación, restauración y diseño personalizado de hierro forjado."
        keywords="herrería, hierro forjado, fabricación, restauración, diseño personalizado, puertas, rejas, muebles"
      />
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

      {/* Sección de Testimonios */}
      <section className="testimonials-section">
        <Container>
          <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card"
                style={{ display: index === activeTestimonial ? 'block' : 'none' }}
              >
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            ))}
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  className={`testimonial-indicator ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Galería de Trabajos Recientes - Cargada de forma diferida */}
      <Suspense fallback={<LoadingFallback />}>
        <WorkGallery />
      </Suspense>

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

      {/* Sección de Preguntas Frecuentes */}
      <Suspense fallback={<LoadingFallback />}>
        <HomeFAQSection />
      </Suspense>

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

      {/* Sección de Contacto */}
      <section className="contact-section">
        <Container>
          <h2 className="section-title">Contáctanos</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-label">Dirección</div>
              <div className="contact-value">Calle Principal 123, Ciudad</div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-label">Teléfono</div>
              <div className="contact-value">+123 456 7890</div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-label">Email</div>
              <div className="contact-value">info@herreria.com</div>
            </div>
          </div>
          <div className="contact-map">
            <p>Mapa de ubicación (integración pendiente)</p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;