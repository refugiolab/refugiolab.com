import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // ¡Esta línea DEBE estar eliminada o comentada!
import './App.css' // Asegúrate de que App.css esté importado para tus estilos globales
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
