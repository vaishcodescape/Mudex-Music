import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // This will automatically import React in all files
      include: "**/*.{jsx,tsx}",
      // Add proper HMR
      fastRefresh: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true, // Expose to all network interfaces
    port: 3001,
    strictPort: false, // Allow fallback to another port if 3001 is in use
    // Handle history API fallback for SPA routing
    historyApiFallback: true,
  },
  preview: {
    port: 3001,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', 'gsap'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'gsap',
    ],
  },
})
