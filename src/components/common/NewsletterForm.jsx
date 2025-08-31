import React, { useState } from 'react';
import './NewsletterForm.css'; // Asegúrate de crear este archivo CSS

const NewsletterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        console.log('Newsletter Subscription:', { name, email });
        setMessage('🌿Gracias por sumarte. Muy pronto recibirás tu primera carta de Refugio.');
        setName('');
        setEmail('');
        setTimeout(() => setMessage(''), 5000);
    };

    return (
        <div className="newsletter-content">
            <h3>Newsletter</h3>
            <p className="newsletter__text">
                Sumate a nuestra comunidad. Nos gusta llegar solo cuando tenemos algo con alma para compartir. Recibirás noticias, pre-lanzamientos, próximas experiencias y propuestas para habitar el mundo con más sentido.
            </p>
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
                <button type="submit" className="newsletter__boton">Suscribirme</button>
            </form>
            {message && <p className="newsletter__submission-message">{message}</p>}
        </div>
    );
};

export default NewsletterForm;