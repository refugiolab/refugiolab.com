// src/components/AdminPanel/sections/Products/index.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetails from './ProductDetails';

const ProductsSection = () => {
    return (
        <div className="products-section-container">
            <Routes>
                {/* 1. La ruta principal ("/") ahora renderiza la lista de productos por defecto */}
                <Route path="/" element={<ProductList />} />
                
                {/* 2. Las rutas para el formulario de productos se definen después */}
                <Route path="new" element={<ProductForm />} />
                <Route path="edit/:id" element={<ProductForm />} />
                <Route path=":id" element={<ProductDetails />} />
            </Routes>
        </div>
    );
};

export default ProductsSection;