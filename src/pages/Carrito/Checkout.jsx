// src/pages/Carrito/Checkout.jsx
import React from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

// Reemplaza 'TU_PUBLIC_KEY' con tu clave pública de Mercado Pago.
// Esto sigue siendo seguro porque la clave pública no se usa para crear pagos.
initMercadoPago('TU_PUBLIC_KEY', {
  locale: 'es-AR', 
});

const Checkout = ({ cart }) => {
  const processPayment = async () => {
    try {
      // Envía el carrito directamente a tu servidor backend
      const response = await fetch('http://localhost:3001/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Se envía el carrito entero, el backend se encarga del resto
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Redirige al usuario a la URL de pago que te devolvió el backend
        window.location.href = data.init_point;
      } else {
        throw new Error(data.error || 'Error al crear la preferencia de pago');
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      alert('Hubo un error al procesar tu pago. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="checkout-container">
      <button onClick={processPayment} className="checkout-btn">
        Pagar con Mercado Pago
      </button>
    </div>
  );
};

export default Checkout;