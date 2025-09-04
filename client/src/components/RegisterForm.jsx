import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useAuthApi from '../hooks/useAuthApi';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const { register, loading, error } = useAuthApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const data = await register({ name, email, password });
      
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
      console.error('Error de registro:', err);
    }
  };

  return (
    <Container>
      <div className="auth-container">
        <Card className="auth-card">
          <Card.Body>
            <h2 className="auth-title">Registrarse</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Registrando...' : 'Registrarse'}
              </Button>
            </form>
            <div className="auth-footer">
              <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default RegisterForm;