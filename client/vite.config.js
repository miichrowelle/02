import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Forward the original host and protocol to the backend
            proxyReq.setHeader('x-forwarded-host', req.headers['host']);
            proxyReq.setHeader('x-forwarded-proto', req.socket.encrypted ? 'https' : 'http');
          });
        },
      },
    },
    hmr: {
      clientPort: 5173,
    },
  },
})
