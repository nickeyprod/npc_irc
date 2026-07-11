import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    base: '/',

    // proxy: {
    //   '/api': 'http://localhost:5003' // Node.js backend port
    // }
  }
})
