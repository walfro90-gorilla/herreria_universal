import React from 'react';

const Card = ({ children, variant = 'default', className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'default':
        return 'card-default';
      case 'primary':
        return 'card-primary';
      case 'secondary':
        return 'card-secondary';
      default:
        return 'card-default';
    }
  };

  return (
    <div 
      className={`card ${getVariantClass()} ${className}`} 
      {...props}
      role="region"
      aria-label={props['aria-label'] || "Tarjeta de contenido"}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;