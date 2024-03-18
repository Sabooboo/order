import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        configure: (proxy) => {
          // Log the proxy requests
          // proxy.on('proxyReq', (proxyReq, req, res, options) => {
          //   console.log(options.target);
          //   console.log(`Proxying request: ${req.method} ${req.url} -> ${options.target.href}${req.url}`);
          // });
        }
      }
    }
  }
})
