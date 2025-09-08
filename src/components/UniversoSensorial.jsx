// src/pages/UniversoSensorial/UniversoSensorial.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './UniversoSensorial.css';
import universoSensorialData from './universoSensorialData.js';

const UniversoSensorial = () => {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="universo-sensorial-section" ref={sectionRef}>
            <div className="universo-sensorial-overlay"></div>
            <div className="universo-sensorial-content">
                <h1 className="universo-sensorial-title">{universoSensorialData.title}</h1>
                <p className={`universo-sensorial-text ${sectionInView ? 'is-in-view' : ''}`}>
                    {universoSensorialData.text}
                </p>
                <Link to={universoSensorialData.button.path} className="universo-sensorial-button">
                    {universoSensorialData.button.text}
                </Link>
            </div>
        </section>
    );
};

export default UniversoSensorial;