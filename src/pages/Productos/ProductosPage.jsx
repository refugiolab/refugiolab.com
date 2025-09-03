import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './ProductosPage.css'; // Ruta actualizada
import homelifewear1 from '/images/homelifewear1.png';
import homelifewear2 from '/images/homelifewear2.png';
import homelifewear3 from '/images/homelifewear3.png';


const ProductosPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="productos" className="productos">
      <div className="productos__header">
        <h2 className="productos__titulo">LifeWear</h2>
        <p className="productos__subtitulo">Descubre la esencia de nuestras colecciones.</p>
      </div>

      <div className={`productos__grid ${inView ? 'is-in-view' : ''}`} ref={ref}>
        <div className="productos__collection-item">
          <img src={homelifewear1} alt="YogaWear Collection" className="productos__image" />
          <div className="productos__overlay">
            <h3>YogaWear</h3>
            <p>Ropa de movimiento consciente que te conecta con tu interior.</p>
            <Link to="/home/lifewear/yogawear" className="productos__button">Ver Colección</Link>
          </div>
        </div>

        <div className="productos__collection-item">
          <img src={homelifewear2} alt="Knitwear Collection" className="productos__image" />
          <div className="productos__overlay">
            <h3>Knitwear</h3>
            <p>Piezas tejidas con historias de tradición y confort atemporal.</p>
            <Link to="/home/lifewear/knitwear" className="productos__button">Ver Colección</Link>
          </div>
        </div>

        <div className="productos__collection-item">
          <img src={homelifewear3} alt="Archivo Collection" className="productos__image" />
          <div className="productos__overlay">
            <h3>Archivo</h3>
            <p>Nuestra selección de piezas icónicas y de temporadas pasadas.</p>
            <Link to="/home/lifewear/archivo" className="productos__button">Ver Colección</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductosPage;