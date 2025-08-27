import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import isonegro from '/isoblanco.svg'; // Asegúrate de que esta ruta sea correcta para tu proyecto
import { FaShoppingBag } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemCount, setItemCount] = useState(0); 
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // El Header se considera "scrolled" cuando el scroll es mayor a 50px
      if (window.scrollY > 50) { 
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
      <button 
        className="header__menu-toggle" 
        onClick={toggleMenu} 
        aria-expanded={isOpen} 
        aria-controls="main-navigation" 
        aria-label="Abrir menú de navegación"
      >
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
        <span className="header__icon-bar"></span>
      </button>

      <nav className="header__nav" id="main-navigation">
        <ul className="header__nav-list header__nav-list--left">
          {/* Todas las rutas anidadas bajo /home deben tener el prefijo /home */}
          <li><Link to="/home/lifewear" className={`header__nav-link ${location.pathname === '/home/lifewear' ? 'active' : ''}`} onClick={closeMenu}>LifeWear</Link></li>
          <li><Link to="/home/cartas-al-mar" className={`header__nav-link ${location.pathname === '/home/cartas-al-mar' ? 'active' : ''}`} onClick={closeMenu}>Cartas al Mar</Link></li>
          <li><Link to="/home/disenar-tu-refugio" className={`header__nav-link ${location.pathname === '/home/disenar-tu-refugio' ? 'active' : ''}`} onClick={closeMenu}>Bespoke</Link></li>
        </ul>
        {/* El logo va a la raíz, que redirige a /home */}
        <Link to="/" className="header__logo-container" onClick={closeMenu}>
          <div className="header__logo-circle">
            <img src={isonegro} alt="Refugio Logo" className="header__logo" />
          </div>
        </Link>
        <ul className="header__nav-list header__nav-list--right">
          {/* Todas las rutas anidadas bajo /home deben tener el prefijo /home */}
          <li><Link to="/home/nudos-de-sal" className={`header__nav-link ${location.pathname === '/home/nudos-de-sal' ? 'active' : ''}`} onClick={closeMenu}>Universo Sensorial</Link></li>
          <li><Link to="/home/programa-de-bienestar" className={`header__nav-link ${location.pathname === '/home/programa-de-bienestar' ? 'active' : ''}`} onClick={closeMenu}>Programa de Bienestar</Link></li>
          <li><Link to="/home/contacto" className={`header__nav-link ${location.pathname === '/home/contacto' ? 'active' : ''}`} onClick={closeMenu}>Contacto</Link></li>
          <li className="header__cart-icon">
            {/* Ruta para el carrito */}
            <Link to="/home/cart" className="header__nav-link" onClick={closeMenu} aria-label="Bolsa de compras">
              <FaShoppingBag size={18} />
              {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
