import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
// Íconos necesarios
import { IoSearchOutline, IoPersonOutline, IoHeartOutline } from "react-icons/io5";
import { FaInstagram, FaWhatsapp, FaSpotify } from 'react-icons/fa';
import { NAV_LINKS } from '../constants/data'; // Asegúrate de que esta constante exista
import { useCart } from '../context/CartContext'; // Asegúrate de que este contexto exista

// Rutas de imágenes del menú (Asegúrate de que estas rutas sean correctas)
import newInMenuImage from '/images/new-in-menu.webp';
import capsulasMenuImage from '/images/capsulas-menu.webp';
import sobreRefugioMenuImage from '/images/sobre-refugio-menu.webp';
import cartasMarMenuImage from '/images/cartas-al-mar-menu.webp';
import universoRefugioMenuImage from '/images/universo-refugio-menu.webp';
import programaBienestarMenuImage from '/images/programa-bienestar-menu.webp';
import contactoMenuImage from '/images/contacto-menu.webp';

// Componente de Ícono de Bolsa Personalizado (Utiliza stroke para contorno)
const CustomBagIcon = ({ size = 22, color = 'currentColor' }) => (
    <svg 
        stroke={color === 'currentColor' ? 'currentColor' : color} 
        fill="none" 
        strokeWidth="32" 
        viewBox="0 0 512 512" 
        height={size} 
        width={size} 
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}
    >
        <path d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"></path>
    </svg>
);


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenuImage, setActiveMenuImage] = useState(null); 
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const { cart } = useCart(); 
    const location = useLocation();

    const itemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

    const navImages = {
        'New In': newInMenuImage,
        'Cápsulas': capsulasMenuImage,
        'Sobre Refugio': sobreRefugioMenuImage,
        'Cartas al Mar': cartasMarMenuImage,
        'Universo Refugio': universoRefugioMenuImage,
        'Programa de Bienestar': programaBienestarMenuImage,
        'Contacto': contactoMenuImage,
        'default': '/images/menu-default.webp'
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setActiveMenuImage(null);
            setOpenSubMenu(null);
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenSubMenu(null);
        document.body.classList.remove('menu-open');
    };

    const toggleSubMenu = (sectionName) => {
        if (openSubMenu === sectionName) {
            setOpenSubMenu(null);
        } else {
            setOpenSubMenu(sectionName);
        }
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
        }
    }, []);

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    // Estructura de navegación con corrección de error de .map
    const defaultNavSections = [
        { name: 'New In', path: '/new-in', hasSubSections: false },
        {
            name: 'Cápsulas',
            path: '/productos',
            hasSubSections: true,
            subSections: [
                { name: 'Ver todo', path: '/productos' },
                { name: 'LifeWear', path: '/productos/lifewear' },
                { name: 'YogaWear', path: '/productos/yogawear' },
                { name: 'Diseñar tu refugio', path: '/productos/disenar-tu-refugio' },
                { name: 'Archivo', path: '/productos/archivo' },
            ],
        },
        { name: 'Sobre Refugio', path: '/sobre-refugio', hasSubSections: false },
        { name: 'Cartas al Mar', path: '/cartas-al-mar', hasSubSections: false },
        { name: 'Universo Refugio', path: '/universo-sensorial', hasSubSections: false },
        { name: 'Programa de Bienestar', path: '/programa-de-bienestar', hasSubSections: false },
        { name: 'Contacto', path: '/contacto', hasSubSections: false },
    ];
    
    // Usa NAV_LINKS si es un array válido, si no, usa el array por defecto.
    const navSections = Array.isArray(NAV_LINKS) ? NAV_LINKS : defaultNavSections;

    return (
        <>
            {/* Header de Escritorio */}
            <header className={`main-header ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
                
                {/* Contenedor Izquierdo - SOLO BOTÓN DE MENÚ */}
                <div className="header-left">
                    {/* BOTÓN DE MENÚ */}
                    <button
                        className="header__menu-toggle"
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-controls="main-navigation"
                        aria-label="Abrir o cerrar menú de navegación"
                    >
                        <span className="header__icon-bar"></span>
                        <span className="header__icon-bar"></span>
                        <span className="header__icon-bar"></span>
                    </button>
                </div>

                {/* Contenedor Central - Logo */}
                <Link to="/" className="header__logo-container" onClick={closeMenu}>
                    <picture>
                        <source srcSet={isScrolled ? '/icons/isonegro.webp' : '/icons/isoblanco.webp'} type="image/webp" />
                        <img
                            src={isScrolled ? '/icons/isonegro.svg' : '/icons/isoblanco.svg'}
                            alt="Refugio Logo"
                            className="header__logo logo-blanco"
                        />
                    </picture>
                </Link>

                {/* Contenedor Derecho - CARRITO, LOGIN y BUSCADOR */}
                <div className="header-right">
                    
                    {/* CARRITO (BOLSA) */}
                    <Link 
                        to="/cart" 
                        className="header__icon-button header__cart-icon" 
                        aria-label="Bolsa de compras" 
                        onClick={closeMenu}
                    >
                        <CustomBagIcon size={22} color="currentColor" />
                        {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
                    </Link>
                    
                    {/* ÍCONO DE MI CUENTA (LOGIN) */}
                    <Link to="/login" className="header__icon-button header__login-icon" aria-label="Mi cuenta" onClick={closeMenu}>
                        <IoPersonOutline size={22} /> 
                    </Link>
                    
                    {/* BUSCADOR */}
                    <button className="header__icon-button header__search-icon" aria-label="Buscador">
                        <IoSearchOutline size={22} /> 
                    </button>

                </div>

                {/* Menú de navegación (oculto por defecto) */}
                <nav className={`header__nav ${isOpen ? 'open' : ''}`} id="main-navigation">
                    <div className="header__nav-content">
                        <ul className="header__nav-list">
                            {navSections.map((item, index) => (
                                <li key={index}>
                                    {item.hasSubSections ? (
                                        <div
                                            className="header__nav-link-container"
                                            onMouseEnter={() => setActiveMenuImage(navImages[item.name])}
                                            onMouseLeave={() => setActiveMenuImage(null)}
                                            onClick={() => toggleSubMenu(item.name)}
                                        >
                                            <div className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`} >
                                                {item.name}
                                                <span className={`submenu-toggle-arrow ${openSubMenu === item.name ? 'open' : ''}`}>∨</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                            onClick={closeMenu}
                                            onMouseEnter={() => setActiveMenuImage(navImages[item.name])}
                                            onMouseLeave={() => setActiveMenuImage(null)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                    {item.hasSubSections && (
                                        <ul className={`submenu-list ${openSubMenu === item.name ? 'open' : ''}`}>
                                            {item.subSections.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        to={subItem.path}
                                                        className={`header__nav-sub-link ${location.pathname === subItem.path ? 'active' : ''}`}
                                                        onClick={closeMenu}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="social-media-icons">
                            <a href="https://www.instagram.com/refugio_________?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://wa.me/message/6ZMNWYQBIN5HA1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <FaWhatsapp size={24} />
                            </a>
                            <a href="https://open.spotify.com/artist/tu-artista-id" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                                <FaSpotify size={24} />
                            </a>
                        </div>
                    </div>
                    <div className="header__nav-image-container">
                        <img src={activeMenuImage || navImages['default']} alt="Imagen de sección" className="header__nav-image" />
                    </div>
                </nav>
            </header>

            {/* Menú de Navegación Móvil (Footer Fijo) */}
            <nav className="mobile-nav-container">
                <ul className="mobile-nav-list">
                    <li>
                        <Link to="/search" className="mobile-nav-link" aria-label="Buscador">
                            <IoSearchOutline size={22} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-label="Inicio">
                            <IoHeartOutline size={22} color="#444653" />
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={toggleMenu}
                            className={`mobile-nav-link menu-button ${isOpen ? 'open' : ''}`}
                            aria-label="Abrir o cerrar menú de navegación">
                            <span>Menú</span>
                        </button>
                    </li>
                    <li>
                        <Link to="/login" className={`mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`} aria-label="Mi cuenta">
                            <IoPersonOutline size={22} />
                        </Link>
                    </li>
                    <li>
                        {/* Carrito en navegación móvil */}
                        <Link to="/cart" className={`mobile-nav-link ${location.pathname === '/cart' ? 'active' : ''}`} aria-label="Bolsa de compras">
                            <CustomBagIcon size={22} color="currentColor" />
                            {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;