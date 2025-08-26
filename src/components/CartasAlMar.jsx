import React from 'react';
import { useInView } from 'react-intersection-observer';

const CartasAlMar = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cartas = [
    {
      titulo: 'I.',
      texto: 'Escribo para el mar, en la arena que borra y en el viento que susurra. Dejo en cada ola una parte de lo que fui, y espero en el horizonte la promesa de lo que seré.',
    },
    {
      titulo: 'II.',
      texto: 'Las mareas traen y se llevan los secretos. En la sal que se adhiere a la piel, encuentro la memoria de todos los viajes que aún no he hecho.',
    },
    {
      titulo: 'III.',
      texto: 'El mar me enseña a ser. A abrazar la inmensidad, a honrar la calma y a encontrar refugio en la profundidad. Cada ola es una carta, y yo soy un mensaje en una botella, esperando ser descifrado.',
    },
  ];

  return (
    <section id="cartas-al-mar" className="cartas-al-mar-section">
      <style>
        {`
        /* Estilos específicos para este componente */

        /* 2.3. Cartas al Mar */
        .cartas-al-mar-section {
          /* MODIFICADO: Ajuste más agresivo para subir el bloque */
          padding: 4rem 2rem; 
          margin-top: -3rem !important; /* Nuevo ajuste para subir la sección */
          text-align: center;
          background-color: var(--color-fondo);
          color: var(--color-texto);
        }

        .cartas-al-mar__header {
          display: block;
          margin-bottom: 3rem; /* Espaciado entre el título y el contenido */
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }
        
        .cartas-al-mar__header.is-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .cartas-al-mar__titulo {
          font-family: var(--fuente-principal);
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 300;
          color: var(--color-texto);
          margin-bottom: 1.5rem;
          text-align: center;
          text-transform: capitalize;
        }

        .cartas-al-mar__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .cartas-al-mar__item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .cartas-al-mar__grid.is-in-view .cartas-al-mar__item {
          opacity: 1;
          transform: translateY(0);
        }

        .cartas-al-mar__subtitulo {
          font-family: var(--fuente-principal);
          font-size: clamp(1.8rem, 3vw, 2.2rem);
          font-weight: 300;
          color: var(--color-texto);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .cartas-al-mar__texto {
          font-family: var(--fuente-secundaria);
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.6;
          text-align: justify;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .cartas-al-mar-section {
            /* MODIFICADO: Ajuste para móviles */
            padding: 2rem 1.5rem;
            margin-top: -1rem !important;
          }
          
          .cartas-al-mar__header {
            margin-bottom: 1.5rem;
          }

          .cartas-al-mar__titulo {
            font-size: clamp(1.5rem, 3.5vw, 2.2rem);
            margin-bottom: 1rem;
          }

          .cartas-al-mar__subtitulo {
            font-size: clamp(1.4rem, 2.8vw, 1.8rem);
          }
          
          .cartas-al-mar__texto {
            font-size: clamp(0.9rem, 2vw, 1.1rem);
          }
        }
        `}
      </style>
      <div className={`cartas-al-mar__header ${inView ? 'is-in-view' : ''}`} ref={ref}>
        <h2 className="cartas-al-mar__titulo">Cartas al Mar</h2>
      </div>
      <div className={`cartas-al-mar__grid ${inView ? 'is-in-view' : ''}`}>
        {cartas.map((carta, index) => (
          <div key={index} className="cartas-al-mar__item" style={{ transitionDelay: `${index * 150}ms` }}>
            <h3 className="cartas-al-mar__subtitulo">{carta.titulo}</h3>
            <p className="cartas-al-mar__texto">{carta.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CartasAlMar;
