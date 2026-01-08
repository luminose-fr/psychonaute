import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' defines the public base path. 
  // Using './' ensures that all asset paths in the build output are relative, 
  // which is required for hosting in a subdirectory (like GitHub Pages).
  base: './', 
  build: {
    outDir: 'dist',
  }
});