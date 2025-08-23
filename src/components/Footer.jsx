import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '/icons/logo.png';

const Footer = () => {
  const exploreLinks = [
    { name: "about", href: "/home/about" },
    { name: "lifewear", href: "/home/lifewear" },
    { name: "cartas al mar", href: "/home/cartas-al-mar" },
    { name: "nudos de sal", href: "/home/nudos-de-sal" },
  ];

  const connectLinks = [
    { name: "contacto@refugiolab.com", href: "mailto:contacto@refugiolab.com" },
    { name: "Instagram", href: "https://instagram.com/refugio_________" },
    { name: "Whatsapp", href: "https://wa.me/6ZMNWYQBIN5HA1" },
    { name: "FAQ", href: "/home/faq" },
  ];

  return (
    <footer className="main-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer__logo">
          <Link to="/home" aria-label="Ir a la página de inicio">
            <img src={logo} alt="Refugio Logo" />
          </Link>
          <p>La vida es un ritual.</p>
        </div>

        <nav className="footer__links" aria-label="Navegación de exploración">
          <h4>Explorar</h4>
          <ul>
            {exploreLinks.map((link) => (
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