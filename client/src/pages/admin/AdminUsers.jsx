import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import useAdminApi from '../../hooks/useAdminApi';
import Button from '../../ui-components/Button';
import Card from '../../ui-components/Card';
import Container from '../../ui-components/Container';

const AdminUsers = () => {
  const { user } = useAuth();
  const { getUsers, deleteUser } = useAdminApi();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchUsers = useCallback(async () => {
    if (!user || !user.token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUsers(user.token);
      setUsers(data);
    } catch (err) {
      console.error('Error al cargar los usuarios:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, getUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteUser(user.token, userId);
        // Actualizar la lista de usuarios
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        console.error('Error al eliminar el usuario:', err);
        alert('Error al eliminar el usuario');
      }
    }
  };

  return (
    <Container>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestión de Usuarios</h1>
          <Button variant="primary">Agregar Nuevo Usuario</Button>
        </div>
        
        {loading && <p>Cargando usuarios...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        
        {!loading && !error && (
          <div className="admin-users-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userData) => (
                  <tr key={userData._id}>
                    <td>{userData.name}</td>
                    <td>{userData.email}</td>
                    <td>{userData.role}</td>
                    <td>
                      <Button variant="secondary" size="sm">Editar</Button>
                      <Button variant="accent" size="sm" onClick={() => handleDelete(userData._id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminUsers;