import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7890",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:7890",
        ws: true, 
      },
    },
  },
})
