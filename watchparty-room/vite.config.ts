import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api/chat': {
          target: env.VITE_CHAT_API_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
