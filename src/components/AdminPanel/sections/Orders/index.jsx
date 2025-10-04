// src/components/AdminPanel/sections/Orders/index.jsx
import React, { useState } from 'react';
import OrderList from './OrderList.jsx';
import OrderDetails from './OrderDetails.jsx';

const Orders = () => {
    // 'list' o 'details'
    const [view, setView] = useState('list');
    const [currentOrder, setCurrentOrder] = useState(null);

    const handleViewDetails = (order) => {
        setCurrentOrder(order);
        setView('details');
    };

    const handleBackToList = () => {
        setView('list');
    };

    return (
        <section>
            {view === 'list' && (
                <OrderList onViewDetails={handleViewDetails} />
            )}
            {view === 'details' && (
                <OrderDetails order={currentOrder} onBackToList={handleBackToList} />
            )}
        </section>
    );
};

export default Orders;