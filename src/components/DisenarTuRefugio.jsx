import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './DisenarTuRefugio.css';
import fondoRefugio from '/images/mar.png';
import Modal from './Modal'; // Importamos el nuevo componente Modal

const DisenarTuRefugio = () => {
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
    <section id="disenar-tu-refugio" className="disenar-refugio" style={{ backgroundImage: `url(${fondoRefugio})` }}>
      <div className="disenar-refugio__overlay">
        <div className={`disenar-refugio__contenido ${inView ? 'is-in-view' : ''}`} ref={ref}>
          <h2 className="disenar-refugio__titulo">Diseñar tu Refugio</h2>
          <p className="disenar-refugio__subtitulo">
            Creemos que la moda es personal. Diseñemos juntos una pieza que cuente tu historia.
          </p>
          <form className="disenar-refugio__form" onSubmit={handleSubmit}>
            <label htmlFor="nombre-diseno">Nombre completo</label>
            <input id="nombre-diseno" type="text" placeholder="Nombre completo" required />
            <label htmlFor="email-diseno">Correo electrónico</label>
            <input id="email-diseno" type="email" placeholder="Correo electrónico" required />
            <label htmlFor="mensaje-diseno">Describe la pieza que tienes en mente...</label>
            <textarea id="mensaje-diseno" placeholder="Describe la pieza que tienes en mente..." rows="5"></textarea>
            <button type="submit" className="disenar-refugio__boton">Solicitar Cita</button>
          </form>
        </div>
      </div>

      <Modal isVisible={showModal} onClose={closeModal} title="¡Solicitud Enviada!">
        <p>Gracias por tu interés en diseñar tu refugio. Nos pondremos en contacto contigo pronto.</p>
      </Modal>
    </section>
  );
};

export default DisenarTuRefugio;