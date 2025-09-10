import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import HeroSection from './sections/HeroSection';
import Newsletter from './sections/Newsletter';
import PreFooter from './sections/PreFooter';
import Modal from '../../components/common/Modal.jsx'; // Importamos el componente Modal
import useModal from '../../hooks/useModal'; // Importamos el custom hook
import { TEXT_CONTENT, IMAGE_PATHS, NAV_LINKS } from '../../constants/data';
import './HomePage.css';

const HomePage = () => {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    
    // Usamos el custom hook para manejar la lógica del modal
    const { isModalOpen, openModal, closeModal } = useModal();
    
    // Obtenemos los textos del archivo de constantes
    const { pilares, modal } = TEXT_CONTENT.homePage;

    return (
        <>
            <HeroSection />
            <section className={`pilares-section ${sectionInView ? 'is-in-view' : ''}`} ref={sectionRef}>
                <div className="conceptos-container">
                    <img
                        src={IMAGE_PATHS.ojoRefugio}
                        alt="Un ojo que simboliza la conciencia"
                        className="ojo-refugio"
                        onClick={openModal} // Usamos la función del hook
                    />
                    <div className="conceptos-lines">
                        {pilares.map((bloque) => (
                            <div key={bloque.id} className="bloque-texto">
                                <p>{bloque.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Se elimina la sección del separador de bloques */}
            
            <Newsletter />
            <PreFooter />

            {/* Renderizamos el componente Modal de forma centralizada */}
            <Modal isVisible={isModalOpen} onClose={closeModal} title={modal.title}>
                <p>{modal.text}</p>
                <Link
                    to={NAV_LINKS.sensoryUniverse}
                    className="modal-button"
                    onClick={closeModal}
                >
                    {modal.button}
                </Link>
            </Modal>
        </>
    );
};

export default HomePage;