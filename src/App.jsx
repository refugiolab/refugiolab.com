// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa el proveedor del contexto del carrito para envolver la aplicación
import { CartProvider } from './context/CartContext'; 

// Importa los componentes principales
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute'; 
import './styles/App.css';
import { NAV_LINKS } from './constants/data';

// Implementación de Lazy Loading para las páginas
const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'));
const AboutUsPage = lazy(() => import('./pages/AboutUs/AboutUsPage.jsx'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage.jsx'));
const ProductosPage = lazy(() => import('./pages/Productos/ProductosPage.jsx'));
const ContactoPage = lazy(() => import('./pages/Contacto/ContactoPage.jsx'));
const ImmersiveIntroPage = lazy(() => import('./pages/ImmersiveIntro/ImmersiveIntroPage.jsx'));

// Implementación de Lazy Loading para las páginas de Admin
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanel.jsx'));

function App() {
    return (
        <Router>
            {/* Envuelve la aplicación con el CartProvider para que todos los componentes tengan acceso al estado del carrito */}
            <CartProvider>
                <Suspense fallback={<div>Cargando...</div>}>
                    <Routes>
                        {/* La entrada inmersiva como ruta independiente */}
                        <Route path="/" element={<ImmersiveIntroPage />} />

                        {/* El componente Layout ahora es la ruta padre para el resto de páginas */}
                        <Route element={<Layout />}>
                            <Route path={NAV_LINKS.home} element={<HomePage />} />
                            <Route path={NAV_LINKS.aboutUs} element={<AboutUsPage />} />
                            <Route path={NAV_LINKS.blog} element={<BlogPage />} />
                            <Route path={NAV_LINKS.products} element={<ProductosPage />} />
                            <Route path={NAV_LINKS.contact} element={<ContactoPage />} />
                        </Route>

                        {/* Ruta de inicio de sesión */}
                        <Route path="/login" element={<LoginPage />} />

                        {/* Ruta protegida para el panel de administración */}
                        <Route 
                            path="/admin" 
                            element={
                                <PrivateRoute>
                                    <AdminPanel />
                                </PrivateRoute>
                            } 
                        />
                    </Routes>
                </Suspense>
            </CartProvider>
        </Router>
    );
}

export default App;
