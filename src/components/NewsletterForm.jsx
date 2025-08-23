import React, { useState } from 'react';
import './NewsletterForm.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    // Validación básica del email
    if (!email.includes('@') || email.length < 5) {
      setMessage('Por favor, introduce un email válido.');
      setIsError(true);
      return;
    }

    // Aquí iría la lógica para enviar el email a un servicio de newsletter
    // (Ej: Mailchimp, SendGrid, etc.).
    // Por ahora, solo simulamos la respuesta.
    console.log('Enviando email de suscripción:', email);
    
    // Mensaje de éxito
    setMessage('¡Gracias por sumarte! Muy pronto recibirás tu primera carta de Refugio.');
    setEmail('');
  };

  return (
    <div className="newsletter-section">
      <h4>Newsletter</h4>
      <p className="newsletter-text">
        Nos gusta llegar solo cuando tenemos algo con alma para compartir. Un espacio para recibir más que noticias. Acá llegan antes que nadie los lanzamientos, pero también reflexiones, ideas y pequeños rituales que nos recuerdan cómo habitar el mundo con más sentido.
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Introduce tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="newsletter-input"
          required
        />
        <button type="submit" className="newsletter-button">
          Suscribirme
        </button>
      </form>
      {message && (
        <p className={`newsletter-message ${isError ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;