import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import isologo from '/isoblanco.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`main-header ${isOpen ? 'open' : ''}`}>
      <button className="header__menu-toggle" onClick={toggleMenu} aria-expanded={isOpen} aria-controls="main-navigation" aria-label="Abrir menú de navegación">
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
      </button>

      <nav className="header__nav" id="main-navigation">
        <ul className="header__nav-list">
          <li><Link to="/home/lifewear" className={`header__nav-link ${location.pathname.startsWith('/home/lifewear') ? 'active' : ''}`} onClick={toggleMenu}>lifewear</Link></li>
          <li><Link to="/home/about" className={`header__nav-link ${location.pathname === '/home/about' ? 'active' : ''}`} onClick={toggleMenu}>about</Link></li>
          <li><Link to="/home/cartas-al-mar" className={`header__nav-link ${location.pathname === '/home/cartas-al-mar' ? 'active' : ''}`} onClick={toggleMenu}>cartas al mar</Link></li>
        </ul>
        <div className="header__logo-container">
          <Link to="/home">
            <img src={isologo} alt="Refugio Logo" className="header__logo" />
          </Link>
        </div>
        <ul className="header__nav-list">
          <li><Link to="/home/disenar-tu-refugio" className={`header__nav-link ${location.pathname === '/home/disenar-tu-refugio' ? 'active' : ''}`} onClick={toggleMenu}>diseñar tu refugio</Link></li>
          <li><Link to="/home/nudos-de-sal" className={`header__nav-link ${location.pathname === '/home/nudos-de-sal' ? 'active' : ''}`} onClick={toggleMenu}>nudos de sal</Link></li>
          <li><Link to="/home/programa-de-bienestar" className={`header__nav-link ${location.pathname === '/home/programa-de-bienestar' ? 'active' : ''}`} onClick={toggleMenu}>programa de bienestar</Link></li>
          <li><Link to="/home/contacto" className={`header__nav-link ${location.pathname === '/home/contacto' ? 'active' : ''}`} onClick={toggleMenu}>contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;