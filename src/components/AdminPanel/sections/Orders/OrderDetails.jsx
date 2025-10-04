// src/components/AdminPanel/sections/Orders/OrderDetails.jsx
import React from 'react';
import '../Products/Products.css'; // Corrección de la ruta de importación

const OrderDetails = ({ order, onBackToList }) => {
    if (!order) {
        return <div>Pedido no encontrado.</div>;
    }

    return (
        <div>
            <h2>Detalles del Pedido</h2>
            <button onClick={onBackToList} className="back-button">← Volver a la Lista</button>
            <div className="details-container">
                <p><strong>ID de Pedido:</strong> {order.id}</p>
                <p><strong>Estado:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.totalAmount?.toFixed(2)}</p>
                <p><strong>Fecha:</strong> {order.createdAt?.toDate().toLocaleString()}</p>

                <h3>Productos</h3>
                <ul className="order-items-list">
                    {order.items?.map((item, index) => (
                        <li key={index}>
                            {item.name} - Cantidad: {item.quantity} - Precio: ${item.price?.toFixed(2)}
                        </li>
                    ))}
                </ul>

                <h3>Información del Cliente y Envío</h3>
                <p><strong>ID de Usuario:</strong> {order.userId}</p>
                {/* Puedes añadir más detalles del usuario y de envío si los tienes en el objeto de pedido */}
                {order.shippingAddress && (
                    <div className="shipping-details">
                        <p><strong>Dirección de Envío:</strong></p>
                        <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                        <p>{order.shippingAddress.zipCode}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;