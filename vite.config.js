import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <--- NUEVA LÍNEA

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ Esta configuración es fundamental para el despliegue
  base: '/',
  resolve: { // <--- NUEVA SECCIÓN
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})