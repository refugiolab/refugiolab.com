import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getApps, getApp, initializeApp } from 'firebase/app';
import './NewsletterAdminPanel.css';

// Las variables de configuración de Firebase ya están globalmente definidas en el entorno.
// Sin embargo, por robustez, podemos asegurarnos de que el app exista.
let app;
if (getApps().length === 0) {
    // En un entorno de desarrollo, podrías necesitar una configuración aquí.
    // Pero para un entorno de producción, las variables deberían estar disponibles.
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}
const db = getFirestore(app);

const NewsletterAdminPanel = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const q = query(collection(db, 'newsletter_subscribers'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const subscribersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSubscribers(subscribersList);
            } catch (err) {
                console.error("Error al obtener suscriptores:", err);
                setError("No se pudieron cargar los suscriptores. Intente de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando suscriptores...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="admin-panel-container">
            <h2 className="admin-panel-title">👥 Suscriptores del Newsletter</h2>
            <p className="admin-panel-subtitle">
                Lista completa de las personas que se han sumado a tu comunidad.
            </p>

            {subscribers.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Fecha de Suscripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((sub) => (
                            <tr key={sub.id}>
                                <td>{sub.name || 'No especificado'}</td>
                                <td>{sub.email}</td>
                                <td>{sub.timestamp.toDate().toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    <p>No hay suscriptores registrados aún.</p>
                </div>
            )}
        </div>
    );
};

export default NewsletterAdminPanel;