import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EntradaInmersiva from './components/EntradaInmersiva';
import Layout from './components/Layout';
import Manifiesto from './components/Manifiesto';
import LifeWear from './components/LifeWear';
import NudosDeSal from './components/NudosDeSal';
import CartasAlMar from './components/CartasAlMar';
import DisenarTuRefugio from './components/DisenarTuRefugio';
import ProgramaDeBienestar from './components/ProgramaDeBienestar';
import Contacto from './components/Contacto';
import './App.css';

// Componente para la página de inicio que muestra todas las secciones
const Home = () => (
  <>
    <Manifiesto />
    <LifeWear />
    <CartasAlMar />
    <NudosDeSal />
    <DisenarTuRefugio />
    <ProgramaDeBienestar />
    <Contacto />
  </>
);

// Placeholder para las sub-páginas de LifeWear
const LifeWearSubPage = ({ collection }) => (
  <div className="sub-page-placeholder">
    <h2>Colección {collection}</h2>
    <p>Esta es la página de la colección de {collection}. ¡Pronto estará disponible!</p>
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
        <Route path="/" element={hasEntered ? <Navigate to="/home" replace /> : <EntradaInmersiva onEnter={handleEnter} />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="manifiesto" element={<Manifiesto />} />
          <Route path="lifewear" element={<LifeWear />} />
          <Route path="lifewear/yogawear" element={<LifeWearSubPage collection="YogaWear" />} />
          <Route path="lifewear/knitwear" element={<LifeWearSubPage collection="Knitwear" />} />
          <Route path="lifewear/archivo" element={<LifeWearSubPage collection="Archivo" />} />
          <Route path="cartas-al-mar" element={<CartasAlMar />} />
          <Route path="nudos-de-sal" element={<NudosDeSal />} />
          <Route path="disenar-tu-refugio" element={<DisenarTuRefugio />} />
          <Route path="programa-de-bienestar" element={<ProgramaDeBienestar />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;