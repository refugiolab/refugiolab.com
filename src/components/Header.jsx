/* src/components/Header.jsx */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { IoBagOutline, IoSearchOutline, IoPersonOutline, IoHomeOutline, IoMenuOutline } from "react-icons/io5";
import { NAV_LINKS } from '../constants/data';
import { CartContext } from '../context/CartContext';
import { FaInstagram, FaWhatsapp, FaSpotify } from 'react-icons/fa';
import { FaHeart, FaUserCircle } from 'react-icons/fa'; // Iconos de ejemplo para reemplazar la casita

// Importa tus imágenes para el menú
import newInMenuImage from '/images/new-in-menu.webp';
import capsulasMenuImage from '/images/capsulas-menu.webp';
import sobreRefugioMenuImage from '/images/sobre-refugio-menu.webp';
import cartasMarMenuImage from '/images/cartas-al-mar-menu.webp';
import universoRefugioMenuImage from '/images/universo-refugio-menu.webp';
import programaBienestarMenuImage from '/images/programa-bienestar-menu.webp';
import contactoMenuImage from '/images/contacto-menu.webp';
import menuDefaultImage from '/images/menu-default.webp';
import logoNegro from '/icons/isonegro.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenuImage, setActiveMenuImage] = useState(menuDefaultImage);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const { itemCount } = useContext(CartContext);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setActiveMenuImage(menuDefaultImage);
            setOpenSubMenu(null);
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenSubMenu(null);
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
        };
    }, []);

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    const navSections = [
        { name: 'New In', path: '/new-in', image: newInMenuImage, hasSubSections: false },
        {
            name: 'Cápsulas',
            path: '/productos',
            image: capsulasMenuImage,
            hasSubSections: true,
            subSections: [
                { name: 'Ver todo', path: '/productos' },
                { name: 'LifeWear', path: '/productos/lifewear' },
                { name: 'YogaWear', path: '/productos/yogawear' },
                { name: 'Diseñar tu refugio', path: '/productos/disenar-tu-refugio' },
                { name: 'Archivo', path: '/productos/archivo' },
            ],
        },
        { name: 'Sobre Refugio', path: '/sobre-refugio', image: sobreRefugioMenuImage, hasSubSections: false },
        { name: 'Cartas al Mar', path: '/cartas-al-mar', image: cartasMarMenuImage, hasSubSections: false },
        { name: 'Universo Refugio', path: '/universo-sensorial', image: universoRefugioMenuImage, hasSubSections: false },
        { name: 'Programa de Bienestar', path: '/programa-de-bienestar', image: programaBienestarMenuImage, hasSubSections: false },
        { name: 'Contacto', path: '/contacto', image: contactoMenuImage, hasSubSections: false },
    ];

    return (
        <>
            {/* Header de Escritorio */}
            <header className={`main-header ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
                {/* Contenedor Izquierdo - Botón de menú */}
                <div className="header-left">
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

                {/* Contenedor Central - Logo con etiqueta <picture> */}
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

                {/* Contenedor Derecho - Íconos de utilidad */}
                <div className="header-right">
                    <button className="header__icon-button" aria-label="Buscador">
                        <IoSearchOutline size={18} />
                    </button>
                    <button className="header__icon-button" aria-label="Mi cuenta">
                        <IoPersonOutline size={18} />
                    </button>
                    <Link to="/cart" className="header__icon-button header__cart-icon" aria-label="Bolsa de compras" onClick={closeMenu}>
                        <IoBagOutline size={18} />
                        {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
                    </Link>
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
                                            onMouseEnter={() => item.image && setActiveMenuImage(item.image)}
                                            onMouseLeave={() => item.image && setActiveMenuImage(menuDefaultImage)}
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
                                            onMouseEnter={() => item.image && setActiveMenuImage(item.image)}
                                            onMouseLeave={() => item.image && setActiveMenuImage(menuDefaultImage)}
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
                        <img src={activeMenuImage} alt="Imagen de sección" className="header__nav-image" />
                    </div>
                </nav>
            </header>

            {/* Menú de Navegación Móvil (Footer Fijo) */}
            <nav className="mobile-nav-container">
                <ul className="mobile-nav-list">
                    <li>
                        <Link to="/search" className="mobile-nav-link">
                            <IoSearchOutline size={22} />
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={toggleMenu}
                            className={`menu-button`}
                            aria-label="Abrir menú de navegación">
                            <span>Menú</span>
                        </button>
                    </li>
                    <li>
                        <Link to="/cuenta" className={`mobile-nav-link ${location.pathname === '/cuenta' ? 'active' : ''}`}>
                            <IoPersonOutline size={22} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className={`mobile-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}>
                            <IoBagOutline size={22} />
                            {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;