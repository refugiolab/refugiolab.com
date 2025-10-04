// src/components/AdminPanel/sections/Collections/index.jsx
import React, { useState } from 'react';
import CollectionList from './CollectionList.jsx';
import CollectionForm from './CollectionForm.jsx';

const Collections = () => {
    // 'list' o 'form'
    const [view, setView] = useState('list');
    const [currentCollection, setCurrentCollection] = useState(null);

    const handleViewEdit = (collection) => {
        setCurrentCollection(collection);
        setView('form');
    };

    const handleBackToList = () => {
        setView('list');
    };

    const handleAddCollection = () => {
        setCurrentCollection(null); // Para un formulario vacío
        setView('form');
    };

    return (
        <section>
            {view === 'list' && (
                <CollectionList onViewEdit={handleViewEdit} onAddCollection={handleAddCollection} />
            )}
            {view === 'form' && (
                <CollectionForm collection={currentCollection} onBackToList={handleBackToList} />
            )}
        </section>
    );
};

export default Collections;