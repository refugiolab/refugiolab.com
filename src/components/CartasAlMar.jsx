import React from 'react';
import { useInView } from 'react-intersection-observer';
import './CartasAlMar.css';

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
    <section id="cartas-al-mar" className="cartas-al-mar">
      <div className="cartas-al-mar__header">
        <h2 className="cartas-al-mar__titulo">Cartas al Mar</h2>
      </div>
      <div className={`cartas-al-mar__grid ${inView ? 'is-in-view' : ''}`} ref={ref}>
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