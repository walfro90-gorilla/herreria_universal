import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Provider para envolver la aplicación
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar un producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Si ya existe, actualizar la cantidad
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregarlo al carrito
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remover un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  // Actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular el total del carrito
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Contar el número de items en el carrito
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Valor que se proveerá a los componentes
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export default CartContext;