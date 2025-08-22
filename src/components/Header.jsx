import React from 'react';
import './Header.css';
import logo from '../../public/icons/logo.png';

const Header = () => {
  const navLinks = [
    { name: "Manifiesto", href: "#manifiesto" },
    { name: "LifeWear", href: "#lifewear" },
    { name: "Cartas al Mar", href: "#cartas-al-mar" },
    { name: "Nudos de Sal", href: "#nudos-de-sal" },
    { name: "Diseñar tu Refugio", href: "#disenar-tu-refugio" },
    { name: "Programa de Bienestar", href: "#programa-bienestar" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-logo">
          <a href="#top"> {/* Cambiado a #top para ir al inicio de la página */}
            <img src={logo} alt="Refugio Logo" />
          </a>
        </div>
        <nav className="main-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;