import React from 'react';

const Container = ({ children, fluid = false, className = '', ...props }) => {
  return (
    <div
      className={`container ${fluid ? 'container-fluid' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;