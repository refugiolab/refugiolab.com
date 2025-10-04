// src/components/AdminPanel/sections/Orders/OrderList.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import '../Products/Products.css'; // Corrección de la ruta de importación

// Inicializar Firebase (si no se ha hecho ya)
let app;
if (getApps().length === 0) {
  const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

const OrderList = ({ onViewDetails }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Obtiene los pedidos ordenados por fecha de creación
                const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const ordersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(ordersList);
            } catch (error) {
                console.error("Error al obtener pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando pedidos...</div>;
    }

    return (
        <div>
            <h2>Gestión de Pedidos</h2>
            {orders.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID de Pedido</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.createdAt?.toDate().toLocaleDateString()}</td>
                                <td>{order.status}</td>
                                <td>${order.totalAmount?.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => onViewDetails(order)} className="table-button view">Ver Detalles</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay pedidos registrados aún.</p>
                </div>
            )}
        </div>
    );
};

export default OrderList;