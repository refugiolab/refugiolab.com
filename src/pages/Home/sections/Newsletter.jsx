// Archivo: src/pages/Home/sections/Newsletter.jsx
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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
      // Usar la ruta correcta que se ve en la consola de Firebase.
      const docRef = await addDoc(collection(db, `newsletter_subscribers`), {
        name: name,
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
    <>
      <style>{`
        .newsletter-section {
          position: relative;
          min-height: 50vh;
          overflow: hidden;
          padding: 8rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .newsletter-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://placehold.co/1920x1080/4F7449/ffffff?text=Newsletter+Background');
          background-size: cover;
          background-position: center;
          opacity: 0.8;
          z-index: 1;
        }

        .newsletter-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          color: white;
          padding: 2rem;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.4);
        }

        .newsletter__text-container {
          max-width: 600px;
          margin-bottom: 1.5rem;
        }

        .newsletter__text-container h3 {
          font-family: 'NewYork', serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .newsletter__text {
          font-family: 'Comissioner', sans-serif;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .newsletter__form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 400px;
        }

        .newsletter__form input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          background-color: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .newsletter__boton {
          background-color: #4F7449;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .newsletter__boton:hover {
          background-color: #3D5A3A;
        }

        .newsletter__submission-message {
          margin-top: 1rem;
          font-weight: bold;
        }
      `}</style>
      <section
        className={`newsletter-section ${inView ? 'is-in-view' : ''}`}
        ref={ref}
      >
        <div className="newsletter-background"></div>
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
    </>
  );
};

export default Newsletter;