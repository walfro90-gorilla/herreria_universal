import React from 'react';

const Row = ({ children, className = '', ...props }) => {
  return (
    <div className={`row ${className}`} {...props}>
      {children}
    </div>
  );
};

const Col = ({ children, size, md, lg, className = '', ...props }) => {
  let classes = className;
  
  if (size) {
    classes += ` col-${size}`;
  }
  
  if (md) {
    classes += ` col-md-${md}`;
  }
  
  if (lg) {
    classes += ` col-lg-${lg}`;
  }
  
  // Si no se especifica tamaño, usar col por defecto
  if (!size && !md && !lg) {
    classes += ' col';
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Row, Col };