import React from 'react';
import SEO from '../components/SEO';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <SEO 
        title="Registrarse"
        description="Crea una cuenta en Herrería Universal para acceder a ofertas exclusivas, realizar pedidos y gestionar tus preferencias."
      />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;