import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import Newsletter from '../../components/home/Newsletter';
import PreFooter from '../../components/home/PreFooter';
import './HomePage.css';

const HomePage = () => {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const bloquesTexto = [
        {
            id: 'bloque-1',
            text: 'En nuestro universo, vestir es mucho más que cubrir el cuerpo: es la forma en que nos manifestamos al mundo.',
        },
        {
            id: 'bloque-2',
            text: 'Creemos en la atemporalidad. Trascendemos el lujo del exceso para celebrar el verdadero lujo de lo que perdura: lo hecho a mano, lo ético, lo que lleva alma.',
        },
        {
            id: 'bloque-3',
            text: 'Te invitamos a habitar el presente con piezas que eleven tu bienestar.',
        },
    ];

    const handleOjoClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <HeroSection />
            <section
                className={`pilares-section ${sectionInView ? 'is-in-view' : ''}`}
                ref={sectionRef}
            >
                <div className="pilares-intro-capsulas">
                    {/* El párrafo introductorio superior ha sido ELIMINADO */}
                </div>

                <div className="conceptos-container">
                    <svg
                        className="conceptos-lines"
                        viewBox="0 0 1000 700"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* El path del círculo exterior se mantiene igual */}
                        <path
                            d="M 200 150 C 300 50, 700 50, 800 150 Q 880 280, 750 350 C 650 400, 350 400, 250 350 Q 120 280, 200 150 Z"
                            stroke="#444653"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        {/* Línea desde el centro del "ojo" hacia el bloque 1 (arriba) */}
                        <path
                            d="M 500 350 L 500 100"
                            stroke="#444653"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        {/* Línea desde el centro del "ojo" hacia el bloque 2 (izquierda) */}
                        <path
                            d="M 500 350 L 150 250"
                            stroke="#444653"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        {/* Línea desde el centro del "ojo" hacia el bloque 3 (derecha) */}
                        <path
                            d="M 500 350 L 850 450"
                            stroke="#444653"
                            strokeWidth="1.5"
                            fill="none"
                        />
                    </svg>

                    <div className="ojo-refugio" onClick={handleOjoClick}>
                        <picture>
                            <source
                                srcSet="/images/ojo-refugio.webp"
                                type="image/webp"
                            />
                            <img
                                src="/images/ojo-refugio.png"
                                alt="El Ojo de Refugio"
                                className="ojo-image"
                            />
                        </picture>
                    </div>

                    <div className={`bloque-texto bloque-texto-1`}>
                        <p>{bloquesTexto[0].text}</p>
                    </div>
                    <div className={`bloque-texto bloque-texto-2`}>
                        <p>{bloquesTexto[1].text}</p>
                    </div>
                    <div className={`bloque-texto bloque-texto-3`}>
                        <p>{bloquesTexto[2].text}</p>
                    </div>
                </div>

                <div className="cta-section">
                    <Link to="/capsulas" className="cta-button">
                        Ver Cápsulas
                    </Link>
                </div>
            </section>
            
            {/* Nueva sección de imagen */}
            <section className="separador-bloques-section">
                <picture>
                    <source srcSet="/images/separador-bloques.webp" type="image/webp" />
                    <img src="/images/separador-bloques.png" alt="Imagen que separa secciones" className="separador-bloques-image" />
                </picture>
            </section>
            
            <Newsletter />
            <PreFooter />

            {/* Código del cartel (modal) */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">¿Y si tu vida fuera tu obra de arte?</h2>
                        <p className="modal-text">
                            Entendemos el acto de refugiarse no como esconderse, sino como volver a casa, a tu propia esencia. Es un acto de conexión que se siente, que se viste, que se vive.
                        </p>
                        <Link
                            to="/universo-sensorial"
                            className="modal-button"
                            onClick={handleCloseModal}
                        >
                            EXPLORAR UNIVERSO SENSORIAL
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;