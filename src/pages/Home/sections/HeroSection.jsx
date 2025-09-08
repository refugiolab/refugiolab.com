// src/pages/Home/sections/HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import './HeroSection.css';

const HeroSection = () => {
    // Uso del nuevo hook personalizado
    const { elementRef: heroSectionRef, inView: heroSectionInView } = useScrollAnimation({ threshold: 0 });

    const [fadeOverlayHeight, setFadeOverlayHeight] = useState(0);
    const [heroHeight, setHeroHeight] = useState('100vh');
    const heroSectionDOMRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroSectionDOMRef.current) {
                const scrollPosition = window.scrollY;
                const heroHeightValue = heroSectionDOMRef.current.offsetHeight;
                
                if (window.innerWidth > 768) {
                    const fadeStart = heroHeightValue * 0.1;
                    const fadeEnd = heroHeightValue * 0.5;
                    let newFadeHeight = 0;
                    if (scrollPosition > fadeStart) {
                        const scrollAmountInFadeSection = scrollPosition - fadeStart;
                        const fadeProgress = Math.min(1, scrollAmountInFadeSection / (fadeEnd - fadeStart));
                        const maxFadeCoverHeight = heroHeightValue * 0.5;
                        newFadeHeight = maxFadeCoverHeight * fadeProgress;
                    }
                    setFadeOverlayHeight(newFadeHeight);
                }
            }
        };

        const handleResize = () => {
            if (heroSectionDOMRef.current && window.innerWidth <= 768) {
                const newHeight = heroSectionDOMRef.current.offsetWidth / 1.5;
                setHeroHeight(`${newHeight}px`);
            } else if (window.innerWidth > 768) {
                setHeroHeight('100vh');
            }
        };

        handleResize(); // Ejecutar al inicio para establecer la altura inicial

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section
            className={`hero-section ${heroSectionInView ? 'is-in-view' : ''}`}
            ref={(node) => {
                heroSectionRef(node);
                heroSectionDOMRef.current = node;
            }}
            style={{ height: heroHeight }}
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
            <div className="hero-fade-overlay" style={{ height: `${fadeOverlayHeight}px` }}></div>
        </section>
    );
};

export default HeroSection;