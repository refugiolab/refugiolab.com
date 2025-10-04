// src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Importa las instancias de Firebase que necesitas, ya inicializadas
import { app } from './firebaseConfig.js';
import { CartProvider } from './context/CartContext.jsx'; // 👈 Importa CartProvider

// No es necesario inicializar Firebase aquí de nuevo, ya lo hace firebaseConfig.js
// initializeApp(app);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* 👈 Envuelve el componente App con CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);