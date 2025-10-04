import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Se asume que el archivo fue renombrado a .jsx para que el JSX dentro pueda ser procesado por Vite.
import { comingSoonConfig, defaultConfig } from '../../config/comingSoonConfig.jsx'; 
import './ComingSoonPage.css';

// Componente Newsletter Form (Se mantiene para las secciones de "Muy Pronto")
const NewsletterForm = ({ valueProp, sectionName }) => {
    const [email, setEmail] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de envío de email (API call, etc.) iría aquí
        console.log(`Suscripción para ${sectionName}: ${email}`);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="newsletter-confirm">
                <p>¡Inscripción confirmada! Te avisaremos cuando **{sectionName}** esté en línea. ✨</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="newsletter-form">
            <p className="form-prompt">
                Sé el primero en saberlo y recibe **{valueProp}** al momento del lanzamiento.
            </p>
            <div className="form-controls">
                <input 
                    type="email"
                    placeholder="Escribe tu email aquí"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit" className="form-button">Avísame</button>
            </div>
        </form>
    );
};

const ComingSoonPage = () => {
    const location = useLocation();
    
    // Extraer el slug (ej: 'yogawear', 'cartas-al-mar', 'universo-refugio')
    const pathSegments = location.pathname.split('/');
    const slug = pathSegments[pathSegments.length - 1];

    // Obtener la configuración dinámica.
    const config = comingSoonConfig[slug] || defaultConfig;

    // Desestructuración de propiedades
    const { 
        title, 
        message, 
        valueProp, 
        image, 
        isAtelier, 
        contactForm 
    } = config; 

    // Determina el título a mostrar: "Muy pronto" o el título específico ("Diseñá tu refugio")
    const displayTitle = isAtelier ? title : 'Muy pronto';


    return (
      <div className="coming-soon-wrapper">
          {/* Implementación del Hero Dinámico con Imagen o Fallback */}
          {image ? (
              <div className="coming-soon-hero" style={{ backgroundImage: `url(${image})` }}>
                  {/* Overlay sutil para mejorar la estética */}
                  <div className="hero-overlay"></div> 
              </div>
          ) : (
              // Fallback si no hay imagen definida en la config
              <div className="coming-soon-hero-placeholder"></div>
          )}

        <div className="coming-soon-container">
            <div className="coming-soon-content">
                
                {/* Título Principal (Ahora dinámico) */}
                <h1 className="coming-soon-title">{displayTitle}</h1>
                
                {/* Mensaje Principal (Contiene el texto de la sección) */}
                <div className="coming-soon-message">
                    {message}
                </div>

                {/* Renderizado Condicional del Formulario/CTA */}
                {isAtelier ? (
                    // ----------------------------------------------------
                    // RENDERIZADO ESPECIAL PARA EXPERIENCIA ATELIER
                    // ----------------------------------------------------
                    <div className="atelier-form-section">
                        {contactForm}
                    </div>
                ) : (
                    // ----------------------------------------------------
                    // RENDERIZADO ESTÁNDAR PARA PÁGINAS "MUY PRONTO" (NEWSLETTER)
                    // ----------------------------------------------------
                    <>
                        {/* Área de Call to Action y Newsletter */}
                        <div className="coming-soon-callout">
                            <h2 className="callout-title">Conviértete en Prioridad 💌</h2>
                            <NewsletterForm valueProp={valueProp} sectionName={title} />
                        </div>

                        {/* Enlaces Secundarios */}
                        <div className="secondary-links">
                            <p className="link-prompt">Mientras esperas, explora nuestras colecciones actuales:</p>
                            <Link to="/productos" className="coming-soon-link primary">Ver Colecciones</Link>
                            <Link to="/" className="coming-soon-link secondary">Volver al Inicio</Link>
                        </div>
                    </>
                )}

            </div>
        </div>
    </div>
  );
};

export default ComingSoonPage;