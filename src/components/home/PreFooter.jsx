// src/components/home/PreFooter.jsx
import React from 'react';
import { useInView } from 'react-intersection-observer';
import './PreFooter.css';

const PreFooter = () => {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={`pre-footer-section ${sectionInView ? 'is-in-view' : ''}`} ref={sectionRef}>
            <p className="prefooter__text">
                Refugio es el lujo de elegir con conciencia. <br /> De habitar con presencia. <br /> De vestir(nos) con sentido.
            </p>
        </section>
    );
};

export default PreFooter;