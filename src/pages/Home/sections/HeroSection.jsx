import React, { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import './HeroSection.css';

const HeroSection = () => {
    // Uso del hook personalizado para la animación de entrada
    const { elementRef: heroSectionRef, inView: heroSectionInView } = useScrollAnimation({ threshold: 0 });

    const heroSectionDOMRef = useRef(null);
    const [opacity, setOpacity] = useState(1); // Nuevo estado para la opacidad

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const heroHeight = window.innerHeight; // La altura de la ventana
            const fadePoint = heroHeight * 0.8; // Empieza a desvanecerse al 80% del alto de la pantalla

            // Calcula la opacidad en función de la posición del scroll
            let newOpacity = 1 - (scrollPosition / fadePoint);

            // Asegura que la opacidad no baje de 0
            if (newOpacity < 0) {
                newOpacity = 0;
            }

            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        // Limpieza del event listener al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section
            className={`hero-section ${heroSectionInView ? 'is-in-view' : ''}`}
            ref={(node) => {
                heroSectionRef(node);
                heroSectionDOMRef.current = node;
            }}
            style={{ opacity: opacity }} // Aplica el estilo de opacidad dinámicamente
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
        </section>
    );
};

export default HeroSection;