import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import useAdminApi from '../../hooks/useAdminApi';
import Button from '../../ui-components/Button';
import Card from '../../ui-components/Card';
import Container from '../../ui-components/Container';

const AdminProducts = () => {
  const { user } = useAuth();
  const { getProducts, deleteProduct, loading, error } = useAdminApi();
  const [products, setProducts] = useState([]);

  // Verificar si el usuario es administrador
  if (!user || user.role !== 'admin') {
    return (
      <Container>
        <div className="admin-container">
          <Card>
            <Card.Body>
              <h2>Acceso Denegado</h2>
              <p>No tienes permisos para acceder a esta sección.</p>
              <div className="admin-actions">
                <a href="/admin">
                  <Button variant="primary">Volver al Panel</Button>
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(user.token);
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
      }
    };

    if (user && user.token) {
      fetchProducts();
    }
  }, [user, getProducts]);

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(user.token, productId);
        // Actualizar la lista de productos
        setProducts(products.filter(product => product._id !== productId));
      } catch (err) {
        console.error('Error al eliminar el producto:', err);
        alert('Error al eliminar el producto');
      }
    }
  };

  return (
    <Container>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestión de Productos</h1>
          <Button variant="primary">Agregar Nuevo Producto</Button>
        </div>
        
        {loading && <p>Cargando productos...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        
        {!loading && !error && (
          <div className="admin-products-grid">
            {products.map((product) => (
              <Card key={product._id} className="admin-product-card">
                <Card.Body>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p><strong>Precio:</strong> ${product.price}</p>
                  <p><strong>Categoría:</strong> {product.category}</p>
                  <p><strong>En stock:</strong> {product.inStock ? 'Sí' : 'No'}</p>
                  <div className="admin-product-actions">
                    <Button variant="secondary" size="sm">Editar</Button>
                    <Button variant="accent" size="sm" onClick={() => handleDelete(product._id)}>
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminProducts;