// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS, IMAGE_PATHS, TEXT_CONTENT } from '../constants/data';
import './Footer.css';

const Footer = () => {
    // Las rutas de navegación y los enlaces de redes sociales ahora se obtienen de forma centralizada
    const navigateLinks = [
        { name: "About Us", href: NAV_LINKS.aboutUs },
        { name: "FAQs", href: NAV_LINKS.faqs },
    ];

    const connectLinks = [
        { name: SOCIAL_LINKS.email, href: `mailto:${SOCIAL_LINKS.email}` },
        { name: "Instagram", href: SOCIAL_LINKS.instagram },
        { name: "Whatsapp", href: SOCIAL_LINKS.whatsapp },
    ];

    return (
        <footer className="main-footer" role="contentinfo">
            <div className="footer-container">
                <div className="footer__logo">
                    <Link to={NAV_LINKS.home} aria-label="Ir a la página de inicio">
                        <img src={IMAGE_PATHS.logoGris} alt="Refugio Logo" />
                    </Link>
                    <p>{TEXT_CONTENT.footer.motto}</p>
                </div>

                <nav className="footer__links" aria-label="Navegación de exploración">
                    <h4>Navegar</h4>
                    <ul>
                        {navigateLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav className="footer__links" aria-label="Navegación para conectar">
                    <h4>Conectar</h4>
                    <ul>
                        {connectLinks.map((link) => (
                            <li key={link.name}>
                                {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link to={link.href}>{link.name}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            
            <div className="footer__bottom">
                <p>{TEXT_CONTENT.footer.copy}</p>
            </div>
        </footer>
    );
};

export default Footer;