import React from 'react';
import './DisenarTuRefugio.css';
// Reutilizamos la imagen del mar para evitar el error de archivo no encontrado.
import fondoRefugio from '../../public/images/mar.png'; 

const DisenarTuRefugio = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto para diseñar tu refugio.');
  };

  return (
    <section id="disenar-tu-refugio" className="disenar-refugio-section" style={{ backgroundImage: `url(${fondoRefugio})` }}>
      <div className="refugio-overlay">
        <div className="refugio-contenido">
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
    </section>
  );
};

export default DisenarTuRefugio;