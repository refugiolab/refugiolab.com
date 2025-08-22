import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntradaInmersiva />} />
        {/* Aquí la página de inicio es la que tiene la entrada inmersiva.
        Cuando hagas clic en el botón "Entrar", irás a la página principal. */}
        <Route path="/home" element={
          <>
            <Header />
            <main className="main-content">
              <h1>Bienvenid@ al Universo Refugio</h1>
            </main>
            <Footer />
          </>
        } />
        {/* Rutas para cada una de las secciones */}
        <Route path="/manifiesto" element={
          <>
            <Header />
            <Manifiesto />
            <Footer />
          </>
        } />
        <Route path="/lifewear" element={
          <>
            <Header />
            <LifeWear />
            <Footer />
          </>
        } />
        <Route path="/cartas-al-mar" element={
          <>
            <Header />
            <CartasAlMar />
            <Footer />
          </>
        } />
        <Route path="/nudos-de-sal" element={
          <>
            <Header />
            <NudosDeSal />
            <Footer />
          </>
        } />
        <Route path="/disenar-tu-refugio" element={
          <>
            <Header />
            <DisenarTuRefugio />
            <Footer />
          </>
        } />
        <Route path="/programa-de-bienestar" element={
          <>
            <Header />
            <ProgramaDeBienestar />
            <Footer />
          </>
        } />
        <Route path="/contacto" element={
          <>
            <Header />
            <Contacto />
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;