import React from 'react';
import './PreFooterSection.css'; // Asegúrate de crear este archivo CSS

const PreFooterSection = () => {
    return (
        <section className="pre-footer-section" style={{ backgroundImage: `url('/images/homeprefooter.svg')` }}>
            <p className="pre-footer__text text-justify-custom">
                Refugio es el lujo de elegir
                <br />
                con conciencia.
                <br />
                De habitar con presencia.
                <br />
                De vestir(nos) con sentido.
            </p>
        </section>
    );
};

export default PreFooterSection;