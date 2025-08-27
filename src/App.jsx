import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EntradaInmersiva from './components/EntradaInmersiva';
import Layout from './components/Layout';
import Home from './components/Home';
import Manifiesto from './components/Manifiesto';
import LifeWear from './components/LifeWear';
import NudosDeSal from './components/NudosDeSal';
import CartasAlMar from './components/CartasAlMar';
import DisenarTuRefugio from './components/DisenarTuRefugio';
import ProgramaDeBienestar from './components/ProgramaDeBienestar';
import Contacto from './components/Contacto';
import './App.css';

// Componente para la página de "about"
const About = () => <Manifiesto />;

// Placeholder para las sub-páginas de LifeWear
const LifeWearSubPage = ({ collection }) => (
  <div className="sub-page-placeholder">
    <h2>Colección {collection}</h2>
    <p>Esta es la página de la colección de {collection}. ¡Pronto estará disponible!</p>
  </div>
);

// Placeholder para la página de FAQ
const FAQ = () => (
  <div className="faq-page">
    <h2>Preguntas frecuentes</h2>
    <p>Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros productos y servicios.</p>
  </div>
);

// Placeholder para la página del Carrito
const Cart = () => (
  <div className="cart-page">
    <h2>Tu Carrito de Compras</h2>
    <p>Aquí verás los artículos que has añadido a tu bolsa.</p>
  </div>
);


function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <Router>
      <Routes>
        {/* Si no ha entrado, muestra EntradaInmersiva. Si ya entró, redirige a /home */}
        <Route path="/" element={hasEntered ? <Navigate to="/home" replace /> : <EntradaInmersiva onEnter={handleEnter} />} />
        
        {/* Rutas anidadas bajo /home */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} /> {/* /home */}
          <Route path="about" element={<About />} /> {/* /home/about */}
          <Route path="lifewear" element={<LifeWear />} /> {/* /home/lifewear */}
          <Route path="lifewear/yogawear" element={<LifeWearSubPage collection="YogaWear" />} />
          <Route path="lifewear/knitwear" element={<LifeWearSubPage collection="Knitwear" />} />
          <Route path="lifewear/archivo" element={<LifeWearSubPage collection="Archivo" />} />
          <Route path="cartas-al-mar" element={<CartasAlMar />} /> {/* /home/cartas-al-mar */}
          <Route path="nudos-de-sal" element={<NudosDeSal />} /> {/* /home/nudos-de-sal */}
          <Route path="disenar-tu-refugio" element={<DisenarTuRefugio />} /> {/* /home/disenar-tu-refugio */}
          <Route path="programa-de-bienestar" element={<ProgramaDeBienestar />} /> {/* /home/programa-de-bienestar */}
          <Route path="contacto" element={<Contacto />} /> {/* /home/contacto */}
          <Route path="faq" element={<FAQ />} /> {/* /home/faq */}
          <Route path="cart" element={<Cart />} /> {/* /home/cart - Nueva ruta para el carrito */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
