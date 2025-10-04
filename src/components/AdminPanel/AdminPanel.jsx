// src/components/AdminPanel/AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaTachometerAlt, FaShoppingCart, FaUsers, FaEnvelope, FaNewspaper, FaBoxes, FaTags, FaDollarSign, FaHome, FaCog } from 'react-icons/fa';
import './AdminPanel.css';
import logorefugiogris from '/icons/logorefugiogris.svg';

const NAV_LINKS = [
    { title: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
    { title: 'Productos', path: '/admin/products', icon: <FaShoppingCart /> },
    { title: 'Pedidos', path: '/admin/orders', icon: <FaDollarSign /> },
    { title: 'Usuarios', path: '/admin/users', icon: <FaUsers /> },
    { title: 'Inventario', path: '/admin/inventory', icon: <FaBoxes /> },
    { title: 'Colecciones', path: '/admin/collections', icon: <FaTags /> },
    { title: 'Descuentos', path: '/admin/discounts', icon: <FaDollarSign /> },
    { title: 'Contacto', path: '/admin/contact', icon: <FaEnvelope /> },
    { title: 'Newsletter', path: '/admin/newsletter', icon: <FaNewspaper /> },
    { title: 'Configuración', path: '/admin/settings', icon: <FaCog /> },
];

const AdminPanel = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate('/login');
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="admin-panel-container">
            <nav className="admin-panel-nav">
                <div className="nav-header">
                    <img src={logorefugiogris} alt="Logo" className="nav-logo" />
                </div>
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`nav-link ${location.pathname === link.path || (link.path === '/admin/products' && (location.pathname.startsWith('/admin/products/new') || location.pathname.startsWith('/admin/products/edit'))) ? 'active' : ''}`}
                    >
                        {link.icon}
                        <span>{link.title}</span>
                    </Link>
                ))}
            </nav>
            <div className="admin-content-wrapper">
                <header className="admin-panel-header">
                    <div className="header-actions">
                        <button className="notification-button">
                            <FaBell className="bell-icon" />
                            <span className="notification-badge">3</span>
                        </button>
                        <button onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt />
                        </button>
                    </div>
                </header>
                <main className="admin-panel-main-content">
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;