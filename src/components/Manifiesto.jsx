import React from 'react';
import { useInView } from 'react-intersection-observer';
import './Manifiesto.css';
import fondoManifiesto from '/images/mar.png';

const Manifiesto = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="manifiesto" className="manifiesto" style={{ backgroundImage: `url(${fondoManifiesto})` }}>
      <div className={`manifiesto__overlay ${inView ? 'is-in-view' : ''}`} ref={ref}>
        <div className="manifiesto__contenido">
          <h2 className="manifiesto__titulo">
            Manifiesto
          </h2>
          <div className="manifiesto__texto">
            <p>
              En el vasto silencio del mar, encontramos nuestro eco. Refugio no es solo una marca; es un estado del ser. Un recordatorio de que la vida es un ritual, un fluir constante entre el caos y la calma. Nos vestimos con fibras que respiran, con texturas que abrazan, con colores que cuentan historias de la tierra y del mar.
            </p>
            <p>
              Creemos en un movimiento lento, en el que cada pieza es un nudo de sal, un susurro del viento, una extensión de tu piel. Diseñamos con la intención de crear prendas que no solo te vistan, sino que te habiten, permitiéndote encontrar tu propio ritmo y fluir con el universo que te rodea.
            </p>
            <p>
              Refugio es el espacio donde el movimiento se convierte en arte y el bienestar es nuestra más alta expresión. Es un compromiso con la naturaleza, con el tiempo y, sobre todo, contigo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifiesto;