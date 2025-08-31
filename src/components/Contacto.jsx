// src/components/Contacto.jsx

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Contacto.css';
import logo from '/icons/logo.png';
import Modal from './Modal';

const Contacto = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Aquí se podría integrar con un servicio de backend, por ejemplo, Formspree o un endpoint propio
            // const response = await fetch('YOUR_BACKEND_ENDPOINT', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });

            // if (response.ok) {
            //     // Lógica de éxito
            //     setShowModal(true);
            //     setFormData({ nombre: '', email: '', mensaje: '' }); // Limpiar formulario
            // } else {
            //     // Lógica de error
            //     alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            // }
            
            // Simulación de envío exitoso
            console.log('Formulario enviado:', formData);
            setShowModal(true);
            setFormData({ nombre: '', email: '', mensaje: '' });

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <section id="contacto" className="contacto">
            <div className="contacto__header">
                <h2 className="contacto__titulo">Contacto</h2>
                <p className="contacto__subtitulo">
                    Estamos aquí para escucharte.
                </p>
            </div>

            <div className={`contacto__contenido ${inView ? 'is-in-view' : ''}`} ref={ref}>
                <div className="contacto__info">
                    <img src={logo} alt="Refugio Logo" className="contacto__logo" />
                    <p>
                        <strong>Email:</strong> hola@universo-refugio.com
                    </p>
                    <p>
                        <strong>Teléfono:</strong> +54 9 11 1234-5678
                    </p>
                    <div className="contacto__redes-sociales">
                        <a href="https://instagram.com/refugio_________" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
                    </div>
                </div>

                <div className="contacto__form-container">
                    <form className="contacto__form" onSubmit={handleSubmit}>
                        <label htmlFor="nombre-contacto">Nombre completo</label>
                        <input
                            id="nombre-contacto"
                            type="text"
                            placeholder="Nombre completo"
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <label htmlFor="email-contacto">Correo electrónico</label>
                        <input
                            id="email-contacto"
                            type="email"
                            placeholder="Correo electrónico"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="mensaje-contacto">Tu mensaje...</label>
                        <textarea
                            id="mensaje-contacto"
                            placeholder="Tu mensaje..."
                            rows="5"
                            required
                            value={formData.mensaje}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className="contacto__boton">Enviar Mensaje</button>
                    </form>
                </div>
            </div>

            <Modal isVisible={showModal} onClose={closeModal} title="¡Mensaje Enviado!">
                <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
            </Modal>
        </section>
    );
};

export default Contacto;