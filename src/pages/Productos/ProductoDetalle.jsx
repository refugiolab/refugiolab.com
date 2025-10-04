// src/pages/Productos/ProductoDetalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useCart } from '../../context/CartContext.jsx';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import './ProductoDetalle.css';

const ProductoDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Producto no encontrado.');
                }
            } catch (err) {
                console.error('Error al obtener el producto:', err);
                setError('Error al cargar el producto.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) {
        return <div className="loading">Cargando producto...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!producto) {
        return <div className="no-product">El producto no está disponible.</div>;
    }

    return (
        <div className="product-detail-page">
            <button onClick={() => navigate(-1)} className="back-button">
                <FaArrowLeft /> Volver
            </button>
            <div className="product-container">
                <div className="product-images">
                    <img src={producto.images[0]} alt={producto.name} className="main-image" />
                </div>
                <div className="product-info-details">
                    <h1 className="product-name">{producto.name}</h1>
                    <p className="product-price">
                        {producto.isPriceFixed ? `$${producto.price}` : producto.price}
                    </p>
                    <p className="product-description">{producto.description}</p>
                    <button 
                        onClick={() => addToCart(producto)} 
                        className="add-to-cart-button"
                    >
                        <FaShoppingCart /> Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;