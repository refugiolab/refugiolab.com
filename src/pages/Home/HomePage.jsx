// src/pages/Home/HomePage.jsx
import React from 'react';
import HeroSection from './sections/HeroSection';
import Newsletter from './sections/Newsletter';
import PreFooter from './sections/PreFooter';
import Conceptos from './sections/Conceptos';
import './HomePage.css';

const HomePage = () => {

    return (
        <>
            <HeroSection />
            <Conceptos />
            <Newsletter />
            <PreFooter />
        </>
    );
};

export default HomePage;