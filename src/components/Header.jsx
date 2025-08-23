import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '/icons/logo.png';
import isoblanco from '/isonegro.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`main-header ${isOpen ? 'open' : ''}`}>
      <div className="header__logo-container">
        <Link to="/home">
          <img src={isoblanco} alt="Refugio Logo" className="header__logo" />
        </Link>
      </div>

      <button className="header__menu-toggle" onClick={toggleMenu} aria-expanded={isOpen} aria-controls="main-navigation" aria-label="Abrir menú de navegación">
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
      </button>

      <nav className="header__nav" id="main-navigation">
        <ul className="header__nav-list">
          <li>
            <Link to="/home/manifiesto" className={`header__nav-link ${location.pathname === '/home/manifiesto' ? 'active' : ''}`} onClick={toggleMenu}>
              Manifiesto
            </Link>
          </li>
          <li>
            <Link to="/home/lifewear" className={`header__nav-link ${location.pathname.startsWith('/home/lifewear') ? 'active' : ''}`} onClick={toggleMenu}>
              LifeWear
            </Link>
          </li>
          <li>
            <Link to="/home/cartas-al-mar" className={`header__nav-link ${location.pathname === '/home/cartas-al-mar' ? 'active' : ''}`} onClick={toggleMenu}>
              Cartas al Mar
            </Link>
          </li>
          <li>
            <Link to="/home/nudos-de-sal" className={`header__nav-link ${location.pathname === '/home/nudos-de-sal' ? 'active' : ''}`} onClick={toggleMenu}>
              Nudos de Sal
            </Link>
          </li>
          <li>
            <Link to="/home/disenar-tu-refugio" className={`header__nav-link ${location.pathname === '/home/disenar-tu-refugio' ? 'active' : ''}`} onClick={toggleMenu}>
              Diseñar tu Refugio
            </Link>
          </li>
          <li>
            <Link to="/home/programa-de-bienestar" className={`header__nav-link ${location.pathname === '/home/programa-de-bienestar' ? 'active' : ''}`} onClick={toggleMenu}>
              Programa de Bienestar
            </Link>
          </li>
          <li>
            <Link to="/home/contacto" className={`header__nav-link ${location.pathname === '/home/contacto' ? 'active' : ''}`} onClick={toggleMenu}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;