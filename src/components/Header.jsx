import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../public/icons/logo.png';

const Header = () => {
  const navLinks = [
    { name: "Manifiesto", href: "/home/manifiesto" },
    { name: "LifeWear", href: "/home/lifewear" },
    { name: "Cartas al Mar", href: "/home/cartas-al-mar" },
    { name: "Nudos de Sal", href: "/home/nudos-de-sal" },
    { name: "Diseñar tu Refugio", href: "/home/disenar-tu-refugio" },
    { name: "Programa de Bienestar", href: "/home/programa-de-bienestar" },
    { name: "Contacto", href: "/home/contacto" },
  ];

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/home">
          <img src={logo} alt="Refugio Logo" />
        </Link>
        <nav className="main-nav">
          <ul>
            {navLinks.map((link) => (
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