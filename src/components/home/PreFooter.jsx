// src/components/home/PreFooter.jsx
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './PreFooter.css'; // Asegúrate de crear este archivo CSS

const PreFooter = () => {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={`prefooter-section ${sectionInView ? 'is-in-view' : ''}`} ref={sectionRef}>
            <p className="prefooter__text">
                Refugio es el lujo de elegir con conciencia. <br /> De habitar con presencia. <br /> De vestir(nos) con sentido.
            </p>
            {/* El botón sin URL funcional por el momento */}
            <button className="prefooter__cta-button" disabled>
                NUESTRO UNIVERSO SENSORIAL
            </button>
            {/* Si en algún momento tiene URL, usar Link: */}
            {/* <Link to="/universo-sensorial" className="prefooter__cta-button">
                NUESTRO UNIVERSO SENSORIAL
            </Link> */}
        </section>
    );
};

export default PreFooter;