import React from "react";
import { useInView } from "react-intersection-observer";
import "./UniversoSensorial.css";
import hero from "/images/hero.png";

const UniversoSensorial = () => {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="universo-sensorial-section" ref={sectionRef}>
            <img src={hero} alt="Fondo hero" className="universo-sensorial-background" />
            <div className="universo-sensorial-overlay"></div>
            <div className="universo-sensorial-content">
                <h1 className="universo-sensorial-title">Universo Sensorial</h1>
                <p className={`universo-sensorial-text ${sectionInView ? "is-in-view" : ""}`}>
                    En este espacio, el arte y los sentidos se unen para ofrecerte una experiencia única y profunda. Explora nuestra curaduría de objetos y vivencias que nutren el alma.
                </p>
                <a href="/home" className="universo-sensorial-button">
                    Explorar
                </a>
            </div>
        </section>
    );
};

export default UniversoSensorial;
