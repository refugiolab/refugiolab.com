// src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Importa las instancias de Firebase que necesitas, ya inicializadas
import { app } from './firebaseConfig.js';

// No es necesario inicializar Firebase aquí de nuevo, ya lo hace firebaseConfig.js
// initializeApp(app);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);