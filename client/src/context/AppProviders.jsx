import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

// Componente que combina todos los providers
export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProviders;