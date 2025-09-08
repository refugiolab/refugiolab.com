// src/components/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import isonegro from '/isonegro.svg';
import { FaShoppingBag } from 'react-icons/fa';
import { NAV_LINKS } from '../constants/data'; // Importamos las constantes
import { CartContext } from '../context/CartContext'; // Importamos el contexto del carrito

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount } = useContext(CartContext); // Usamos el contexto para el contador
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
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

    // Definimos los elementos de navegación utilizando las constantes
    const navItemsLeft = [
        { name: 'LifeWear', path: NAV_LINKS.lifewear },
        { name: 'Cartas al Mar', path: NAV_LINKS.blog },
        { name: 'Bespoke', path: NAV_LINKS.bespoke },
    ];
    
    const navItemsRight = [
        { name: 'Universo Sensorial', path: NAV_LINKS.sensoryUniverse },
        { name: 'Programa de Bienestar', path: NAV_LINKS.wellnessProgram },
        { name: 'Contacto', path: NAV_LINKS.contact },
    ];

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
                    {navItemsLeft.map((item, index) => (
                        <li key={index}>
                            <Link 
                                to={item.path} 
                                className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`} 
                                onClick={closeMenu}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link to="/" className="header__logo-container" onClick={closeMenu}>
                    <div className="header__logo-circle">
                        <img src={isonegro} alt="Refugio Logo" className="header__logo" />
                    </div>
                </Link>
                <ul className="header__nav-list header__nav-list--right">
                    {navItemsRight.map((item, index) => (
                        <li key={index}>
                            <Link 
                                to={item.path} 
                                className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`} 
                                onClick={closeMenu}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li className="header__cart-icon">
                        <Link to="/cart" className="header__nav-link" onClick={closeMenu} aria-label="Bolsa de compras">
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
