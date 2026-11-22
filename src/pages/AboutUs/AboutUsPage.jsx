// Archivo: C:\universo-refugio\src\pages\AboutUs\AboutUsPage.jsx
import React from 'react';
import SEO from '../../components/SEO';
import './AboutUsPage.css'; // Aquí importas los estilos

const AboutUsPage = () => {
  return (
    <>
      <SEO
        title="Sobre Refugio"
        description="Conocé la historia y el propósito detrás de Refugio, una marca de ropa consciente y atemporal."
        canonical="https://refugiolab.com/sobre-mi"
        ogImage="/images/separador-bloques.webp"
      />
      <div className="about-us-page">
        {/* Contenido de la página */}
      </div>
    </>
  );
};

export default AboutUsPage;