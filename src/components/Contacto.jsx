import React from 'react';
import './Contacto.css';
import logo from '../../public/icons/logo.png'; // Reutilizamos el logo de la marca

const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-header">
        <h2 className="contacto-titulo">Contacto</h2>
        <p className="contacto-subtitulo">
          Estamos aquí para escucharte.
        </p>
      </div>

      <div className="contacto-contenido">
        <div className="contacto-info">
          <img src={logo} alt="Refugio Logo" className="contacto-logo" />
          <p>
            <strong>Email:</strong> hola@universo-refugio.com
          </p>
          <p>
            <strong>Teléfono:</strong> +54 9 11 1234-5678
          </p>
          <div className="redes-sociales">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>

        <div className="contacto-form-container">
          <form className="contacto-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre completo" required />
            <input type="email" placeholder="Correo electrónico" required />
            <textarea placeholder="Tu mensaje..." rows="5" required></textarea>
            <button type="submit" className="contacto-boton">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;