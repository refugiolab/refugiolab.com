import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home/HomePage.jsx';
import AboutUsPage from './pages/AboutUs/AboutUsPage.jsx';
import BlogPage from './pages/Blog/BlogPage.jsx';
import ProductosPage from './pages/Productos/ProductosPage.jsx';
import ContactoPage from './pages/Contacto/ContactoPage.jsx';
import ImmersiveIntroPage from './pages/ImmersiveIntro/ImmersiveIntroPage.jsx';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* La entrada inmersiva sigue siendo la ruta principal */}
        <Route path="/" element={<ImmersiveIntroPage />} />
        
        {/* El componente Layout ahora es una ruta padre */}
        <Route path="/" element={<Layout />}>
          <Route path="inicio" element={<HomePage />} />
          <Route path="sobre-mi" element={<AboutUsPage />} />
          <Route path="cartas-al-mar" element={<BlogPage />} />
          <Route path="lifewear" element={<ProductosPage />} />
          <Route path="contacto" element={<ContactoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;