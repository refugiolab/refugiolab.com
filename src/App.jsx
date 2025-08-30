import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de Componentes principales
import EntradaInmersiva from './components/EntradaInmersiva';
import Layout from './components/Layout';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import LifeWear from './components/LifeWear';
import NudosDeSal from './components/NudosDeSal';
import CartasAlMar from './components/CartasAlMar';
import DisenarTuRefugio from './components/DisenarTuRefugio';
import ProgramaDeBienestar from './components/ProgramaDeBienestar';
import Contacto from './components/Contacto';
import './App.css';

// Componentes de Placeholder (simplificados y agrupados)
const PagePlaceholder = ({ title, description }) => (
    <div className="placeholder-container">
        <h2>{title}</h2>
        <p>{description}</p>
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
                {/* 1. Ruta de Entrada Inmersiva */}
                <Route
                    path="/"
                    element={hasEntered ? <Navigate to="/home" replace /> : <EntradaInmersiva onEnter={handleEnter} />}
                />

                {/* 2. Rutas Anidadas bajo el Layout Principal */}
                <Route path="/home" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="lifewear" element={<LifeWear />} />
                    
                    {/* Sub-páginas de LifeWear usando el placeholder */}
                    <Route
                        path="lifewear/yogawear"
                        element={<PagePlaceholder title="Colección YogaWear" description="Esta es la página de la colección YogaWear. ¡Pronto estará disponible!" />}
                    />
                    <Route
                        path="lifewear/knitwear"
                        element={<PagePlaceholder title="Colección Knitwear" description="Esta es la página de la colección Knitwear. ¡Pronto estará disponible!" />}
                    />
                    <Route
                        path="lifewear/archivo"
                        element={<PagePlaceholder title="Colección Archivo" description="Esta es la página de la colección Archivo. ¡Pronto estará disponible!" />}
                    />

                    {/* Otras páginas */}
                    <Route path="cartas-al-mar" element={<CartasAlMar />} />
                    <Route path="nudos-de-sal" element={<NudosDeSal />} />
                    <Route path="disenar-tu-refugio" element={<DisenarTuRefugio />} />
                    <Route path="programa-de-bienestar" element={<ProgramaDeBienestar />} />
                    <Route path="contacto" element={<Contacto />} />

                    {/* Páginas de Placeholder Finales */}
                    <Route
                        path="faq"
                        element={<PagePlaceholder title="Preguntas frecuentes" description="Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros productos y servicios." />}
                    />
                    <Route
                        path="cart"
                        element={<PagePlaceholder title="Tu Carrito de Compras" description="Aquí verás los artículos que has añadido a tu bolsa." />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;