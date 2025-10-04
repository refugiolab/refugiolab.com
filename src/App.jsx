// src/App.jsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './styles/App.css';
import { NAV_LINKS } from './constants/data'; 

// Importación de componentes principales y páginas
const Layout = lazy(() => import('./components/Layout.jsx')); 
const PrivateRoute = lazy(() => import('./components/PrivateRoute.jsx')); 
const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'));
const AboutUsPage = lazy(() => import('./pages/AboutUs/AboutUsPage.jsx'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage.jsx'));
const ProductosPage = lazy(() => import('./pages/Productos/ProductosPage.jsx')); 
const ContactoPage = lazy(() => import('./pages/Contacto/ContactoPage.jsx')); 
const ImmersiveIntroPage = lazy(() => import('./pages/ImmersiveIntro/ImmersiveIntroPage.jsx'));
const CarritoPage = lazy(() => import('./pages/Carrito/CarritoPage.jsx')); 
const ProductoDetalle = lazy(() => import('./components/AdminPanel/sections/Products/ProductDetails.jsx'));
const CheckoutPage = lazy(() => import('./pages/Carrito/Checkout.jsx')); 

// Importación de componentes del Panel de Administración
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx')); 
const AdminPanel = lazy(() => import('./components/AdminPanel/AdminPanel.jsx'));
const Dashboard = lazy(() => import('./components/AdminPanel/sections/Dashboard/index.jsx'));
const ProductsSection = lazy(() => import('./components/AdminPanel/sections/Products/index.jsx'));
const Orders = lazy(() => import('./components/AdminPanel/sections/Orders/index.jsx'));
const Users = lazy(() => import('./components/AdminPanel/sections/Users/index.jsx'));
const Inventory = lazy(() => import('./components/AdminPanel/sections/Inventory/index.jsx'));
const Collections = lazy(() => import('./components/AdminPanel/sections/Collections/index.jsx'));
const Discounts = lazy(() => import('./components/AdminPanel/sections/Discounts/index.jsx'));
const Settings = lazy(() => import('./components/AdminPanel/sections/Settings/index.jsx'));
const ContactAdminPanel = lazy(() => import('./pages/Admin/Components/ContactAdminPanel.jsx'));
const NewsletterAdminPanel = lazy(() => import('./pages/Admin/Components/NewsletterAdminPanel.jsx'));


function App() {
    return (
        <Router>
            <CartProvider>
                <Suspense fallback={<div>Cargando...</div>}>
                    <Routes>
                        <Route path="/" element={<ImmersiveIntroPage />} />
                        <Route element={<Layout />}>
                            {/* Rutas del Front-end */}
                            <Route path={NAV_LINKS.home} element={<HomePage />} />
                            <Route path={NAV_LINKS.aboutUs} element={<AboutUsPage />} />
                            <Route path={NAV_LINKS.blog} element={<BlogPage />} />
                            <Route path="productos" element={<ProductosPage />} />
                            <Route path="productos/:category" element={<ProductosPage />} />
                            <Route path="producto/:id" element={<ProductoDetalle />} />
                            <Route path="carrito" element={<CarritoPage />} />
                            <Route path="checkout" element={<CheckoutPage />} />
                            <Route path={NAV_LINKS.contact} element={<ContactoPage />} />
                        </Route>

                        <Route path="/login" element={<LoginPage />} />

                        <Route
                            path="/admin"
                            element={
                                <PrivateRoute>
                                    <AdminPanel />
                                </PrivateRoute>
                            }
                        >
                            {/* Rutas anidadas para el panel de administración */}
                            <Route index element={<Dashboard />} />
                            <Route path="products/*" element={<ProductsSection />} /> {/* ¡AJUSTADO AQUÍ! */}
                            <Route path="orders" element={<Orders />} />
                            <Route path="users" element={<Users />} />
                            <Route path="contact" element={<ContactAdminPanel />} />
                            <Route path="newsletter" element={<NewsletterAdminPanel />} />
                            <Route path="inventory" element={<Inventory />} />
                            <Route path="collections" element={<Collections />} />
                            <Route path="discounts" element={<Discounts />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>

                        {/* Manejo de rutas no encontradas (404) */}
                        <Route path="*" element={<div>Página no encontrada</div>} />
                    </Routes>
                </Suspense>
            </CartProvider>
        </Router>
    );
}

export default App;