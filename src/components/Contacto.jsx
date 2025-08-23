import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Contacto.css'; // La ruta a Contacto.css es correcta ya que están en la misma carpeta
import logo from '../../public/icons/logo.png'; // Ruta corregida para el logo

const Contacto = () => {
  const [showModal, setShowModal] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    // Aquí podrías añadir la lógica para enviar el formulario a un backend
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-header">
        <h2 className="contacto-titulo">Contacto</h2>
        <p className="contacto-subtitulo">
          Estamos aquí para escucharte.
        </p>
      </div>

      <div className={`contacto-contenido ${inView ? 'is-in-view' : ''}`} ref={ref}>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Mensaje Enviado!</h3>
            <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
            <button onClick={closeModal} className="modal-close-button">Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contacto;
