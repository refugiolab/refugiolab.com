import React from 'react';
import { Link } from 'react-router-dom';
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
            <li><Link to="/home/manifiesto">Manifiesto</Link></li>
            <li><Link to="/home/lifewear">LifeWear</Link></li>
            <li><Link to="/home/cartas-al-mar">Cartas al Mar</Link></li>
            <li><Link to="/home/nudos-de-sal">Nudos de Sal</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Conectar</h4>
          <ul>
            <li><Link to="/home/contacto">Contacto</Link></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
            <li><Link to="/home/disenar-tu-refugio">Diseñar</Link></li>
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