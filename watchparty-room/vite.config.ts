import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/chat-service/api': {
          target: env.VITE_CHAT_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/chat-service\/api/, '/api'),
        },
        '/chat-service/socket.io': {
          target: env.VITE_CHAT_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/chat-service\/socket.io/, '/socket.io'),
        },
      },
    },
  })
}
