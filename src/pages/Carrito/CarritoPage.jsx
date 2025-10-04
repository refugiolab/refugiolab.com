// src/pages/Carrito/CarritoPage.jsx

import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './CarritoPage.css';
import Checkout from './Checkout';

const CarritoPage = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page-empty">
        <h2 className="cart-title">Tu carrito está vacío.</h2>
        <p>¡Explora nuestra tienda para encontrar productos que te nutran!</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Mi Carrito</h2>
      <div className="cart-items-container">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.images[0]} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-description">{item.description}</p>
              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button onClick={() => decrementQuantity(item.id)} className="quantity-btn">
                    <FaMinus />
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)} className="quantity-btn">
                    <FaPlus />
                  </button>
                </div>
                <span className="cart-item-price">
                  {item.isPriceFixed ? `$${(parseFloat(item.price) * item.quantity).toFixed(2)}` : item.price}
                </span>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-summary-total">
          <p>Total:</p>
          <p>${cartTotal.toFixed(2)}</p>
        </div>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">Vaciar Carrito</button>
          <Checkout cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;