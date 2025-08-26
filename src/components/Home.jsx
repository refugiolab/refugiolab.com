import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Hooks para animaciones al entrar en vista
  const { ref: heroTextRef, inView: heroTextInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: pilaresIntroRef, inView: pilaresIntroInView } = useInView({
    triggerOnce: true, // Se dispara una vez cuando entra en vista
    threshold: 0.2,
  });
  const [hasPilaresIntroBeenViewed, setHasPilaresIntroBeenViewed] = useState(false);


  const { ref: lifewearRef, inView: lifewearInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: bespokeRef, inView: bespokeInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: cartasAlMarRef, inView: cartasAlMarInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: newsletterRef, inView: newsletterInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Estado para controlar la altura del overlay de desvanecimiento del hero
  const [fadeOverlayHeight, setFadeOverlayHeight] = useState(0);
  // Estado para controlar la visibilidad y animación del logo gris
  const [showGrayLogo, setShowGrayLogo] = useState(false);

  // Ref para la sección hero
  const heroSectionRef = useRef(null);

  // --- Lógica para el Carrusel de LifeWear ---
  const lifewearImages = [
    '/images/homelifewear1.svg',
    '/images/homelifewear2.svg',
    '/images/homelifewear3.svg',
    '/images/homelifewear4.svg',
    '/images/homelifewear5.svg',
    '/images/homelifewear6.svg',
    '/images/homelifewear7.svg',
    '/images/homelifewear8.svg',
    '/images/homelifewear9.svg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === lifewearImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? lifewearImages.length - 1 : prevIndex - 1
    );
  };
  // --- Fin Lógica Carrusel ---


  // Estado y handler para el formulario de newsletter
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterNameEmail] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter Subscription:', { name: newsletterName, email: newsletterEmail });
    setSubmissionMessage('🌿Gracias por sumarte. Muy pronto recibirás tu primera carta de Refugio.');
    setNewsletterName('');
    setNewsletterNameEmail('');
    setTimeout(() => setSubmissionMessage(''), 5000);
  };

  // Efecto para el desvanecimiento de la imagen hero y aparición del logo gris
  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const heroHeight = heroSectionRef.current.offsetHeight; // Altura real del hero
        const scrollPosition = window.scrollY;

        let newFadeHeight = 0;
        // El desvanecimiento comenzará cuando se haya scrollado el 40% del hero
        const fadeStart = heroHeight * 0.4;
        // El desvanecimiento terminará cuando se haya scrollado el 90% del hero
        const fadeEnd = heroHeight * 0.9;

        if (scrollPosition > fadeStart) {
          setShowGrayLogo(true);
          const scrollAmountInFadeSection = scrollPosition - fadeStart;
          const fadeProgress = Math.min(1, scrollAmountInFadeSection / (fadeEnd - fadeStart)); // Asegura que no pase de 1
          const maxFadeCoverHeight = heroHeight * 0.5; // La capa de fade cubrirá hasta el 50% del hero
          newFadeHeight = maxFadeCoverHeight * fadeProgress;
        } else {
          newFadeHeight = 0; // No hay desvanecimiento al principio
          setShowGrayLogo(false); // Ocultar el logo gris al principio
        }
        setFadeOverlayHeight(newFadeHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ¡NUEVO EFECTO! Para mantener el texto de pilares visible una vez que ha entrado en vista
  useEffect(() => {
    if (pilaresIntroInView && !hasPilaresIntroBeenViewed) {
      setHasPilaresIntroBeenViewed(true);
    }
  }, [pilaresIntroInView, hasPilaresIntroBeenViewed]);


  return (
    <div className="home-container">
      {/* 2.1. Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url('/images/hero.svg')` }} ref={heroSectionRef}>
        <div className="hero__overlay"></div>
        <div className="hero-content">
          <p className={`hero__manifiesto text-justify-custom ${heroTextInView ? 'is-in-view' : ''}`} ref={heroTextRef}>
            Refugio es una declaración viva, un espacio nómade donde arte, cuerpo y tiempo se entrelazan. Nace de la urgencia de crear un modo distinto de estar en el mundo: más humano, más consciente, más lento.
          </p>
          <div className="hero__cta-group">
            <Link to="/about-us" className="hero__cta-full-button">
              <span className="hero__cta-descubri">Descubrí</span> la belleza de habitar el mundo a tu propio ritmo
            </Link>
          </div>
        </div>
        {/* Overlay para el efecto de desvanecimiento */}
        <div className="hero-fade-overlay" style={{ height: `${fadeOverlayHeight}px` }}></div>
      </section>

      {/* Logo entre secciones */}
      {/* Añadimos clase condicional para el fade-in */}
      <div className={`home__logo-gris-container ${showGrayLogo ? 'is-visible' : ''}`}> 
        <img src="/icons/logorefugiogris.svg" alt="Refugio Logo Gris" className="home__logo-gris" />
      </div>

      {/* 2.2. Nuestros Pilares: La Esencia de Refugio */}
      <section className="pilares-section">
        {/* Usamos hasPilaresIntroBeenViewed para mantener la clase 'is-in-view' */}
        <p className={`pilares__intro-text ${hasPilaresIntroBeenViewed ? 'is-in-view' : ''}`} ref={pilaresIntroRef}>
          El arte de crear un modo distinto de estar en el mundo se vive en cada una de nuestras piezas y en la conexión con tu propia esencia.
        </p>
        <div className="pilares-grid">
          {/* Bloque 1: LifeWear */}
          <div className={`pilar-item lifewear-item ${lifewearInView ? 'is-in-view' : ''}`} ref={lifewearRef}>
            <h3>LifeWear</h3>
            <p className="lifewear__phonetic">/ˈlaɪfˌwɛər/</p> {/* Fonética */}
            <p className="pilar-item__description">
              Una invitación a vestir con intención y habitar el mundo con autenticidad. Nuestras cápsulas de autor y atemporales están diseñadas para que cada pieza sea una extensión natural de tu cuerpo y de tu estilo de vida. Una forma auténtica de expresar quién sos, qué valorás y cómo elegís vivir. Te invitamos a sentir la felicidad de encontrar prendas que desearás conservar toda la vida.
            </p>
            {/* Componente Visual: Carrusel de imágenes */}
            <div className="lifewear-carousel-container">
              <button className="carousel-arrow left-arrow" onClick={prevImage} aria-label="Imagen anterior">&#10094;</button>
              <img
                src={lifewearImages[currentImageIndex]}
                alt={`LifeWear Collection ${currentImageIndex + 1}`}
                className="lifewear-carousel-image"
              />
              <button className="carousel-arrow right-arrow" onClick={nextImage} aria-label="Imagen siguiente">&#10095;</button>
              <div className="carousel-dots">
                {lifewearImages.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Ir a la imagen ${index + 1}`}
                  ></span>
                ))}
              </div>
            </div>
            <Link to="/lifewear" className="pilar-item__boton">Ver Cápsulas</Link>
          </div>

          {/* Bloque 2: Bespoke */}
          <div className={`pilar-item bespoke-item ${bespokeInView ? 'is-in-view' : ''}`} ref={bespokeRef}>
            <h3>Bespoke</h3>
            <p className="bespoke__phonetic">/bɪˈspoʊk/</p> {/* Fonética de Bespoke */}
            <p className="pilar-item__description">
              Nuestro servicio de creación a medida es el arte de concebir piezas que capturan tu esencia,
              diseñadas para honrar tu individualidad y acompañar tu ritmo. Es un proceso de co-creación que
              da vida a diseños exclusivos, perfectos para celebrar y expresar quién sos en tus ocasiones
              más significativas.
            </p>
            <Link to="/bespoke" className="pilar-item__boton">Diseñar mi refugio</Link> {/* Botón modificado */}
          </div>
        </div>
      </section>

      {/* 2.3. Cartas al Mar */}
      <section className="cartas-al-mar-section">
        <h3>Cartas al Mar</h3> {/* TÍTULO */}
        <p className={`cartas__intro-text ${cartasAlMarInView ? 'is-in-view' : ''}`} ref={cartasAlMarRef}>
          Nuestro rincón de inspiración donde la prosa se une a la poesía de la vida consciente. Encontrarás
          reflexiones que profundizan tu conexión con el mundo. Cada carta es un diálogo pausado para nutrir
          tu interior y celebrar la belleza de lo simple.
        </p>
        <Link to="/blog/latest" className="cartas__image-link">
          <img src="/images/homecartasalmar.svg" alt="Cartas al Mar - Imagen inspiradora" className="cartas__image" />
        </Link>
        <Link to="/cartas-al-mar" className="cartas__boton">Explorar Bitácora</Link> {/* Botón modificado */}
      </section>

      {/* 2.4. Formulario de Newsletter */}
      <section className="newsletter-section">
        <div className={`newsletter__content ${newsletterInView ? 'is-in-view' : ''}`} ref={newsletterRef}>
          <h3>Newsletter</h3> {/* TÍTULO */}
          <p className="newsletter__text">
            Sumate a nuestra comunidad. Nos gusta llegar solo cuando tenemos algo con alma para compartir.
            Recibirás noticias, pre-lanzamientos, próximas experiencias y propuestas para habitar el mundo con más sentido.
          </p>
          <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              aria-label="Nombre"
              value={newsletterName}
              onChange={(e) => setNewsletterName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterNameEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter__boton">Suscribirme</button>
          </form>
          {submissionMessage && <p className="newsletter__submission-message">{submissionMessage}</p>}
        </div>
      </section>

      {/* 2.5. Frase Pre-Footer */}
      <section className="pre-footer-section" style={{ backgroundImage: `url('/images/homeprefooter.svg')` }}>
        <p className="pre-footer__text text-justify-custom">
          Refugio es el lujo de elegir
          <br />
          con conciencia.
          <br />
          De habitar con presencia.
          <br />
          De vestir(nos) con sentido
        </p>
      </section>
    </div>
  );
};

export default Home;
