import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntradaInmersiva from './components/EntradaInmersiva';
import Layout from './components/Layout';
import Manifiesto from './components/Manifiesto';
import LifeWear from './components/LifeWear';
import CartasAlMar from './components/CartasAlMar';
import NudosDeSal from './components/NudosDeSal';
import DisenarTuRefugio from './components/DisenarTuRefugio';
import ProgramaDeBienestar from './components/ProgramaDeBienestar';
import Contacto from './components/Contacto';
import './App.css';

// Componentes de Placeholder para las colecciones de LifeWear
const YogaWear = () => <div><h2>YogaWear</h2><p>Página de la colección YogaWear.</p></div>;
const Knitwear = () => <div><h2>Knitwear</h2><p>Página de la colección Knitwear.</p></div>;
const Archivo = () => <div><h2>Archivo</h2><p>Página de la colección Archivo.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntradaInmersiva />} />
        
        {/* Rutas anidadas dentro del Layout */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<h1>Bienvenid@ al Universo Refugio</h1>} />
          <Route path="manifiesto" element={<Manifiesto />} />
          <Route path="cartas-al-mar" element={<CartasAlMar />} />
          <Route path="nudos-de-sal" element={<NudosDeSal />} />
          <Route path="disenar-tu-refugio" element={<DisenarTuRefugio />} />
          <Route path="programa-de-bienestar" element={<ProgramaDeBienestar />} />
          <Route path="contacto" element={<Contacto />} />
          
          {/* Rutas anidadas para la sección de LifeWear */}
          <Route path="lifewear">
            <Route index element={<LifeWear />} />
            <Route path="yogawear" element={<YogaWear />} />
            <Route path="knitwear" element={<Knitwear />} />
            <Route path="archivo" element={<Archivo />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
