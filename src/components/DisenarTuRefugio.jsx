import React, { useState } from 'react'; // Importamos useState
import { useInView } from 'react-intersection-observer'; // Importamos useInView
import './DisenarTuRefugio.css';
import fondoRefugio from '/images/mar.png'; // Ruta corregida para la imagen

const DisenarTuRefugio = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Hook para la animación de entrada
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // El 20% del componente debe estar visible para activar
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Mostramos el modal en lugar de alert()
    // Aquí podrías añadir la lógica para enviar el formulario a un backend
  };

  const closeModal = () => {
    setShowModal(false); // Cerramos el modal
  };

  return (
    <section id="disenar-tu-refugio" className="disenar-refugio-section" style={{ backgroundImage: `url(${fondoRefugio})` }}>
      <div className="refugio-overlay">
        <div className={`refugio-contenido ${inView ? 'is-in-view' : ''}`} ref={ref}> {/* Aplicamos la clase de animación aquí */}
          <h2 className="refugio-titulo">Diseñar tu Refugio</h2>
          <p className="refugio-subtitulo">
            Creemos que la moda es personal. Diseñemos juntos una pieza que cuente tu historia.
          </p>
          <form className="refugio-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre completo" required />
            <input type="email" placeholder="Correo electrónico" required />
            <textarea placeholder="Describe la pieza que tienes en mente..." rows="5"></textarea>
            <button type="submit" className="refugio-boton">Solicitar Cita</button>
          </form>
        </div>
      </div>

      {/* Modal de confirmación personalizado */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Solicitud Enviada!</h3>
            <p>Gracias por tu interés en diseñar tu refugio. Nos pondremos en contacto contigo pronto.</p>
            <button onClick={closeModal} className="modal-close-button">Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DisenarTuRefugio;
