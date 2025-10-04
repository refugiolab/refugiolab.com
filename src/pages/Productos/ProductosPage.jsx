// src/pages/Productos/ProductosPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useProductos from '../../hooks/useProductos.js';
import { useCart } from '../../context/CartContext.jsx';
import './ProductosPage.css';

const ProductosPage = () => {
    const { category } = useParams();
    const { productos, loading, error } = useProductos();
    const { addToCart } = useCart();

    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const filteredProductos = category 
      ? productos.filter(p => p.category?.toLowerCase().includes(category.toLowerCase())) 
      : productos;

    return (
        <div className="productos-page">
            <h1 className="productos-page-title">{category ? category.toUpperCase() : "TODOS LOS PRODUCTOS"}</h1>
            <div className="productos-list">
                {filteredProductos.map(producto => (
                    // Se usa <Link> para navegar a la página de detalles
                    <div key={producto.id} className="producto-card">
                        <Link to={`/producto/${producto.id}`}>
                            <img src={producto.images[0]} alt={producto.name} className="producto-image" />
                        </Link>
                        <div className="product-info">
                            <h2 className="producto-name">{producto.name}</h2>
                            <p className="producto-description">
                                {producto.description}
                            </p>
                            <div className="product-footer">
                                <p className="producto-price">
                                    {producto.isPriceFixed ? `$${producto.price}` : producto.price}
                                </p>
                                <button 
                                    onClick={() => addToCart(producto)} 
                                    className="add-to-cart-btn"
                                >
                                    <FaShoppingCart /> Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosPage;