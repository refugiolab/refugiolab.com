import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './HeroSection.css'; // Asegúrate de crear este archivo CSS

const HeroSection = () => {
    const { ref: heroTextRef, inView: heroTextInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    
    const [fadeOverlayHeight, setFadeOverlayHeight] = useState(0);
    const [showGrayLogo, setShowGrayLogo] = useState(false);
    const heroSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroSectionRef.current) {
                const heroHeight = heroSectionRef.current.offsetHeight;
                const scrollPosition = window.scrollY;
                
                if (window.innerWidth > 768) {
                    const fadeStart = heroHeight * 0.1;
                    const fadeEnd = heroHeight * 0.5;
                    
                    let newFadeHeight = 0;
                    
                    if (scrollPosition > fadeStart) {
                        setShowGrayLogo(true);
                        const scrollAmountInFadeSection = scrollPosition - fadeStart;
                        const fadeProgress = Math.min(1, scrollAmountInFadeSection / (fadeEnd - fadeStart));
                        const maxFadeCoverHeight = heroHeight * 0.5;
                        newFadeHeight = maxFadeCoverHeight * fadeProgress;
                    } else {
                        newFadeHeight = 0;
                        setShowGrayLogo(false);
                    }
                    setFadeOverlayHeight(newFadeHeight);
                } else {
                    setFadeOverlayHeight(0);
                    setShowGrayLogo(true);
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
        <>
            <section className="hero-section" style={{ backgroundImage: `url('/images/hero.svg')` }} ref={heroSectionRef}>
                <div className="hero__overlay"></div>
                <div className="hero-content">
                    <p className={`hero__manifiesto text-justify-custom ${heroTextInView ? 'is-in-view' : ''}`} ref={heroTextRef}>
                        Refugio es una declaración viva, un espacio nómade donde arte, cuerpo y tiempo se entrelazan. Nace de la urgencia de crear un modo distinto de estar en el mundo: más humano, más consciente, más lento.
                    </p>
                    <div className="hero__cta-group">
                        <Link to="/home/about" className="hero__cta-full-button">
                            <span className="hero__cta-descubri">Descubrí</span> Refugio
                        </Link>
                    </div>
                </div>
                <div className="hero-fade-overlay" style={{ height: `${fadeOverlayHeight}px` }}></div>
            </section>
            
            <div className={`home__logo-gris-container ${showGrayLogo ? 'is-visible' : ''}`}> 
                <img src="/icons/logorefugiogris.svg" alt="Refugio Logo Gris" className="home__logo-gris" />
            </div>
        </>
    );
};

export default HeroSection;
