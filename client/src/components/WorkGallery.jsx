import React, { useState } from 'react';
import { Row, Col } from '../ui-components/Grid';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';
import Button from '../ui-components/Button';

const WorkGallery = () => {
  // Datos de ejemplo para la galería de trabajos
  const works = [
    {
      id: 1,
      title: 'Puerta Principal Elegante',
      description: 'Puerta de hierro forjado con detalles florales personalizados',
      image: 'https://images.unsplash.com/photo-1595152872357-6b3f7d4a5f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Puertas'
    },
    {
      id: 2,
      title: 'Rejas Decorativas Modernas',
      description: 'Rejas con patrón geométrico para ventana panorámica',
      image: 'https://images.unsplash.com/photo-1534889156217-81c2d90898d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Rejas'
    },
    {
      id: 3,
      title: 'Mesa de Comedor Artística',
      description: 'Mesa de hierro forjado con acabado en negro mate',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Muebles'
    },
    {
      id: 4,
      title: 'Restauración de Barandales',
      description: 'Restauración completa de barandales históricos',
      image: 'https://images.unsplash.com/photo-1591476094392-5d5e0f0d2e1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Restauración'
    },
    {
      id: 5,
      title: 'Lámparas de Hierro Forjado',
      description: 'Juego de lámparas colgantes con diseño vintage',
      image: 'https://images.unsplash.com/photo-1595152411532-8d0d6b3b6b08?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Decoración'
    },
    {
      id: 6,
      title: 'Escultura de Jardín',
      description: 'Escultura decorativa de hierro forjado para jardín',
      image: 'https://images.unsplash.com/photo-1595152548142-3d8b0d2c1b36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Arte'
    }
  ];

  const [selectedWork, setSelectedWork] = useState(null);

  const openModal = (work) => {
    setSelectedWork(work);
  };

  const closeModal = () => {
    setSelectedWork(null);
  };

  return (
    <section className="work-gallery-section">
      <Container>
        <h2 className="section-title">Nuestros Trabajos Recientes</h2>
        <p className="section-subtitle">
          Descubre algunos de nuestros proyectos más recientes y la calidad de nuestro trabajo artesanal
        </p>
        
        <div className="work-gallery-grid">
          <Row>
            {works.map((work) => (
              <Col key={work.id} md={6} lg={4}>
                <Card className="work-card" onClick={() => openModal(work)}>
                  <div className="work-image">
                    <img src={work.image} alt={work.title} />
                    <div className="work-overlay">
                      <div className="work-category">{work.category}</div>
                    </div>
                  </div>
                  <Card.Body>
                    <h3>{work.title}</h3>
                    <p>{work.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        
        <div className="work-gallery-cta">
          <Button variant="primary" size="lg">
            Ver Todos Nuestros Trabajos
          </Button>
        </div>
      </Container>
      
      {/* Modal para mostrar detalles del trabajo */}
      {selectedWork && (
        <div className="work-modal-overlay" onClick={closeModal}>
          <div className="work-modal" onClick={(e) => e.stopPropagation()}>
            <button className="work-modal-close" onClick={closeModal}>×</button>
            <div className="work-modal-content">
              <div className="work-modal-image">
                <img src={selectedWork.image} alt={selectedWork.title} />
              </div>
              <div className="work-modal-info">
                <h2>{selectedWork.title}</h2>
                <div className="work-modal-category">{selectedWork.category}</div>
                <p>{selectedWork.description}</p>
                <Button variant="primary">Solicitar Presupuesto</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkGallery;