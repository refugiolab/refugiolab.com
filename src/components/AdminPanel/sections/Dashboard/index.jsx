// src/components/AdminPanel/sections/Dashboard/index.jsx
import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';

// Inicializar Firebase (si no se ha hecho ya)
let app;
if (getApps().length === 0) {
  const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

const Dashboard = () => {
    const [counts, setCounts] = useState({ products: 0, orders: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                const usersSnapshot = await getDocs(collection(db, 'users'));

                setCounts({
                    products: productsSnapshot.size,
                    orders: ordersSnapshot.size,
                    users: usersSnapshot.size,
                });
            } catch (error) {
                console.error("Error al obtener datos del dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando datos del dashboard...</div>;
    }

    return (
        <section className="dashboard-section">
            <div className="summary-cards-container">
                <div className="summary-card">
                    <FaShoppingCart className="card-icon" />
                    <div className="card-content">
                        <h3>Total de Productos</h3>
                        <p className="card-number">{counts.products}</p>
                    </div>
                </div>
                <div className="summary-card">
                    <FaDollarSign className="card-icon" />
                    <div className="card-content">
                        <h3>Pedidos Recientes</h3>
                        <p className="card-number">{counts.orders}</p>
                    </div>
                </div>
                <div className="summary-card">
                    <FaUsers className="card-icon" />
                    <div className="card-content">
                        <h3>Usuarios Registrados</h3>
                        <p className="card-number">{counts.users}</p>
                    </div>
                </div>
            </div>
            {/* Aquí puedes añadir gráficos, listas de actividad reciente, etc. */}
            <div className="recent-activity">
                <h3>Actividad Reciente</h3>
                <p>Lista de últimos pedidos o mensajes.</p>
            </div>
        </section>
    );
};

export default Dashboard;