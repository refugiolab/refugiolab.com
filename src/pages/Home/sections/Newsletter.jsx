// src/pages/Home/sections/Newsletter.jsx
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Newsletter.css';

// Estas variables globales son proporcionadas por el entorno.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Inicialización de Firebase. Es importante que esta parte se ejecute una sola vez.
let app, auth, db;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
db = getFirestore(app);
auth = getAuth(app);

const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Autentica el usuario al cargar el componente.
  useEffect(() => {
    const authenticate = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        }
        setIsAuthReady(true);
      } catch (error) {
        console.error("Error al autenticar con token personalizado:", error);
      }
    };
    if (auth) {
      authenticate();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!isAuthReady) {
      setMessage('El servicio no está listo. Por favor, inténtalo de nuevo.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `newsletter_subscribers`), {
        name: name || 'No especificado',
        email: email,
        timestamp: new Date()
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
    <section ref={ref} className={`newsletter-section ${inView ? 'is-in-view' : ''}`}>
      <div className="newsletter-container">
        <div className="newsletter-text-content">
          <h3 className="newsletter-heading">Sumate a nuestra comunidad</h3>
          <p className="newsletter-description">
            Nos gusta llegar solo cuando tenemos algo con alma para compartir.
          </p>
          <p className="newsletter-description">
            Recibirás noticias, pre-lanzamientos, próximas experiencias y propuestas para habitar el mundo con más sentido.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-group">
            <input
              type="text"
              placeholder="Nombre"
              aria-label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="newsletter-input"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
          </div>
          <button type="submit" className="subscribe-button" aria-label="Suscribirse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.43 5.92999L20.5 12L14.43 18.07" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 12H20.33" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {message && (
            <p className="newsletter-message">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;