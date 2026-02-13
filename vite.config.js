import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Enable minification with esbuild (faster and built-in)
    minify: 'esbuild',
    
    // ESBuild options
    esbuild: {
      drop: ['console', 'debugger'], // Remove console logs and debuggers in production
    },
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true, // Enable CSS code splitting
    
    // Source maps for production debugging (optional)
    sourcemap: false,
    
    // Target modern browsers for smaller bundles
    target: 'es2015',
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
  },
})
