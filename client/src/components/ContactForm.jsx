import React, { useState } from 'react';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
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
        service: '',
        message: ''
      });
      
      // Resetear el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      <Container>
        <Card className="contact-form-card">
          <Card.Body>
            <h2 className="contact-form-title">Solicita una Cotización</h2>
            <p className="contact-form-subtitle">
              ¿Interesado en alguno de nuestros servicios? Contáctanos para obtener una cotización personalizada.
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
                  <label htmlFor="service">Servicio de interés</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="fabricacion">Fabricación</option>
                    <option value="restauracion">Restauración</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="diseno">Diseño Personalizado</option>
                    <option value="instalacion">Instalación</option>
                    <option value="otros">Otros</option>
                  </select>
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
                  rows="4"
                  placeholder="Cuéntanos sobre tu proyecto, necesidades específicas, etc."
                />
              </div>
              
              <div className="form-actions">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default ContactForm;