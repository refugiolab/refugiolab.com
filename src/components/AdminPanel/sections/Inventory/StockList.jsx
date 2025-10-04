// src/components/AdminPanel/sections/Inventory/StockList.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import '../Products/Products.css'; // Reutilizamos los estilos

// Inicializar Firebase (si no se ha hecho ya)
let app;
if (getApps().length === 0) {
  const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

const StockList = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'inventory'));
                const itemsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setInventoryItems(itemsList);
            } catch (error) {
                console.error("Error al obtener el inventario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando inventario...</div>;
    }

    return (
        <div>
            {inventoryItems.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID de Producto</th>
                            <th>Variantes y Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.productId}</td>
                                <td>
                                    <ul>
                                        {item.variants?.map((variant, index) => (
                                            <li key={index}>
                                                Color: {variant.color}, Talla: {variant.size}, Stock: {variant.stock}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay inventario registrado aún.</p>
                </div>
            )}
        </div>
    );
};

export default StockList;