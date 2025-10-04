import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
// Íconos necesarios
import { IoSearchOutline, IoPersonOutline, IoHeartOutline } from "react-icons/io5";
import { FaInstagram, FaWhatsapp, FaSpotify } from 'react-icons/fa';
import { NAV_LINKS } from '../constants/data';
import { useCart } from '../context/CartContext';

// Rutas de imágenes del menú
import capsulasMenuImage from '/images/capsulas-menu.webp';
import sobreRefugioMenuImage from '/images/sobre-refugio-menu.webp';
import cartasMarMenuImage from '/images/cartas-al-mar-menu.webp';
import universoRefugioMenuImage from '/images/universo-refugio-menu.webp';
import contactoMenuImage from '/images/contacto-menu.webp';

// Componente de Ícono de Bolsa Personalizado
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

    // CLAVES DE IMÁGENES CORREGIDAS
    const navImages = {
        'Cápsulas': capsulasMenuImage, 
        'Sobre refugio': sobreRefugioMenuImage, 
        'Cartas al mar': cartasMarMenuImage, 
        'Experiencia Atelier': universoRefugioMenuImage, 
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
            setActiveMenuImage(navImages['default']);
        } else {
            setOpenSubMenu(sectionName);
            setActiveMenuImage(navImages[sectionName] || navImages['default']);
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

    // ESTRUCTURA DE NAVEGACIÓN con la capitalización solicitada
    const defaultNavSections = [
        {
            name: 'Cápsulas', 
            path: '/productos',
            hasSubSections: true,
            subSections: [
                { name: 'Ver todo', path: '/productos' },
                { name: 'yoga wear', path: '/productos/yogawear' }, 
                { name: 'life wear', path: '/productos/lifewear' }, 
                { name: 'self-care', path: '/proximamente/self-care' },
            ],
        },
        { name: 'Sobre refugio', path: '/sobre-refugio', hasSubSections: false }, // Nombre CORREGIDO
        
        { name: 'Cartas al mar', path: '/proximamente/cartas-al-mar', hasSubSections: false }, // Nombre CORREGIDO
        
        { name: 'Experiencia Atelier', path: '/proximamente/universo-refugio', hasSubSections: false }, 
        
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
                                            {/* APLICACIÓN DE ESTILO EN LÍNEA para asegurar que CSS no fuerce MAYÚSCULAS/Capitalización */}
                                            <div 
                                                className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                                style={{ textTransform: 'none' }}
                                            >
                                                {item.name}
                                                <span className={`submenu-toggle-arrow ${openSubMenu === item.name ? 'open' : ''}`}>∨</span>
                                            </div>
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
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                            onClick={closeMenu}
                                            onMouseEnter={() => setActiveMenuImage(navImages[item.name])}
                                            onMouseLeave={() => setActiveMenuImage(null)}
                                            style={{ textTransform: 'none' }} // APLICACIÓN DE ESTILO EN LÍNEA
                                        >
                                            {item.name}
                                        </Link>
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
                            <IoSearchOutline size={24} />
                            <span>Buscar</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="mobile-nav-link" aria-label="Lista de deseos">
                            <IoHeartOutline size={24} />
                            <span>Deseos</span>
                        </Link>
                    </li>
                    <li>
                        <button className={`mobile-nav-link ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menú">
                            <span className="mobile-menu-icon">
                                <span className="mobile-icon-bar"></span>
                                <span className="mobile-icon-bar"></span>
                            </span>
                            <span>Menú</span>
                        </button>
                    </li>
                    <li>
                        <Link to="/login" className="mobile-nav-link" aria-label="Mi cuenta">
                            <IoPersonOutline size={24} />
                            <span>Cuenta</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="mobile-nav-link mobile-cart-link" aria-label="Bolsa de compras">
                            <CustomBagIcon size={24} />
                            {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
                            <span>Bolsa</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;