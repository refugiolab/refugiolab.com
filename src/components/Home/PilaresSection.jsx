import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './PilaresSection.css'; // Asegúrate de crear este archivo CSS

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

const PilaresSection = () => {
    const { ref: pilaresIntroRef, inView: pilaresIntroInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const { ref: lifewearRef, inView: lifewearInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const { ref: bespokeRef, inView: bespokeInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

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

    return (
        <section className="pilares-section">
            <p className={`pilares__intro-text ${pilaresIntroInView ? 'is-in-view' : ''}`} ref={pilaresIntroRef}>
                El arte de crear un modo distinto de estar en el mundo se vive en cada una de nuestras piezas y en la conexión con tu propia esencia.
            </p>
            <div className="pilares-grid">
                {/* Bloque 1: LifeWear */}
                <div className={`pilar-item lifewear-item ${lifewearInView ? 'is-in-view' : ''}`} ref={lifewearRef}>
                    <h3>LifeWear</h3>
                    <p className="lifewear__phonetic">/ˈlaɪfˌwɛər/</p>
                    <p className="pilar-item__description">
                        Una invitación a vestir con intención y habitar el mundo con autenticidad. Nuestras cápsulas de autor y atemporales están diseñadas para que cada pieza sea una extensión natural de tu cuerpo y de tu estilo de vida. Una forma auténtica de expresar quién sos, qué valorás y cómo elegís vivir. Te invitamos a sentir la felicidad de encontrar prendas que desearás conservar toda la vida.
                    </p>
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
                    <Link to="/home/lifewear" className="pilar-item__boton">Ver Cápsulas</Link>
                </div>

                {/* Bloque 2: Bespoke */}
                <div className={`pilar-item bespoke-item ${bespokeInView ? 'is-in-view' : ''}`} ref={bespokeRef}>
                    <h3>Bespoke</h3>
                    <p className="bespoke__phonetic">/bɪˈspoʊk/</p>
                    <p className="pilar-item__description">
                        Nuestro servicio de creación a medida es el arte de concebir piezas que capturan tu esencia, diseñadas para honrar tu individualidad y acompañar tu ritmo. Es un proceso de co-creación que da vida a diseños exclusivos, perfectos para celebrar y expresar quién sos en tus ocasiones más significativas.
                    </p>
                    <Link to="/home/disenar-tu-refugio" className="pilar-item__boton">Diseñar mi refugio</Link>
                </div>
            </div>
        </section>
    );
};

export default PilaresSection;