import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '/icons/logo.png'; // Ruta corregida para el logo

const Header = () => {
  // Dividimos los enlaces en dos grupos
  const navLinksLeft = [
    { name: "Manifiesto", href: "/home/manifiesto" },
    { name: "LifeWear", href: "/home/lifewear" },
    { name: "Cartas al Mar", href: "/home/cartas-al-mar" },
  ];

  const navLinksRight = [
    { name: "Nudos de Sal", href: "/home/nudos-de-sal" },
    { name: "Diseñar tu Refugio", href: "/home/disenar-tu-refugio" },
    { name: "Programa de Bienestar", href: "/home/programa-de-bienestar" },
    { name: "Contacto", href: "/home/contacto" },
  ];

  return (
    <header className="main-header">
      <div className="header-content">
        {/* Navegación izquierda */}
        <nav className="main-nav nav-left">
          <ul>
            {navLinksLeft.map((link) => (
              <li key={link.name}>
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo centrado */}
        <Link to="/home" className="header-logo-center">
          <img src={logo} alt="Refugio Logo" />
        </Link>

        {/* Navegación derecha */}
        <nav className="main-nav nav-right">
          <ul>
            {navLinksRight.map((link) => (
              <li key={link.name}>
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
