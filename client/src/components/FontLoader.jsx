import React from 'react';
import { Helmet } from 'react-helmet-async';

const FontLoader = () => {
  return (
    <Helmet>
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
    </Helmet>
  );
};

export default FontLoader;