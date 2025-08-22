import React from 'react';
import './ProgramaDeBienestar.css';

const ProgramaDeBienestar = () => {
  const pilares = [
    {
      titulo: 'Mindfulness',
      descripcion: 'Prácticas de meditación y conciencia plena para encontrar la calma en el caos cotidiano.',
    },
    {
      titulo: 'Movimiento Consciente',
      descripcion: 'Clases de yoga y movimiento fluido que conectan tu cuerpo con el universo.',
    },
    {
      titulo: 'Naturaleza',
      descripcion: 'Retiros y talleres en entornos naturales para reconectar con tu esencia y el ritmo de la Tierra.',
    },
  ];

  return (
    <section id="programa-bienestar" className="bienestar-section">
      <div className="bienestar-header">
        <h2 className="bienestar-title">Programa de Bienestar</h2>
        <p className="bienestar-subtitle">
          Cultivando el equilibrio entre cuerpo, mente y alma.
        </p>
      </div>
      <div className="pilares-grid">
        {pilares.map((pilar, index) => (
          <div key={index} className="pilar-card">
            <h3 className="pilar-titulo">{pilar.titulo}</h3>
            <p className="pilar-descripcion">{pilar.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramaDeBienestar;