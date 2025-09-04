import React, { useState } from 'react';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';
import Button from '../ui-components/Button';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuánto tiempo tardan en completar un proyecto?",
      answer: "El tiempo de entrega varía según la complejidad del proyecto. Los proyectos simples pueden completarse en 2-3 semanas, mientras que los más complejos pueden tomar de 1 a 3 meses. Siempre proporcionamos un cronograma detallado antes de comenzar cualquier trabajo."
    },
    {
      question: "¿Ofrecen garantía en sus trabajos?",
      answer: "Sí, ofrecemos una garantía de 2 años en todos nuestros trabajos de fabricación y restauración. Esta garantía cubre defectos en materiales y mano de obra. Los términos específicos se detallan en el contrato de cada proyecto."
    },
    {
      question: "¿Pueden trabajar con diseños personalizados?",
      answer: "¡Absolutamente! La mayoría de nuestros proyectos son personalizados. Trabajamos estrechamente con nuestros clientes para crear piezas únicas que se adapten perfectamente a sus necesidades, espacio y estilo. Proporcionamos bocetos y renders 3D antes de comenzar la fabricación."
    },
    {
      question: "¿Qué mantenimiento requieren las piezas de hierro forjado?",
      answer: "Las piezas de hierro forjado requieren mantenimiento mínimo. Recomendamos inspeccionarlas anualmente y aplicar una capa de protector anticorrosivo cada 3-5 años, dependiendo de las condiciones ambientales. Para piezas expuestas a la intemperie, puede ser necesario un mantenimiento más frecuente."
    },
    {
      question: "¿Trabajan en proyectos comerciales e industriales?",
      answer: "Sí, además de nuestros trabajos residenciales, tenemos amplia experiencia en proyectos comerciales e industriales. Hemos trabajado en restaurantes, hoteles, oficinas y espacios industriales. Cumplimos con todos los códigos y regulaciones aplicables."
    },
    {
      question: "¿Cómo se determina el costo de un proyecto?",
      answer: "El costo se basa en varios factores: complejidad del diseño, cantidad de material requerido, tiempo de mano de obra, acabados especiales y plazos de entrega. Proporcionamos cotizaciones detalladas y escritas sin cargo. El pago generalmente se estructura en un depósito inicial y pagos por hitos."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <Container>
        <h2 id="faq-title" className="section-title">Preguntas Frecuentes</h2>
        <p className="section-subtitle">
          Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
        </p>
        
        <div className="faq-container" role="list">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`faq-card ${activeIndex === index ? 'faq-card-active' : ''}`}
              role="listitem"
            >
              <Card.Body>
                <div 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFAQ(index);
                    }
                  }}
                  tabIndex="0"
                  role="button"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 id={`faq-question-${index}`}>{faq.question}</h3>
                  <span className="faq-toggle" aria-hidden="true">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </div>
                <div 
                  id={`faq-answer-${index}`}
                  className={`faq-answer ${activeIndex === index ? 'faq-answer-show' : ''}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        
        <div className="faq-cta">
          <Card className="cta-card">
            <Card.Body>
              <h3>¿Tienes otras preguntas?</h3>
              <p>
                No dudes en contactarnos para obtener más información sobre nuestros servicios.
              </p>
              <Button 
                variant="accent" 
                size="lg"
                aria-label="Ir al formulario de contacto"
              >
                Contáctanos
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;