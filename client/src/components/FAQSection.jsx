import React, { useState } from 'react';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';
import Button from '../ui-components/Button';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuánto tiempo tardan en completar un proyecto?",
      answer: "El tiempo de entrega varía según la complejidad del proyecto. Los proyectos simples pueden completarse en 2-3 semanas, mientras que los más complejos pueden tomar de 1 a 3 meses."
    },
    {
      question: "¿Ofrecen garantía en sus trabajos?",
      answer: "Sí, ofrecemos una garantía de 2 años en todos nuestros trabajos de fabricación y restauración."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  console.log('FAQSection is rendering'); // Mensaje de depuración

  return (
    <div style={{ padding: '3rem 0', backgroundColor: '#f8f9fa' }}>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2c3e50' }}>
          Preguntas Frecuentes
        </h2>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '2rem' }}>
          Encuentra respuestas a las preguntas más comunes
        </p>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              style={{ 
                marginBottom: '1rem', 
                border: '1px solid #ecf0f1',
                cursor: 'pointer'
              }}
            >
              <Card.Body>
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1.5rem' 
                  }} 
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{faq.question}</h3>
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#3498db',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid #ecf0f1' }}>
                    <p style={{ margin: 0, color: '#7f8c8d' }}>{faq.answer}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Card style={{ 
            background: 'linear-gradient(135deg, #2c3e50, #3498db)', 
            color: 'white' 
          }}>
            <Card.Body>
              <h3 style={{ marginTop: 0, color: 'white' }}>¿Tienes otras preguntas?</h3>
              <p style={{ color: '#ecf0f1', marginBottom: '1.5rem' }}>
                No dudes en contactarnos para obtener más información.
              </p>
              <Button variant="accent" size="lg">
                Contáctanos
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;