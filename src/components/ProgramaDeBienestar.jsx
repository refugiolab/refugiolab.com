import React from 'react';
import { useInView } from 'react-intersection-observer'; // Importamos useInView
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

  // Hook para la animación de entrada
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // El 20% del componente debe estar visible para activar
  });

  return (
    <section id="programa-bienestar" className="bienestar-section">
      <div className="bienestar-header">
        <h2 className="bienestar-title">Programa de Bienestar</h2>
        <p className="bienestar-subtitle">
          Cultivando el equilibrio entre cuerpo, mente y alma.
        </p>
      </div>
      <div className={`pilares-grid ${inView ? 'is-in-view' : ''}`} ref={ref}> {/* Aplicamos la clase de animación aquí */}
        {pilares.map((pilar, index) => (
          <div key={index} className="pilar-card" style={{ transitionDelay: `${index * 150}ms` }}>
            <h3 className="pilar-titulo">{pilar.titulo}</h3>
            <p className="pilar-descripcion">{pilar.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramaDeBienestar;
