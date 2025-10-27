import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DenoAIToolkitUI',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@tanstack/react-query',
        'react-router-dom',
        '@headlessui/react',
        'class-variance-authority',
        'clsx',
        'react-dropzone',
        'react-hook-form'
      ],
      output: {
        // Global variable names for UMD build (if needed)
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@tanstack/react-query': 'ReactQuery',
          'react-router-dom': 'ReactRouterDOM'
        },
        // Preserve original module structure for better tree-shaking
        preserveModules: false,
        // Asset file names
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name || '';
        }
      }
    },
    // Generate source maps for better debugging
    sourcemap: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
