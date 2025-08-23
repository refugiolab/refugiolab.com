import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './LifeWear.css';
import imagen1 from '/images/imagen1.png';
import mar from '/images/mar.png';

const LifeWear = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="lifewear" className="lifewear">
      <div className="lifewear__header">
        <h2 className="lifewear__titulo">LifeWear</h2>
        <p className="lifewear__subtitulo">Descubre la esencia de nuestras colecciones.</p>
      </div>

      <div className={`lifewear__grid ${inView ? 'is-in-view' : ''}`} ref={ref}>
        <div className="lifewear__collection-item">
          <img src={imagen1} alt="YogaWear Collection" className="lifewear__image" />
          <div className="lifewear__overlay">
            <h3>YogaWear</h3>
            <p>Ropa de movimiento consciente que te conecta con tu interior.</p>
            <Link to="/home/lifewear/yogawear" className="lifewear__button">Ver Colección</Link>
          </div>
        </div>

        <div className="lifewear__collection-item">
          <img src={mar} alt="Knitwear Collection" className="lifewear__image" />
          <div className="lifewear__overlay">
            <h3>Knitwear</h3>
            <p>Piezas tejidas con historias de tradición y confort atemporal.</p>
            <Link to="/home/lifewear/knitwear" className="lifewear__button">Ver Colección</Link>
          </div>
        </div>

        <div className="lifewear__collection-item">
          <img src={mar} alt="Archivo Collection" className="lifewear__image" />
          <div className="lifewear__overlay">
            <h3>Archivo</h3>
            <p>Nuestra selección de piezas icónicas y de temporadas pasadas.</p>
            <Link to="/home/lifewear/archivo" className="lifewear__button">Ver Colección</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeWear;