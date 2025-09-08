// Archivo: src/pages/Contacto/ContactoPage.jsx

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Importamos la instancia de Firestore

import Modal from '../../components/common/Modal.jsx';
import { IMAGE_PATHS, SOCIAL_LINKS, TEXT_CONTENT } from '../../constants/data';
import useModal from '../../hooks/useModal';
import './ContactoPage.css';

const newTEXT_CONTENT = {
    contactPage: {
        header: {
            // Se modificó el texto del título aquí
            title: 'Conecta con refugio',
            subtitle: 'Nos encantaría saber de vos y responder a cualquier pregunta que tengas.',
        },
        info: {
            text: '¿Tenes una consulta, una idea para colaborar o simplemente queres compartir una reflexión? Escribinos, estamos aquí para escucharte y crear juntos.',
            socialPrompt: 'Envianos un correo electrónico a:',
        },
        form: {
            name: {
                label: 'Nombre completo',
                placeholder: 'Tu nombre',
            },
            email: {
                label: 'Email',
                placeholder: 'tu.email@ejemplo.com',
            },
            message: {
                label: 'Mensaje',
                placeholder: 'Escribe tu mensaje aquí...',
            },
            button: 'Enviar mensaje',
        },
        modal: {
            successTitle: '¡Éxito!',
            errorTitle: 'Error',
        },
    },
};

const ContactoPage = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [modalContent, setModalContent] = useState({ title: '', text: '' });
    
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
        const nameMap = {
            'nombre-contacto': 'nombre',
            'email-contacto': 'email',
            'mensaje-contacto': 'mensaje'
        };
        const name = nameMap[id];
        
        if (name) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log("Enviando formulario a Firebase:", formData);
            const docRef = await addDoc(collection(db, 'contact_messages'), {
                nombre: formData.nombre,
                email: formData.email,
                mensaje: formData.mensaje,
                timestamp: new Date()
            });

            console.log("Mensaje enviado con ID: ", docRef.id);
            setModalContent({
                title: newTEXT_CONTENT.contactPage.modal.successTitle,
                text: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
            });
            setFormData({ nombre: '', email: '', mensaje: '' });

        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setModalContent({
                title: newTEXT_CONTENT.contactPage.modal.errorTitle,
                text: 'Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.',
            });
        } finally {
            openModal();
        }
    };

    const { header, info, form } = newTEXT_CONTENT.contactPage;

    return (
        <section className="contacto">
            <header className="contacto__header">
                <h1 className="contacto__titulo">{header.title}</h1>
                <p className="contacto__subtitulo">{header.subtitle}</p>
            </header>

            <div className={`contacto__contenido ${inView ? 'is-in-view' : ''}`} ref={ref}>
                <div className="contacto__info">
                    <img src={IMAGE_PATHS.logoRefugioGris} alt="Refugio Logo" className="contacto__logo" />
                    <p className="contacto__texto">{info.text}</p>
                    <div className="contacto__redes-sociales">
                        <p>{info.socialPrompt}</p>
                        <a href={`mailto:${SOCIAL_LINKS.email}`}><strong>{SOCIAL_LINKS.email}</strong></a>
                    </div>
                </div>

                <div className="contacto__form-container">
                    <form className="contacto__form" onSubmit={handleSubmit}>
                        <label htmlFor="nombre-contacto">{form.name.label}</label>
                        <input
                            id="nombre-contacto"
                            type="text"
                            placeholder={form.name.placeholder}
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <label htmlFor="email-contacto">{form.email.label}</label>
                        <input
                            id="email-contacto"
                            type="email"
                            placeholder={form.email.placeholder}
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="mensaje-contacto">{form.message.label}</label>
                        <textarea
                            id="mensaje-contacto"
                            placeholder={form.message.placeholder}
                            rows="5"
                            required
                            value={formData.mensaje}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className="contacto__boton">{form.button}</button>
                    </form>
                </div>
            </div>

            <Modal isVisible={isModalOpen} onClose={closeModal} title={modalContent.title}>
                <p>{modalContent.text}</p>
            </Modal>
        </section>
    );
};

export default ContactoPage;