import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import useAuthApi from '../hooks/useAuthApi';
import SEO from '../components/SEO';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { getProfile } = useAuthApi();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!user || !user.token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getProfile(user.token);
      setProfileData(data);
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, getProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!user) {
    return (
      <Container>
        <SEO 
          title="Acceso Denegado"
          description="Debes iniciar sesión para acceder a tu perfil de usuario."
        />
        
        <div className="profile-container">
          <Card>
            <Card.Body>
              <h2>Acceso Denegado</h2>
              <p>Debes iniciar sesión para ver esta página.</p>
              <div className="profile-actions">
                <a href="/login">
                  <Button variant="primary">Iniciar Sesión</Button>
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <SEO 
        title="Perfil de Usuario"
        description="Gestiona tu perfil de usuario y configura tus preferencias personales."
      />
      
      <div className="profile-container">
        <Card>
          <Card.Body>
            <h2>Perfil de Usuario</h2>
            {loading && <p>Cargando perfil...</p>}
            {error && <div className="alert alert-error">{error}</div>}
            {profileData && (
              <div className="profile-info">
                <p><strong>Nombre:</strong> {profileData.name}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Rol:</strong> {profileData.role}</p>
                <p><strong>ID:</strong> {profileData._id}</p>
              </div>
            )}
            <div className="profile-actions">
              <Button variant="accent" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ProfilePage;