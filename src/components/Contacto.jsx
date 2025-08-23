import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Contacto.css';
import logo from '/icons/logo.png';
import Modal from './Modal'; // Importamos el nuevo componente Modal

const Contacto = () => {
  const [showModal, setShowModal] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    // Lógica para enviar el formulario a un backend
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id="contacto" className="contacto">
      <div className="contacto__header">
        <h2 className="contacto__titulo">Contacto</h2>
        <p className="contacto__subtitulo">
          Estamos aquí para escucharte.
        </p>
      </div>

      <div className={`contacto__contenido ${inView ? 'is-in-view' : ''}`} ref={ref}>
        <div className="contacto__info">
          <img src={logo} alt="Refugio Logo" className="contacto__logo" />
          <p>
            <strong>Email:</strong> hola@universo-refugio.com
          </p>
          <p>
            <strong>Teléfono:</strong> +54 9 11 1234-5678
          </p>
          <div className="contacto__redes-sociales">
            <a href="https://instagram.com/refugio_________" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>

        <div className="contacto__form-container">
          <form className="contacto__form" onSubmit={handleSubmit}>
            <label htmlFor="nombre-contacto">Nombre completo</label>
            <input id="nombre-contacto" type="text" placeholder="Nombre completo" required />
            <label htmlFor="email-contacto">Correo electrónico</label>
            <input id="email-contacto" type="email" placeholder="Correo electrónico" required />
            <label htmlFor="mensaje-contacto">Tu mensaje...</label>
            <textarea id="mensaje-contacto" placeholder="Tu mensaje..." rows="5" required></textarea>
            <button type="submit" className="contacto__boton">Enviar Mensaje</button>
          </form>
        </div>
      </div>

      <Modal isVisible={showModal} onClose={closeModal} title="¡Mensaje Enviado!">
        <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
      </Modal>
    </section>
  );
};

export default Contacto;