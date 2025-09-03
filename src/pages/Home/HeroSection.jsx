// src/pages/Home/HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './HeroSection.css';

const HeroSection = () => {
    const { ref: heroInViewRef, inView: heroSectionInView } = useInView({
        triggerOnce: true,
        threshold: 0,
    });

    const [fadeOverlayHeight, setFadeOverlayHeight] = useState(0);
    const [heroHeight, setHeroHeight] = useState('100vh');
    const heroSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroSectionRef.current) {
                const scrollPosition = window.scrollY;
                const heroHeightValue = heroSectionRef.current.offsetHeight;
                if (window.innerWidth > 768) {
                    const fadeStart = heroHeightValue * 0.1;
                    const fadeEnd = heroHeightValue * 0.5;
                    let newFadeHeight = 0;
                    if (scrollPosition > fadeStart) {
                        const scrollAmountInFadeSection = scrollPosition - fadeStart;
                        const fadeProgress = Math.min(1, scrollAmountInFadeSection / (fadeEnd - fadeStart));
                        const maxFadeCoverHeight = heroHeightValue * 0.5;
                        newFadeHeight = maxFadeCoverHeight * fadeProgress;
                    } else {
                        newFadeHeight = 0;
                    }
                    setFadeOverlayHeight(newFadeHeight);
                    setHeroHeight('100vh');
                } else {
                    setFadeOverlayHeight(0);
                    setHeroHeight('70vh');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section
            className={`hero-section ${heroSectionInView ? 'is-in-view' : ''}`}
            ref={(node) => {
                heroInViewRef(node);
                heroSectionRef.current = node;
            }}
            style={{ height: heroHeight }}
        >
            <picture className="hero-background-picture">
                {/* RUTAS ACTUALIZADAS PARA USAR LOS NUEVOS ARCHIVOS */}
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