// src/components/AdminPanel/sections/Products/ProductDetails.jsx
import React from 'react';
import './Products.css'; // Asegúrate de que esta línea esté presente

const ProductDetails = ({ product, onBackToList, onEditProduct }) => {
    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    return (
        <div>
            <h2>Detalles del Producto</h2>
            <button onClick={onBackToList} className="back-button">← Volver a la Lista</button>
            <div className="details-container">
                <p><strong>Nombre:</strong> {product.name}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                {/* Agrega más detalles si es necesario */}
            </div>
            <button onClick={() => onEditProduct(product)} className="edit-button">Editar</button>
        </div>
    );
};

export default ProductDetails;