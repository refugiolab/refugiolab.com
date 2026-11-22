// src/pages/Home/HomePage.jsx
import React from 'react';
import HeroSection from './sections/HeroSection';
import Newsletter from './sections/Newsletter';
import PreFooter from './sections/PreFooter';
import Conceptos from './sections/Conceptos';
import SEO from '../../components/SEO';
import './HomePage.css';

const HomePage = () => {

    return (
        <>
            <SEO
                title="Refugio | Vestir para habitar(nos)"
                description="Refugio es una declaración viva, un espacio nómade donde arte, cuerpo y tiempo se entrelazan. Nace de la urgencia de crear un modo distinto de estar en el mundo: más humano, más consciente y lento."
                canonical="https://refugiolab.com/inicio"
                ogImage="/images/hero-bg.webp"
            />
            <HeroSection />
            <Conceptos />
            <Newsletter />
            <PreFooter />
        </>
    );
};

export default HomePage;