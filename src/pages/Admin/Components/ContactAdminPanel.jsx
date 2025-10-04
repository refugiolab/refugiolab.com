import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getApps, getApp, initializeApp } from 'firebase/app';
import './ContactAdminPanel.css';

// Aseguramos que la instancia de Firebase exista.
let app;
if (getApps().length === 0) {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}
const db = getFirestore(app);

const ContactAdminPanel = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const q = query(collection(db, 'contact_messages'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const messagesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(messagesList);
            } catch (err) {
                console.error("Error al obtener mensajes de contacto:", err);
                setError("No se pudieron cargar los mensajes. Intente de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando mensajes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="admin-panel-container">
            <h2 className="admin-panel-title">✉️ Mensajes de Contacto</h2>
            <p className="admin-panel-subtitle">
                Todos los mensajes enviados a través del formulario de contacto.
            </p>

            {messages.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Mensaje</th>
                            <th>Fecha de Envío</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.id}>
                                <td>{msg.nombre}</td>
                                <td>{msg.email}</td>
                                <td>{msg.mensaje}</td>
                                <td>{msg.timestamp.toDate().toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay mensajes de contacto registrados aún.</p>
                </div>
            )}
        </div>
    );
};

export default ContactAdminPanel;