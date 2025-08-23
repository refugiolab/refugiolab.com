import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../public/icons/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Manifiesto", href: "/home/manifiesto" },
    { name: "LifeWear", href: "/home/lifewear" },
    { name: "Cartas al Mar", href: "/home/cartas-al-mar" },
    { name: "Nudos de Sal", href: "/home/nudos-de-sal" },
    { name: "Diseñar tu Refugio", href: "/home/disenar-tu-refugio" },
    { name: "Programa de Bienestar", href: "/home/programa-de-bienestar" },
    { name: "Contacto", href: "/home/contacto" },
  ];

  const navLinksLeft = navLinks.slice(0, 3);
  const navLinksRight = navLinks.slice(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <div className="header-content">
        {/* Botón de hamburguesa para móvil */}
        <button
          className={`hamburger-menu ${isMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
          aria-expanded={isMenuOpen} // ¡Mejora de accesibilidad!
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navegación de escritorio (izquierda) */}
        <nav className="main-nav desktop-nav nav-left">
          <ul>
            {navLinksLeft.map((link) => (
              <li key={link.name}>
                <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo centrado */}
        <Link to="/home" className="header-logo-center">
          <img src={logo} alt="Refugio Logo" />
        </Link>

        {/* Navegación de escritorio (derecha) */}
        <nav className="main-nav desktop-nav nav-right">
          <ul>
            {navLinksRight.map((link) => (
              <li key={link.name}>
                <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menú móvil */}
        <nav className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} onClick={toggleMenu}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;