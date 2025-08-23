import React from 'react';
import { useInView } from 'react-intersection-observer';
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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="programa-bienestar" className="programa-bienestar">
      <div className="programa-bienestar__header">
        <h2 className="programa-bienestar__titulo">Programa de Bienestar</h2>
        <p className="programa-bienestar__subtitulo">
          Cultivando el equilibrio entre cuerpo, mente y alma.
        </p>
      </div>
      <div className={`programa-bienestar__pilares-grid ${inView ? 'is-in-view' : ''}`} ref={ref}>
        {pilares.map((pilar, index) => (
          <div key={index} className="programa-bienestar__pilar-card" style={{ transitionDelay: `${index * 150}ms` }}>
            <h3 className="programa-bienestar__pilar-titulo">{pilar.titulo}</h3>
            <p className="programa-bienestar__pilar-descripcion">{pilar.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramaDeBienestar;