import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, app } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import './AdminPanel.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaBell, FaDownload, FaTimesCircle } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPanel = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [currentPageSubscribers, setCurrentPageSubscribers] = useState(1);
    const [currentPageMessages, setCurrentPageMessages] = useState(1);
    const [itemsPerPage] = useState(10);
    
    const [editingItem, setEditingItem] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const [totalSubscribers, setTotalSubscribers] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [messagesByMonth, setMessagesByMonth] = useState({});
    const [subscribersByMonth, setSubscribersByMonth] = useState({});

    const [notificationCount, setNotificationCount] = useState(0);
    
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [downloadType, setDownloadType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleDelete = async (collectionName, id) => {
        const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar este elemento?`);
        if (confirmed) {
            try {
                const docRef = doc(db, collectionName, id);
                await deleteDoc(docRef);
                
                if (collectionName === 'newsletter_subscribers') {
                    setSubscribers(subscribers.filter(sub => sub.id !== id));
                    setTotalSubscribers(prev => prev - 1);
                } else if (collectionName === 'contact_messages') {
                    setMessages(messages.filter(msg => msg.id !== id));
                    setTotalMessages(prev => prev - 1);
                }
            } catch (err) {
                console.error("Error al eliminar el documento:", err);
                alert("Hubo un error al intentar eliminar el elemento.");
            }
        }
    };

    const handleEdit = (item, collectionName) => {
        setEditingItem({ ...item, collectionName });
        setEditFormData({ ...item });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateFormData = () => {
        if (editingItem.collectionName === 'newsletter_subscribers') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!editFormData.email || !emailRegex.test(editFormData.email)) {
                alert('Por favor, ingresa un email válido.');
                return false;
            }
        } else if (editingItem.collectionName === 'contact_messages') {
            if (!editFormData.name || !editFormData.email || !editFormData.message) {
                alert('Todos los campos (Nombre, Email, Mensaje) son obligatorios.');
                return false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(editFormData.email)) {
                alert('Por favor, ingresa un email válido.');
                return false;
            }
        }
        return true;
    };

    const handleSaveEdit = async () => {
        if (!editingItem) return;

        if (!validateFormData()) {
            return;
        }

        let dataToUpdate = {};
        if (editingItem.collectionName === 'newsletter_subscribers') {
            dataToUpdate = { email: editFormData.email };
        } else if (editingItem.collectionName === 'contact_messages') {
            dataToUpdate = {
                name: editFormData.name,
                email: editFormData.email,
                message: editFormData.message
            };
        }
        
        try {
            const docRef = doc(db, editingItem.collectionName, editingItem.id);
            await updateDoc(docRef, dataToUpdate);

            if (editingItem.collectionName === 'newsletter_subscribers') {
                setSubscribers(subscribers.map(sub => 
                    sub.id === editingItem.id ? { ...sub, ...editFormData } : sub
                ));
            } else if (editingItem.collectionName === 'contact_messages') {
                setMessages(messages.map(msg => 
                    msg.id === editingItem.id ? { ...msg, ...editFormData } : msg
                ));
            }

            setEditingItem(null);
            setEditFormData({});
            alert('Elemento actualizado correctamente.');

        } catch (err) {
            console.error("Error al actualizar el documento:", err);
            alert("Hubo un error al intentar actualizar el elemento.");
        }
    };

    const handleDownload = (data, filename) => {
        const headers = Object.keys(data[0] || {}).join(',');
        const rows = data.map(item =>
            Object.values(item).map(value => {
                if (value && value.toDate) {
                    return value.toDate().toLocaleString();
                }
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            document.body.removeChild(link);
        }
    };

    const openDownloadModal = (type) => {
        setIsDownloadModalOpen(true);
        setDownloadType(type);
    };

    const closeDownloadModal = () => {
        setIsDownloadModalOpen(false);
        setStartDate('');
        setEndDate('');
    };

    const handleFilteredDownload = () => {
        let dataToDownload = [];
        let filename = '';

        const start = startDate ? new Date(startDate).getTime() : 0;
        const end = endDate ? new Date(endDate).getTime() : Date.now();

        if (downloadType === 'subscribers') {
            dataToDownload = subscribers.filter(sub => {
                const timestamp = sub.timestamp?.toDate().getTime();
                return timestamp >= start && timestamp <= end;
            });
            filename = 'suscriptores-filtrados.csv';
        } else if (downloadType === 'messages') {
            dataToDownload = messages.filter(msg => {
                const timestamp = msg.timestamp?.toDate().getTime();
                return timestamp >= start && timestamp <= end;
            });
            filename = 'mensajes-filtrados.csv';
        }

        if (dataToDownload.length > 0) {
            handleDownload(dataToDownload, filename);
        } else {
            alert('No se encontraron datos para el rango de fechas seleccionado.');
        }

        closeDownloadModal();
    };

    const handleClearNotifications = () => {
        setNotificationCount(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener datos de suscriptores
                const subscribersQuery = query(
                    collection(db, 'newsletter_subscribers'),
                    orderBy('timestamp', 'desc')
                );
                const subscribersSnapshot = await getDocs(subscribersQuery);
                const subscribersData = subscribersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSubscribers(subscribersData);
                setTotalSubscribers(subscribersData.length);

                // Obtener datos de mensajes
                const messagesQuery = query(
                    collection(db, 'contact_messages'),
                    orderBy('timestamp', 'desc')
                );
                const messagesSnapshot = await getDocs(messagesQuery);
                const messagesData = messagesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(messagesData);
                setTotalMessages(messagesData.length);

                setNotificationCount(subscribersData.length + messagesData.length);

                const groupDataByMonth = (data) => {
                    const monthlyData = {};
                    // Corregido: Filtrar y ordenar de forma segura para evitar errores de tipo
                    const sortedData = data.filter(item => item.timestamp && item.timestamp.toDate).sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
                    sortedData.forEach(item => {
                        const date = item.timestamp.toDate();
                        const year = date.getFullYear();
                        const month = date.getMonth();
                        const monthName = new Date(year, month).toLocaleString('es-ES', { month: 'short', year: 'numeric' });
                        monthlyData[monthName] = (monthlyData[monthName] || 0) + 1;
                    });
                    return monthlyData;
                };

                setSubscribersByMonth(groupDataByMonth(subscribersData));
                setMessagesByMonth(groupDataByMonth(messagesData));

            } catch (err) {
                console.error("Error al obtener los datos:", err);
                setError("No se pudieron cargar los datos del panel de administración.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredSubscribers = subscribers.filter(sub => 
        sub && sub.email && sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMessages = messages.filter(msg => 
        msg && (msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastSubscriber = currentPageSubscribers * itemsPerPage;
    const indexOfFirstSubscriber = indexOfLastSubscriber - itemsPerPage;
    const currentSubscribers = filteredSubscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber);
    const totalPagesSubscribers = Math.ceil(filteredSubscribers.length / itemsPerPage);

    const indexOfLastMessage = currentPageMessages * itemsPerPage;
    const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
    const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
    const totalPagesMessages = Math.ceil(filteredMessages.length / itemsPerPage);

    const paginateSubscribers = (pageNumber) => setCurrentPageSubscribers(pageNumber);
    const paginateMessages = (pageNumber) => setCurrentPageMessages(pageNumber);

    const chartData = {
        labels: Object.keys(subscribersByMonth),
        datasets: [
            {
                label: 'Suscriptores',
                data: Object.values(subscribersByMonth),
                backgroundColor: '#c6cbc7',
            },
            {
                label: 'Mensajes',
                data: Object.values(messagesByMonth),
                backgroundColor: '#ad9c8a',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Crecimiento Mensual',
                color: '#444653'
            },
        },
        scales: {
            x: {
                ticks: { color: '#444653' },
            },
            y: {
                ticks: { color: '#444653' },
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return <div className="admin-panel-container">Cargando datos...</div>;
    }

    if (error) {
        return <div className="admin-panel-container">{error}</div>;
    }

    return (
        <div className="admin-panel-container">
            <header className="admin-panel-header">
                <h1>Panel de Administración</h1>
                <div className="header-actions">
                    <button className="notification-button" onClick={handleClearNotifications}>
                        <FaBell className="bell-icon" />
                        {notificationCount > 0 && (
                            <span className="notification-badge">{notificationCount}</span>
                        )}
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <section className="metrics-section">
                <div className="metric-card">
                    <h3>Suscriptores Totales</h3>
                    <p>{totalSubscribers}</p>
                </div>
                <div className="metric-card">
                    <h3>Mensajes Totales</h3>
                    <p>{totalMessages}</p>
                </div>
            </section>

            <section className="chart-section">
                <h2>Crecimiento del Sitio</h2>
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </section>
            
            <div className="search-container">
                <input 
                    type="text"
                    placeholder="Buscar por email, nombre o mensaje..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <section>
                <div className="section-header">
                    <h2>Suscriptores del Newsletter ({filteredSubscribers.length})</h2>
                    <button onClick={() => openDownloadModal('subscribers')} className="download-button">
                        <FaDownload /> Descargar CSV
                    </button>
                </div>
                {currentSubscribers.length === 0 ? (
                    <p>No hay suscriptores que coincidan con la búsqueda en esta página.</p>
                ) : (
                    <>
                        <ul>
                            {currentSubscribers.map(sub => (
                                <li key={sub.id}>
                                    <div className="item-details">
                                        <strong>Email:</strong> {sub.email} - <strong>Fecha:</strong> {sub.timestamp?.toDate().toLocaleString()}
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => handleEdit(sub, 'newsletter_subscribers')} className="edit-button">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete('newsletter_subscribers', sub.id)} className="delete-button">
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            <button 
                                onClick={() => paginateSubscribers(currentPageSubscribers - 1)}
                                disabled={currentPageSubscribers === 1}
                                className="pagination-button"
                            >
                                Anterior
                            </button>
                            <span>Página {currentPageSubscribers} de {totalPagesSubscribers}</span>
                            <button
                                onClick={() => paginateSubscribers(currentPageSubscribers + 1)}
                                disabled={currentPageSubscribers === totalPagesSubscribers}
                                className="pagination-button"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </section>

            <section>
                <div className="section-header">
                    <h2>Mensajes de Contacto ({filteredMessages.length})</h2>
                    <button onClick={() => openDownloadModal('messages')} className="download-button">
                        <FaDownload /> Descargar CSV
                    </button>
                </div>
                {currentMessages.length === 0 ? (
                    <p>No hay mensajes que coincidan con la búsqueda en esta página.</p>
                ) : (
                    <>
                        <ul>
                            {currentMessages.map(msg => (
                                <li key={msg.id}>
                                    <div className="item-details">
                                        <strong>Nombre:</strong> {msg.name} - <strong>Email:</strong> {msg.email}
                                        <br />
                                        <strong>Mensaje:</strong> {msg.message}
                                        <br />
                                        <small><strong>Fecha:</strong> {msg.timestamp?.toDate().toLocaleString()}</small>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => handleEdit(msg, 'contact_messages')} className="edit-button">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete('contact_messages', msg.id)} className="delete-button">
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            <button 
                                onClick={() => paginateMessages(currentPageMessages - 1)}
                                disabled={currentPageMessages === 1}
                                className="pagination-button"
                            >
                                Anterior
                            </button>
                            <span>Página {currentPageMessages} de {totalPagesMessages}</span>
                            <button
                                onClick={() => paginateMessages(currentPageMessages + 1)}
                                disabled={currentPageMessages === totalPagesMessages}
                                className="pagination-button"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </section>

            {editingItem && (
                <div className="edit-form-container">
                    <h3>Editar Elemento</h3>
                    {editingItem.collectionName === 'newsletter_subscribers' ? (
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editFormData.email || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name || ''}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email || ''}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Mensaje:</label>
                                <textarea
                                    name="message"
                                    value={editFormData.message || ''}
                                    onChange={handleEditChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="form-actions">
                        <button onClick={() => setEditingItem(null)} className="cancel-button">
                            Cancelar
                        </button>
                        <button onClick={handleSaveEdit} className="save-button">
                            Guardar
                        </button>
                    </div>
                </div>
            )}

            {isDownloadModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Seleccionar Rango de Fechas</h3>
                            <button onClick={closeDownloadModal} className="modal-close-button">
                                <FaTimesCircle />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="startDate">Fecha de inicio:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="date-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Fecha de fin:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="date-input"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleFilteredDownload} className="download-modal-button">
                                <FaDownload /> Exportar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;