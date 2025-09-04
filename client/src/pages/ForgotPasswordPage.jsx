import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../ui-components/Button';
import Card from '../ui-components/Card';
import Container from '../ui-components/Container';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'Error al solicitar recuperación de contraseña');
      }
    } catch (err) {
      setError('Error de red. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="auth-container">
        <Card className="auth-card">
          <Card.Body>
            <h2 className="auth-title">Recuperar Contraseña</h2>
            <p className="auth-subtitle">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            
            {message && <div className="alert alert-success">{message}</div>}
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
                  placeholder="tu@email.com"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
              </Button>
            </form>
            
            <div className="auth-footer">
              <p>
                <button 
                  onClick={() => navigate('/login')} 
                  className="auth-link"
                >
                  Volver a Iniciar Sesión
                </button>
              </p>
              <p>
                ¿No tienes cuenta? <a href="/register">Regístrate</a>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;