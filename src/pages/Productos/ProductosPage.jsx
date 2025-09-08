import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import './ProductosPage.css';

const ProductosPage = () => {
    // Mantengo el hook useInView para la sección principal si se necesita,
    // pero se eliminan las referencias a los elementos de producto.
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section className={`productos-page ${sectionInView ? 'is-in-view' : ''}`} ref={sectionRef}>
            <div className="productos-header">
                <h1 className="productos__titulo">LIFEAWARE</h1>
                <p className="productos__subtitulo">Vestir(nos) con sentido.</p>
            </div>
            
            <div className="productos-placeholder">
                <p>Aquí irá el contenido de las colecciones de productos.</p>
                {/* Puedes añadir una imagen de relleno o un icono si lo necesitas */}
                
            </div>

            <div className="productos-cta">
                <Link to="/contacto" className="productos-cta-button">
                    <span>Solicita un diseño personalizado</span>
                </Link>
            </div>
        </section>
    );
};

export default ProductosPage;
