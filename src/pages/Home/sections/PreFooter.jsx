// src/pages/Home/sections/PreFooter.jsx
import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import './PreFooter.css';

const PreFooter = () => {
    // Uso del nuevo hook
    const { elementRef: sectionRef, inView: sectionInView } = useScrollAnimation();

    return (
        <section className={`pre-footer-section ${sectionInView ? 'is-in-view' : ''}`} ref={sectionRef}>
            <p className="prefooter__text">
                Refugio es el lujo de elegir con conciencia. <br /> De habitar con presencia. <br /> De vestir(nos) con sentido.
            </p>
        </section>
    );
};

export default PreFooter;