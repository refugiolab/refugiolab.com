// src/components/AdminPanel/sections/Discounts/DiscountForm.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

const DiscountForm = ({ discount: initialDiscount, onBackToList }) => {
    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: 0,
        expiresAt: '',
        active: true,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isEditing = !!initialDiscount;

    useEffect(() => {
        if (isEditing) {
            const expiryDate = initialDiscount.expiresAt ? initialDiscount.expiresAt.toDate() : new Date();
            setFormData({
                code: initialDiscount.code,
                type: initialDiscount.type,
                value: initialDiscount.value,
                expiresAt: expiryDate.toISOString().split('T')[0],
                active: initialDiscount.active,
            });
        }
    }, [initialDiscount, isEditing]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const expiresAtDate = new Date(formData.expiresAt);
            if (isNaN(expiresAtDate.getTime())) {
                setErrorMessage('La fecha de vencimiento no es válida.');
                return;
            }

            const discountData = {
                code: formData.code.toUpperCase(),
                type: formData.type,
                value: Number(formData.value),
                expiresAt: expiresAtDate,
                active: formData.active,
            };

            const discountRef = doc(db, 'discounts', discountData.code);
            await setDoc(discountRef, discountData);
            
            setSuccessMessage(`Descuento ${isEditing ? 'actualizado' : 'creado'} con éxito.`);
            if (!isEditing) {
                setFormData({ code: '', type: 'percentage', value: 0, expiresAt: '', active: true });
            }

        } catch (error) {
            console.error("Error al guardar el descuento:", error);
            setErrorMessage('Error al guardar el descuento. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar Descuento' : 'Añadir Nuevo Descuento'}</h2>
            <button onClick={onBackToList} className="back-button">← Volver a la Lista</button>
            <form onSubmit={handleSubmit} className="admin-form">
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div className="form-group">
                    <label htmlFor="code">Código de Descuento:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        disabled={isEditing}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Tipo:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="percentage">Porcentaje (%)</option>
                        <option value="fixed">Cantidad Fija ($)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="value">Valor:</label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiresAt">Fecha de Vencimiento:</label>
                    <input
                        type="date"
                        id="expiresAt"
                        name="expiresAt"
                        value={formData.expiresAt}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="active">Activo:</label>
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                    />
                </div>
                
                <button type="submit" className="submit-button">
                    {isEditing ? 'Actualizar' : 'Añadir'} Descuento
                </button>
            </form>
        </div>
    );
};

export default DiscountForm;