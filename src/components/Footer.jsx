import React from 'react';
import './Footer.css';
import logo from '../../public/icons/logo.png';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Refugio Logo" />
          <p>La vida es un ritual.</p>
        </div>
        <div className="footer-links">
          <h4>Explorar</h4>
          <ul>
            <li><a href="#manifiesto">Manifiesto</a></li>
            <li><a href="#lifewear">LifeWear</a></li>
            <li><a href="#cartas-al-mar">Cartas al Mar</a></li>
            <li><a href="#nudos-de-sal">Nudos de Sal</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Conectar</h4>
          <ul>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
            <li><a href="#disenar-tu-refugio">Diseñar</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Refugio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;