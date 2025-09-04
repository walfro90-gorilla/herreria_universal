import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
      <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
        Inicio
      </Link>
      <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>
        Productos
      </Link>
    </nav>
  );
};

export default Navigation;