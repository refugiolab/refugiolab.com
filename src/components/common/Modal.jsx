// Archivo: C:\universo-refugio\src\components\common\Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button" aria-label="Cerrar ventana modal">
          ×
        </button>
        {title && <h3 className="modal-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;