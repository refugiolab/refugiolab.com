// src/components/common/CartModal.jsx
import React from 'react';
import Modal from './Modal';
import CarritoPage from '../../pages/Carrito/CarritoPage';

const CartModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <CarritoPage />
    </Modal>
  );
};

export default CartModal;