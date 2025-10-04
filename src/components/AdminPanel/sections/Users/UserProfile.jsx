// src/components/AdminPanel/sections/Users/UserProfile.jsx
import React from 'react';
import '../Products/Products.css'; // Reutilizamos los estilos

const UserProfile = ({ user, onBackToList }) => {
    if (!user) {
        return <div>Usuario no encontrado.</div>;
    }

    return (
        <div>
            <h2>Detalles del Usuario</h2>
            <button onClick={onBackToList} className="back-button">← Volver a la Lista</button>
            <div className="details-container">
                <p><strong>ID de Usuario:</strong> {user.id}</p>
                <p><strong>Nombre:</strong> {user.displayName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
                <p><strong>Fecha de Registro:</strong> {user.createdAt?.toDate().toLocaleString()}</p>
            </div>
        </div>
    );
};

export default UserProfile;