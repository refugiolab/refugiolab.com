import { useState } from 'react';
import EntradaInmersiva from './components/EntradaInmersiva';
import Header from './components/Header';
import Manifiesto from './components/Manifiesto';
import LifeWear from './components/LifeWear';
import CartasAlMar from './components/CartasAlMar';
import NudosDeSal from './components/NudosDeSal';
import DisenarTuRefugio from './components/DisenarTuRefugio';
import ProgramaDeBienestar from './components/ProgramaDeBienestar';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import './App.css';
import logo from '../public/icons/logo.png';

function SitioPrincipal() {
  return (
    <div id="top">
      <Header />
      <main className="main-content">
        <div className="main-content-header">
          <img src={logo} alt="Refugio Logo" className="logo-principal" />
          {/* ⚠️ El botón "Habitarlo" ha sido eliminado */}
        </div>
        <h1>Bienvenid@ al Universo Refugio</h1>
        <p>Aquí irá la navegación principal y el resto de las secciones.</p>
      </main>
      <Manifiesto />
      <LifeWear />
      <CartasAlMar />
      <NudosDeSal />
      <DisenarTuRefugio />
      <ProgramaDeBienestar />
      <Contacto />
      <Footer />
      {/* ⚠️ Quitamos el placeholder que agregamos para la prueba de scroll */}
      {/* <div style={{ height: '500px', backgroundColor: '#0a0a0a' }}></div> */}
    </div>
  );
}

function App() {
  const [mostrarSitio, setMostrarSitio] = useState(false);

  const handleEntrar = () => {
    setMostrarSitio(true);
  };

  return (
    <>
      {mostrarSitio ? (
        <SitioPrincipal />
      ) : (
        <EntradaInmersiva onEntrar={handleEntrar} />
      )}
    </>
  );
}

export default App;