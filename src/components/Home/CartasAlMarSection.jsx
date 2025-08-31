import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './CartasAlMarSection.css';

const CartasAlMarSection = () => {
    const { ref: cartasAlMarRef, inView: cartasAlMarInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section className="cartas-al-mar-section">
            <h3>Cartas al Mar</h3>
            <p className={`cartas__intro-text ${cartasAlMarInView ? 'is-in-view' : ''}`} ref={cartasAlMarRef}>
                Nuestro rincón de inspiración donde la prosa se une a la poesía de la vida consciente. Encontrarás reflexiones que profundizan tu conexión con el mundo. Cada carta es un diálogo pausado para nutrir tu interior y celebrar la belleza de lo simple.
            </p>
            <Link to="/home/cartas-al-mar" className="cartas__image-link">
                <img src="/images/homecartasalmar.svg" alt="Cartas al Mar - Imagen inspiradora" className="cartas__image" />
            </Link>
            <Link to="/home/cartas-al-mar" className="cartas__boton">Explorar Bitácora</Link>
        </section>
    );
};

export default CartasAlMarSection;