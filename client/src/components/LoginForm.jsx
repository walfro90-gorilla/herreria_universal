import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useAuthApi from '../hooks/useAuthApi';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { login: apiLogin, loading, error } = useAuthApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await apiLogin({ email, password });
      
      // Crear un objeto de usuario con la estructura esperada
      const user = {
        id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
        token: data.token
      };
      
      login(user);
    } catch (err) {
      // El error ya se maneja en el hook useAuthApi
      console.error('Error de inicio de sesión:', err);
    }
  };

  return (
    <Container>
      <div className="auth-container">
        <Card className="auth-card">
          <Card.Body>
            <h2 className="auth-title">Iniciar Sesión</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
            <div className="auth-footer">
              <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginForm;