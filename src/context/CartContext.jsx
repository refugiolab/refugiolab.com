// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Crea el contexto para el carrito.
export const CartContext = createContext();

// Crea el proveedor de contexto que envolverá a la aplicación.
export const CartProvider = ({ children }) => {
    // Usamos el estado local para el contador de artículos del carrito.
    const [itemCount, setItemCount] = useState(0); 

    // Aquí irá la lógica para agregar, remover, etc.
    const addToCart = () => {
        setItemCount(prevCount => prevCount + 1);
    };

    const removeFromCart = () => {
        setItemCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    // Puedes agregar lógica para cargar el estado del carrito desde
    // el almacenamiento local o Firestore si lo deseas.
    useEffect(() => {
        // Ejemplo: Lógica para cargar el estado inicial del carrito.
    }, []);

    return (
        // El proveedor hace que 'itemCount' y las funciones estén disponibles
        // para cualquier componente hijo que lo consuma.
        <CartContext.Provider value={{ itemCount, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
