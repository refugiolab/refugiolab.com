import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './BlogPage.css'; // Importa el archivo de estilos

const BlogPage = () => {
    const { ref: blogTextRef, inView: blogTextInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section className="blog-page-section">
            <div className="blog__text-content">
                <h3>Cartas al Mar</h3>
                <p className={`blog__intro-text ${blogTextInView ? 'is-in-view' : ''}`} ref={blogTextRef}>
                    Nuestro rincón de inspiración donde la prosa se une a la poesía de la vida consciente. Encontrarás reflexiones que profundizan tu conexión con el mundo. Cada carta es un diálogo pausado para nutrir tu interior y celebrar la belleza de lo simple.
                </p>
            </div>
            
            <div className="blog__image-container">
                <picture>
                    <source srcSet="/images/homecartasalmar.webp" type="image/webp" />
                    <img className="blog__image" src="/images/homecartasalmar.png" alt="Cartas al Mar - Imagen inspiradora" />
                </picture>
            </div>

            <div className="blog__button-container">
                <Link to="/home/cartas-al-mar" className="blog__boton" data-discover="true">
                    <span>Explorar Bitácora</span>
                </Link>
            </div>
        </section>
    );
};

export default BlogPage;