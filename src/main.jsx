import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // ¡Esta línea DEBE estar eliminada o comentada!
import './styles/App.css' // Ruta de importación actualizada
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)