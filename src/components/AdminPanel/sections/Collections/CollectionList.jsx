// src/components/AdminPanel/sections/Collections/CollectionList.jsx
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

const CollectionList = ({ onViewEdit, onAddCollection }) => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'collections'));
            const collectionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCollections(collectionsList);
        } catch (error) {
            console.error("Error al obtener las colecciones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta colección?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "collections", id));
                alert("Colección eliminada con éxito.");
                fetchCollections(); // Recargar la lista
            } catch (error) {
                console.error("Error al eliminar la colección:", error);
                alert("Error al eliminar la colección.");
            }
        }
    };

    if (loading) {
        return <div className="loading-message">Cargando colecciones...</div>;
    }

    return (
        <div>
            <div className="admin-actions">
                <button onClick={onAddCollection} className="add-button">Añadir Nueva Colección</button>
            </div>
            {collections.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Productos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections.map(collection => (
                            <tr key={collection.id}>
                                <td>{collection.name}</td>
                                <td>{collection.description}</td>
                                <td>{collection.productIds?.length}</td>
                                <td>
                                    <button onClick={() => onViewEdit(collection)} className="table-button edit">Editar</button>
                                    <button onClick={() => handleDelete(collection.id)} className="table-button delete">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay colecciones de productos registradas aún.</p>
                </div>
            )}
        </div>
    );
};

export default CollectionList;