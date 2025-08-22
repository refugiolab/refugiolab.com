import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Agrega esta línea para corregir las rutas de tus archivos.
  // Esto soluciona el error 'MIME type' y los errores 404 en la carga de módulos.
  base: './',
})