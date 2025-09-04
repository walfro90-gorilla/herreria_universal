import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>En stock: {product.inStock ? 'Sí' : 'No'}</p>
    </div>
  );
};

export default ProductCard;