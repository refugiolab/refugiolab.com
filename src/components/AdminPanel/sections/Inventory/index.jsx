// src/components/AdminPanel/sections/Inventory/index.jsx
import React from 'react';
import StockList from './StockList.jsx';

const Inventory = () => {
    // Aquí podrías manejar diferentes vistas (lista, detalles, formulario de edición)
    // por ahora solo mostraremos la lista.

    return (
        <section>
            <h2>Gestión de Inventario</h2>
            <StockList />
        </section>
    );
};

export default Inventory;