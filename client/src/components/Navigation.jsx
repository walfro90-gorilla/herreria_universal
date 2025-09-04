import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // Items de navegación para usuarios no autenticados
  const guestNavItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Servicios', path: '/services' },
    { name: 'Iniciar Sesión', path: '/login' },
    { name: 'Registrarse', path: '/register' },
  ];

  // Items de navegación para usuarios autenticados
  const userNavItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Servicios', path: '/services' },
    { name: 'Mi Perfil', path: '/profile' },
  ];

  // Items adicionales para administradores
  const adminNavItems = [
    { name: 'Panel Admin', path: '/admin' },
  ];

  // Determinar qué items mostrar según el estado de autenticación
  let navItems = user ? userNavItems : guestNavItems;
  
  // Agregar items de admin si el usuario es administrador
  if (user && user.role === 'admin') {
    navItems = [...userNavItems, ...adminNavItems];
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo o nombre de la empresa */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>Herrería Universal</Link>
        </div>

        {/* Botón de menú para móviles */}
        <button 
          className="nav-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        {/* Menú de navegación */}
        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Botón de logout para usuarios autenticados */}
            {user && (
              <li className="nav-item">
                <button 
                  onClick={handleLogout}
                  className="nav-link nav-link-button"
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
          
          {/* Iconos de redes sociales */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span role="img" aria-label="Facebook">f</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span role="img" aria-label="Instagram">i</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span role="img" aria-label="Twitter">t</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;