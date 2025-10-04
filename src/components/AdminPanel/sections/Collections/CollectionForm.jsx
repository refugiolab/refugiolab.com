// src/components/AdminPanel/sections/Collections/CollectionForm.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, addDoc, collection } from 'firebase/firestore';
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

const CollectionForm = ({ collection: initialCollection, onBackToList }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        productIds: [], // array de strings
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isEditing = !!initialCollection;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                name: initialCollection.name,
                description: initialCollection.description,
                productIds: initialCollection.productIds || [],
            });
        }
    }, [initialCollection, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            if (isEditing) {
                // Actualizar un documento existente
                const collectionRef = doc(db, 'collections', initialCollection.id);
                await setDoc(collectionRef, {
                    name: formData.name,
                    description: formData.description,
                    // No se actualizan productIds aquí, esto se haría en una funcionalidad más avanzada
                }, { merge: true });
                setSuccessMessage('Colección actualizada con éxito.');
            } else {
                // Crear un nuevo documento
                const newCollectionRef = collection(db, 'collections');
                await addDoc(newCollectionRef, {
                    name: formData.name,
                    description: formData.description,
                    productIds: [], // Se inicializa como un array vacío
                    createdAt: new Date(),
                });
                setSuccessMessage('Colección creada con éxito.');
                setFormData({ name: '', description: '', productIds: [] });
            }
        } catch (error) {
            console.error("Error al guardar la colección:", error);
            setErrorMessage('Error al guardar la colección. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar Colección' : 'Añadir Nueva Colección'}</h2>
            <button onClick={onBackToList} className="back-button">← Volver a la Lista</button>
            <form onSubmit={handleSubmit} className="admin-form">
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                    {isEditing ? 'Actualizar' : 'Añadir'} Colección
                </button>
            </form>
        </div>
    );
};

export default CollectionForm;