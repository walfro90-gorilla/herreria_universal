import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <SEO 
        title="Productos"
        description="Descubre nuestra colección de piezas de herrería artesanal de la más alta calidad. Puertas, rejas, muebles y más, todos hechos a mano con hierro forjado."
        keywords="productos herrería, hierro forjado, puertas de hierro, rejas decorativas, muebles de hierro, artesanía"
      />
      
      <h2>Nuestros Productos</h2>
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default ProductsPage;