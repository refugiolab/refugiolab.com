import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './LifeWear.css';
import imagen1 from '../../public/images/imagen1.png';
import mar from '../../public/images/mar.png';

const LifeWear = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="lifewear" className="lifewear-section">
      <div className="lifewear-header">
        <h2 className="lifewear-title">LifeWear</h2>
        <p className="lifewear-subtitle">Descubre la esencia de nuestras colecciones.</p>
      </div>

      <div className={`lifewear-grid ${inView ? 'is-in-view' : ''}`} ref={ref}>
        {/* Subsección YogaWear */}
        <div className="collection-item yogawear">
          <img src={imagen1} alt="YogaWear Collection" className="collection-image" />
          <div className="collection-overlay">
            <h3>YogaWear</h3>
            <p>Ropa de movimiento consciente que te conecta con tu interior.</p>
            <Link to="/home/lifewear/yogawear" className="collection-button">Ver Colección</Link>
          </div>
        </div>

        {/* Subsección Knitwear */}
        <div className="collection-item knitwear">
          <img src={mar} alt="Knitwear Collection" className="collection-image" />
          <div className="collection-overlay">
            <h3>Knitwear</h3>
            <p>Piezas tejidas con historias de tradición y confort atemporal.</p>
            <Link to="/home/lifewear/knitwear" className="collection-button">Ver Colección</Link>
          </div>
        </div>

        {/* Subsección Archivo */}
        <div className="collection-item archivo">
          <img src={mar} alt="Archivo Collection" className="collection-image" />
          <div className="collection-overlay">
            <h3>Archivo</h3>
            <p>Nuestra selección de piezas icónicas y de temporadas pasadas.</p>
            <Link to="/home/lifewear/archivo" className="collection-button">Ver Colección</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeWear;