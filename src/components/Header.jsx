import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import isonegro from '/isonegro.svg';
import { FaShoppingBag } from 'react-icons/fa'; // Importamos FaShoppingBag

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemCount, setItemCount] = useState(0); // ¡MODIFICADO AQUÍ! Contador de artículos inicia en 0
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // El Header se considera "scrolled" solo cuando el scroll es igual o mayor a la altura total del viewport
      if (window.scrollY >= window.innerHeight) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`main-header ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <button className="header__menu-toggle" onClick={toggleMenu} aria-expanded={isOpen} aria-controls="main-navigation" aria-label="Abrir menú de navegación">
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
      </button>

      <nav className="header__nav" id="main-navigation">
        <ul className="header__nav-list header__nav-list--left">
          <li><Link to="/lifewear" className={`header__nav-link ${location.pathname === '/lifewear' ? 'active' : ''}`} onClick={toggleMenu}>LifeWear</Link></li>
          <li><Link to="/cartas-al-mar" className={`header__nav-link ${location.pathname === '/cartas-al-mar' ? 'active' : ''}`} onClick={toggleMenu}>Cartas al Mar</Link></li>
          <li><Link to="/bespoke" className={`header__nav-link ${location.pathname === '/bespoke' ? 'active' : ''}`} onClick={toggleMenu}>Bespoke</Link></li>
        </ul>
        <div className="header__logo-container">
          <Link to="/">
            <div className="header__logo-circle">
              <img src={isonegro} alt="Refugio Logo" className="header__logo" />
            </div>
          </Link>
        </div>
        <ul className="header__nav-list header__nav-list--right">
          <li><Link to="/universo-sensorial" className={`header__nav-link ${location.pathname === '/universo-sensorial' ? 'active' : ''}`} onClick={toggleMenu}>Universo Sensorial</Link></li>
          <li><Link to="/programa-de-bienestar" className={`header__nav-link ${location.pathname === '/programa-de-bienestar' ? 'active' : ''}`} onClick={toggleMenu}>Programa de Bienestar</Link></li>
          <li><Link to="/contacto" className={`header__nav-link ${location.pathname === '/contacto' ? 'active' : ''}`} onClick={toggleMenu}>Contacto</Link></li>
          <li className="header__cart-icon">
            <Link to="/cart" className="header__nav-link" onClick={toggleMenu} aria-label="Bolsa de compras">
              <FaShoppingBag size={18} /> {/* Icono de bolsa */}
              {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>} {/* Contador de artículos */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
