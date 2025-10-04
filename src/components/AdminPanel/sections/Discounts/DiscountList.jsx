// src/components/AdminPanel/sections/Discounts/DiscountList.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

const DiscountList = ({ onViewEdit, onAddDiscount }) => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDiscounts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'discounts'));
            const discountsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDiscounts(discountsList);
        } catch (error) {
            console.error("Error al obtener los descuentos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este descuento?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "discounts", id));
                alert("Descuento eliminado con éxito.");
                fetchDiscounts(); // Recargar la lista
            } catch (error) {
                console.error("Error al eliminar el descuento:", error);
                alert("Error al eliminar el descuento.");
            }
        }
    };

    if (loading) {
        return <div className="loading-message">Cargando descuentos...</div>;
    }

    return (
        <div>
            <div className="admin-actions">
                <button onClick={onAddDiscount} className="add-button">Añadir Nuevo Descuento</button>
            </div>
            {discounts.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Estado</th>
                            <th>Vencimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map(discount => (
                            <tr key={discount.id}>
                                <td>{discount.code}</td>
                                <td>{discount.type === 'percentage' ? '%' : '$'}</td>
                                <td>{discount.value}</td>
                                <td>{discount.active ? 'Activo' : 'Inactivo'}</td>
                                <td>{discount.expiresAt?.toDate().toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => onViewEdit(discount)} className="table-button edit">Editar</button>
                                    <button onClick={() => handleDelete(discount.id)} className="table-button delete">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay descuentos registrados aún.</p>
                </div>
            )}
        </div>
    );
};

export default DiscountList;