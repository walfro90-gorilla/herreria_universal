import React, { useState } from 'react';
import Container from '../ui-components/Container';
import Card from '../ui-components/Card';
import Button from '../ui-components/Button';

const HomeFAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Solo unas pocas preguntas frecuentes para la página principal
  const faqs = [
    {
      question: "¿Cuánto tiempo tardan en completar un proyecto?",
      answer: "Depende de la complejidad. Proyectos simples: 2-3 semanas. Proyectos complejos: 1-3 meses."
    },
    {
      question: "¿Ofrecen garantía en sus trabajos?",
      answer: "Sí, ofrecemos garantía de 2 años en todos nuestros trabajos de fabricación y restauración."
    },
    {
      question: "¿Pueden trabajar con diseños personalizados?",
      answer: "¡Absolutamente! La mayoría de nuestros proyectos son personalizados."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <Container>
        <h2 className="section-title">Preguntas Frecuentes</h2>
        <p className="section-subtitle">
          Encuentra respuestas rápidas a las preguntas más comunes
        </p>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`faq-card ${activeIndex === index ? 'faq-card-active' : ''}`}
            >
              <Card.Body>
                <div 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
        
        <div className="faq-cta">
          <Card className="cta-card">
            <Card.Body>
              <h3>¿Quieres saber más?</h3>
              <p>
                Visita nuestra sección completa de preguntas frecuentes.
              </p>
              <Button variant="accent" size="lg" as="a" href="/services#faq">
                Ver Todas las Preguntas
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default HomeFAQSection;