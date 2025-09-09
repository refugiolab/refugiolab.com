// src/pages/Home/sections/HeroSection.jsx
import React, { useRef } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import './HeroSection.css';

const HeroSection = () => {
    // Uso del hook personalizado para la animación
    const { elementRef: heroSectionRef, inView: heroSectionInView } = useScrollAnimation({ threshold: 0 });

    const heroSectionDOMRef = useRef(null);

    return (
        <section
            className={`hero-section ${heroSectionInView ? 'is-in-view' : ''}`}
            ref={(node) => {
                heroSectionRef(node);
                heroSectionDOMRef.current = node;
            }}
        >
            <picture className="hero-background-picture">
                <source srcSet="/images/hero-bg.webp" type="image/webp" />
                <img src="/images/hero-bg.png" alt="Fondo de la sección principal" className="hero-background-image" />
            </picture>
            <div className="hero__overlay"></div>
            <div className="hero-content">
                <h1 className={`hero__title ${heroSectionInView ? 'is-in-view' : ''}`}>
                    Vestir para habitar(nos)
                </h1>
                <p className={`hero__main-text ${heroSectionInView ? 'is-in-view' : ''}`}>
                    Refugio es una declaración viva, un espacio nómade donde arte, cuerpo y tiempo se entrelazan. Nace de la urgencia de crear un modo distinto de estar en el mundo: más humano, más consciente y lento.
                </p>
            </div>
            {/* El hero-fade-overlay se puede manejar con CSS */}
        </section>
    );
};

export default HeroSection;