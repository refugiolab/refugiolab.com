import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logogris from '/icons/logorefugiogris.svg'; // Nuevo logo

const Footer = () => {
  const navigateLinks = [
    { name: "About Us", href: "/home/about" },
    { name: "FAQs", href: "/home/faq" },
  ];

  const connectLinks = [
    { name: "contacto@refugiolab.com", href: "mailto:contacto@refugiolab.com" },
    { name: "Instagram", href: "https://www.instagram.com/refugio_________" },
    { name: "Whatsapp", href: "https://wa.me/message/6ZMNWYQBIN5HA1" },
  ];

  return (
    <footer className="main-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer__logo">
          <Link to="/home" aria-label="Ir a la página de inicio">
            <img src={logogris} alt="Refugio Logo" />
          </Link>
          <p>La vida es un ritual</p>
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
        <p>&copy; 2025 Refugio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;