// Archivo: src/pages/Home/sections/Newsletter.jsx
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { collection, addDoc } from 'firebase/firestore'; // Importa las funciones de Firebase
import { db } from '../../../firebaseConfig'; // Importa la instancia de la base de datos
import './Newsletter.css';

const Newsletter = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // Guarda los datos en una nueva colección llamada 'newsletter_subscribers'
            const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
                name: name,
                email: email,
                timestamp: new Date() // Añade una marca de tiempo
            });

            console.log('Suscripción exitosa con ID:', docRef.id);
            setMessage('🌿¡Gracias por sumarte! Muy pronto recibirás tu primera carta de Refugio.');
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error al guardar la suscripción:', error);
            setMessage('❌ Ocurrió un error. Por favor, intenta de nuevo.');
        } finally {
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <section
            className={`newsletter-section ${inView ? 'is-in-view' : ''}`}
            ref={ref}
        >
            <div className="newsletter-background"></div>{' '}
            <div className="newsletter-content">
                <div className="newsletter__text-container">
                    <h3>Sumate a nuestra comunidad</h3>
                    <p className="newsletter__text">
                        Nos gusta llegar solo cuando tenemos algo con alma para
                        compartir. Recibirás noticias, pre-lanzamientos, próximas
                        experiencias y propuestas para habitar el mundo con más
                        sentido.
                    </p>
                </div>
                <form className="newsletter__form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        aria-label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="newsletter__boton">
                        Suscribirme
                    </button>
                </form>
                {message && (
                    <p className="newsletter__submission-message">{message}</p>
                )}
            </div>
        </section>
    );
};

export default Newsletter;