import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Servicios', path: '/services' },
    { name: 'Contacto', path: '/contact' },
  ];

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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;