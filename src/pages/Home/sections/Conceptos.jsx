import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Conceptos.css'; 
import pilar1 from '/images/pilar1.webp'; 
import pilar2 from '/images/pilar2.webp';
import pilar3 from '/images/pilar3.webp';
import ojoRefugio from '/images/ojo-refugio.webp';

const mensajesInspiradores = [
    "Recordá que sos capaz de lograr todo lo que te propongas.",
    "Tomate un momento para vos. Sos importante.",
    "Confiá en tu intuición y en tu fuerza interior.",
    "Hoy es un buen día para empezar algo nuevo.",
    "Tu resiliencia es más grande de lo que imaginás.",
    "El amor y la paz están dentro de vos.",
    "Cada pequeño paso te acerca a tus sueños.",
    "Permitite sentir y crecer con cada experiencia.",
    "La vida es un regalo, vivila con gratitud.",
    "Sos suficiente. Sos valioso/a.",
];

const Conceptos = () => {
    const sectionRef = useRef(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [hasBeenClicked, setHasBeenClicked] = useState(false);

    useEffect(() => {
        if (inView) {
            sectionRef.current.classList.add('is-in-view');
        }
    }, [inView]);

    const handleOjoClick = () => {
        if (!hasBeenClicked) {
            const randomIndex = Math.floor(Math.random() * mensajesInspiradores.length);
            setPopupMessage(mensajesInspiradores[randomIndex]);
            setHasBeenClicked(true);
        }
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setHasBeenClicked(false);
    };

    return (
        <section className="pilares-section" ref={sectionRef}>
            <div className="conceptos-grid-container" ref={ref}>
                {/* Concepto 1: LifeWear */}
                <div className="concepto-card">
                    <div className="card-image-wrapper">
                        <img src={pilar1} alt="Concepto Vestir" className="card-image" />
                    </div>
                    <div className="card-content">
                        <h3>LifeWear</h3>
                        <p>Esta es nuestra selección de prendas para la vida, creadas para acompañarte en cada instante, honrando la conexión profunda entre tu cuerpo, tu entorno y tu propio ritmo. Piezas que celebran la comodidad, la fluidez y la belleza de un estilo de vida consciente y natural.</p>
                        <a href="#vestir-accion" class="card-button">Ver cápsulas</a>
                    </div>
                </div>

                {/* Concepto 2: Universo Sensorial */}
                <div className="concepto-card">
                    <div className="card-image-wrapper">
                        <img src={pilar2} alt="Concepto Meditar" className="card-image" />
                    </div>
                    <div className="card-content">
                        <h3>Universo Sensorial</h3>
                        <p>En nuestro universo, vestir es mucho más que cubrir el cuerpo: es la forma en que nos manifestamos al mundo. Te invitamos a habitar el presente con piezas que eleven tu bienestar y conocer nuestro universo sensorial.</p>
                        <a href="#meditar-accion" class="card-button">Explorar</a>
                    </div>
                </div>

                {/* Concepto 3: Citas virtuales */}
                <div className="concepto-card">
                    <div className="card-image-wrapper">
                        <img src={pilar3} alt="Concepto Habitar" className="card-image" />
                    </div>
                    <div className="card-content">
                        <h3>Citas virtuales</h3>
                        <p>Contanos tu historia, un evento especial, o simplemente la visión que tenés en mente. A partir de ella, co-creamos juntas una pieza única, hecha a medida, que se alinee con tu estilo y tus valores.</p>
                        <a href="#habitar-accion" class="card-button">Diseñar mi refugio</a>
                    </div>
                </div>
            </div>

            {/* Ojo de Refugio en la parte inferior */}
            <div className="ojo-bottom-wrapper">
                <img 
                    src={ojoRefugio} 
                    alt="Ojo de Refugio" 
                    className="ojo-refugio-bottom" 
                    onClick={handleOjoClick} 
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Pop-up */}
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-popup-button" onClick={closePopup}>X</button>
                        <p className="popup-message">{popupMessage}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Conceptos;