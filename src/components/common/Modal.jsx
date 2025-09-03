import React from 'react';
import './Modal.css';

const Modal = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button" aria-label="Cerrar ventana modal">
          ×
        </button>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;