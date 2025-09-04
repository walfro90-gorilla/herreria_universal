import React from 'react';
import SEO from '../components/SEO';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <SEO 
        title="Iniciar Sesión"
        description="Accede a tu cuenta de Herrería Universal para gestionar tus pedidos, ver tu historial y acceder a funciones exclusivas."
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;