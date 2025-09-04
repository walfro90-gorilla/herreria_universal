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
    { name: 'Contacto', path: '/contact' },
    { name: 'Iniciar Sesión', path: '/login' },
    { name: 'Registrarse', path: '/register' },
  ];

  // Items de navegación para usuarios autenticados
  const userNavItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Servicios', path: '/services' },
    { name: 'Contacto', path: '/contact' },
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
    <nav 
      className="navigation" 
      role="navigation" 
      aria-label="Navegación principal"
    >
      <div className="nav-container">
        {/* Logo o nombre de la empresa */}
        <div className="nav-logo">
          <Link 
            to="/" 
            onClick={closeMenu}
            aria-label="Ir a la página de inicio"
          >
            Herrería Universal
          </Link>
        </div>

        {/* Botón de menú para móviles */}
        <button 
          className="nav-toggle" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        {/* Menú de navegación */}
        <div 
          id="nav-menu"
          className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="nav-list" role="menubar">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item" role="none">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                  onClick={closeMenu}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Botón de logout para usuarios autenticados */}
            {user && (
              <li className="nav-item" role="none">
                <button 
                  onClick={handleLogout}
                  className="nav-link nav-link-button"
                  role="menuitem"
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
          
          {/* Iconos de redes sociales */}
          <div className="social-icons" aria-label="Redes sociales">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visitar nuestro Facebook"
            >
              <span role="img" aria-label="Facebook">f</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visitar nuestro Instagram"
            >
              <span role="img" aria-label="Instagram">i</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visitar nuestro Twitter"
            >
              <span role="img" aria-label="Twitter">t</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;