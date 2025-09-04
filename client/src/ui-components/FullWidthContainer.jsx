import React from 'react';

const FullWidthContainer = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`full-width-container ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default FullWidthContainer;