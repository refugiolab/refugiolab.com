import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import "./Bespoke.css";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Bespoke = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="bespoke-section" ref={sectionRef}>
            <div className="bespoke-overlay"></div>
            <div className="bespoke-content">
                <h1 className="bespoke-title">Bespoke: Diseñá tu Refugio</h1>
                <p className={`bespoke-text ${sectionInView ? "is-in-view" : ""}`}>
                    En Refugio, creamos piezas únicas que se adaptan a tu esencia. Con nuestro servicio Bespoke, puedes personalizar un garment o desarrollar un producto a medida.
                </p>
                <div className="bespoke-cta-container">
                    <button onClick={() => setIsModalOpen(true)} className="bespoke-button">
                        Agendar una cita
                    </button>
                    <Link to="/contacto" className="bespoke-link">
                        Más información
                    </Link>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-content">
                    <h2>Agenda tu cita Bespoke</h2>
                    <p>
                        Para comenzar tu proyecto personalizado, por favor contáctanos para agendar una consulta.
                    </p>
                    <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
                        Cerrar
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default Bespoke;
