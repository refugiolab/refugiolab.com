import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../public/icons/logo.png';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const exploreLinks = [
    { name: "Manifiesto", href: "/home/manifiesto" },
    { name: "LifeWear", href: "/home/lifewear" },
    { name: "Cartas al Mar", href: "/home/cartas-al-mar" },
    { name: "Nudos de Sal", href: "/home/nudos-de-sal" },
  ];

  const connectLinks = [
    { name: "Mail", href: "mailto:contacto@refugiolab.com" },
    { name: "Instagram", href: "https://instagram.com/refugio______" },
    { name: "Whatsapp", href: "https://wa.me/" }, // Agrega tu número de teléfono con el formato internacional aquí
    { name: "Diseñar", href: "/home/disenar-tu-refugio" },
  ];

  return (
    <footer className="main-footer" role="contentinfo">
      <div className="footer-container">
        {/* Sección de Logo */}
        <div className="footer-logo">
          <Link to="/home" aria-label="Ir a la página de inicio">
            <img src={logo} alt="Refugio Logo" />
          </Link>
          <p>La vida es un ritual.</p>
        </div>

        {/* Sección de Enlaces Explorar */}
        <nav className="footer-links" aria-label="Navegación de exploración">
          <h4>Explorar</h4>
          <ul>
            {exploreLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sección de Enlaces Conectar */}
        <nav className="footer-links" aria-label="Navegación para conectar">
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

        {/* Sección de Newsletter */}
        <div className="footer-newsletter-section">
          <NewsletterForm />
        </div>
      </div>
      
      {/* Sección de Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Refugio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;