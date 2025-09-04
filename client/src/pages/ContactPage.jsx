import React, { useState } from 'react';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';
import { Row, Col } from '../ui-components/Grid';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // En una implementación real, aquí enviaríamos los datos a la API
      // Por ahora, simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular éxito
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Resetear el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setSubmitError(err.message || 'Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      label: 'Dirección',
      value: 'Calle Principal 123, Ciudad',
      description: 'Oficina principal de Herrería Universal'
    },
    {
      icon: '📞',
      label: 'Teléfono',
      value: '+123 456 7890',
      description: 'Lunes a Viernes, 9:00 AM - 6:00 PM'
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'info@herreria.com',
      description: 'Respuesta en 24 horas hábiles'
    }
  ];

  return (
    <Container>
      <div className="contact-page">
        <section className="contact-header">
          <h1 className="section-title">Contáctanos</h1>
          <p className="section-subtitle">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta o proyecto.
          </p>
        </section>

        <section className="contact-content">
          <Row>
            <Col md={6} lg={7}>
              <Card className="contact-form-card">
                <Card.Body>
                  <h2>Envíanos un Mensaje</h2>
                  <p>
                    Rellena el formulario y nos pondremos en contacto contigo lo antes posible.
                  </p>
                  
                  {submitSuccess && (
                    <div className="alert alert-success">
                      ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="alert alert-error">
                      {submitError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Nombre completo *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="+1234567890"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="subject">Asunto *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="Asunto del mensaje"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Mensaje *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="5"
                        placeholder="Tu mensaje..."
                      />
                    </div>
                    
                    <div className="form-actions">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                      </Button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={5}>
              <div className="contact-info-section">
                <Card className="contact-info-card">
                  <Card.Body>
                    <h2>Información de Contacto</h2>
                    <p>
                      Visítanos en nuestra oficina o contáctanos por teléfono o email.
                    </p>
                    
                    <div className="contact-info-list">
                      {contactInfo.map((info, index) => (
                        <div key={index} className="contact-info-item">
                          <div className="contact-info-icon">{info.icon}</div>
                          <div className="contact-info-content">
                            <div className="contact-info-label">{info.label}</div>
                            <div className="contact-info-value">{info.value}</div>
                            <div className="contact-info-description">{info.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="contact-map-card">
                  <Card.Body>
                    <h3>Ubicación</h3>
                    <div className="contact-map">
                      <p>Mapa de ubicación (integración pendiente)</p>
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="contact-hours-card">
                  <Card.Body>
                    <h3>Horario de Atención</h3>
                    <ul className="contact-hours-list">
                      <li><strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM</li>
                      <li><strong>Sábados:</strong> 10:00 AM - 2:00 PM</li>
                      <li><strong>Domingos:</strong> Cerrado</li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </Container>
  );
};

export default ContactPage;