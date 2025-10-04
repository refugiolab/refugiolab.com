// src/components/AdminPanel/sections/Discounts/index.jsx
import React, { useState } from 'react';
import DiscountList from './DiscountList.jsx';
import DiscountForm from './DiscountForm.jsx';

const Discounts = () => {
    // 'list' o 'form'
    const [view, setView] = useState('list');
    const [currentDiscount, setCurrentDiscount] = useState(null);

    const handleViewEdit = (discount) => {
        setCurrentDiscount(discount);
        setView('form');
    };

    const handleBackToList = () => {
        setView('list');
    };

    const handleAddDiscount = () => {
        setCurrentDiscount(null); // Para un formulario vacío
        setView('form');
    };

    return (
        <section>
            {view === 'list' && (
                <DiscountList onViewEdit={handleViewEdit} onAddDiscount={handleAddDiscount} />
            )}
            {view === 'form' && (
                <DiscountForm discount={currentDiscount} onBackToList={handleBackToList} />
            )}
        </section>
    );
};

export default Discounts;