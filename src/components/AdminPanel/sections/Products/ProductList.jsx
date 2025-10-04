// src/components/AdminPanel/sections/Products/ProductList.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductos from '../../../../hooks/useProductos';
import useFirestore from '../../../../hooks/useFirestore';
import { storage } from '../../../../firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
import { FaEdit, FaTrash, FaPlus, FaSpinner } from 'react-icons/fa';
import './Products.css'; // Mantenemos el mismo archivo CSS para los estilos generales de la sección
import './ProductList.css'; // Nuevo archivo CSS específico para la tabla

const ProductList = () => {
    const { productos, loading, error } = useProductos();
    const { deleteDocument, loading: isDeleting } = useFirestore('products');
    
    const navigate = useNavigate();
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleCreateClick = () => {
        navigate('/admin/products/new');
    };

    const handleEditClick = (productId) => {
        navigate(`/admin/products/edit/${productId}`);
    };

    const handleDeleteClick = async (productId, productImages) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
            setDeletingProductId(productId);
            try {
                if (productImages && productImages.length > 0) {
                    for (const imageUrl of productImages) {
                        const imageRef = ref(storage, imageUrl);
                        await deleteObject(imageRef);
                    }
                }
                
                const success = await deleteDocument(productId);
                if (success) {
                    setDeleteSuccess(true);
                    setTimeout(() => setDeleteSuccess(false), 2000);
                }
            } catch (err) {
                console.error("Error al eliminar el producto:", err);
                alert(`Error al eliminar el producto: ${err.message}.`);
            } finally {
                setDeletingProductId(null);
            }
        }
    };

    if (loading) {
        return <div className="loading-message">Cargando productos...</div>;
    }
    
    if (error) {
        return <div className="error-message">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</div>;
    }

    return (
        <div className="products-list-container">
            <div className="products-header">
                <h2 className="admin-panel-title">Gestión de Productos</h2>
                <button
                    onClick={handleCreateClick}
                    className="action-button primary-button"
                >
                    <FaPlus /> Crear Nuevo Producto
                </button>
            </div>
            
            {(isDeleting || deleteSuccess) && (
                <div className="status-message">
                    {isDeleting && (
                        <div className="deleting-message">
                            <FaSpinner className="spinner" /> Eliminando producto...
                        </div>
                    )}
                    {deleteSuccess && (
                        <div className="success-message">
                            ¡Producto eliminado con éxito!
                        </div>
                    )}
                </div>
            )}

            {productos.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>
                                    {producto.images && producto.images.length > 0 && (
                                        <img src={producto.images[0]} alt={producto.name} className="product-image-list" />
                                    )}
                                </td>
                                <td>{producto.name}</td>
                                <td>{producto.category}</td>
                                <td>
                                    {producto.isPriceConsultable
                                        ? <span className="price-text">{producto.priceDescription}</span>
                                        : `$${producto.price}`
                                    }
                                </td>
                                <td>{producto.stock}</td>
                                <td className="action-buttons-cell">
                                    <button
                                        onClick={() => handleEditClick(producto.id)}
                                        className="table-button edit"
                                        disabled={isDeleting && deletingProductId === producto.id}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(producto.id, producto.images)}
                                        className="table-button delete"
                                        disabled={isDeleting && deletingProductId === producto.id}
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay productos registrados aún. ¡Crea el primero!</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;