import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Home.css';
import homeVideo from '/homevideo.mp4';
import imagen1 from '/images/imagen1.png';
import imagen2 from '/images/imagen2.png';

const Home = () => {
  const { ref: refText, inView: inViewText } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: refNewsletter, inView: inViewNewsletter } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="home-container">
      <section className="home__intro">
        <video
          className="home__video"
          src={homeVideo}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="home__intro-overlay">
          <div className={`home__intro-texto ${inViewText ? 'is-in-view' : ''}`} ref={refText}>
            <p className="home__intro-slogan">Descubrí la belleza de habitar el mundo a tu propio ritmo.</p>
            <h1 className="home__intro-titulo">Refugio no es solo una marca.</h1>
            <p className="home__intro-descripcion">
              Es una declaración viva. Un espacio nómade donde arte, cuerpo y tiempo se entrelazan. Nace de una urgencia: la de crear un modo distinto de estar en el mundo. Más humano. Más consciente. Más lento.
            </p>
          </div>
        </div>
      </section>

      <section className="home__lifewear-resumen">
        <div className="lifewear-resumen__header">
          <h2>lifewear</h2>
        </div>
        <div className="lifewear-resumen__grid">
          <div className="lifewear-resumen__item">
            <img src={imagen1} alt="YogaWear Collection" className="lifewear-resumen__imagen" />
          </div>
          <div className="lifewear-resumen__item">
            <img src={imagen2} alt="Knitwear Collection" className="lifewear-resumen__imagen" />
          </div>
        </div>
        <Link to="/home/lifewear" className="lifewear-resumen__boton">Ver más de LifeWear</Link>
      </section>

      <section className="home__newsletter">
        <div className={`newsletter__contenido ${inViewNewsletter ? 'is-in-view' : ''}`} ref={refNewsletter}>
          <h2 className="newsletter__titulo">Sumate a nuestra comunidad</h2>
          <p className="newsletter__texto">
            Nos gusta llegar solo cuando tenemos algo con alma para compartir. Vas a recibir noticias sobre próximos lanzamientos, piezas únicas y propuestas para reconectar con lo esencial.
          </p>
          <form className="newsletter__form">
            <input type="text" placeholder="Nombre" aria-label="Nombre" required />
            <input type="email" placeholder="Email" aria-label="Email" required />
            <button type="submit" className="newsletter__boton">Suscribirme</button>
          </form>
        </div>
      </section>

      <section className="home__cierre">
        <p>
          Refugio es eso: el lujo de elegir con conciencia. De habitar con presencia. De vestir(nos) con sentido.
        </p>
      </section>
    </div>
  );
};

export default Home;