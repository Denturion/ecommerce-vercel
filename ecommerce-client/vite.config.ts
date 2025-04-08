import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct asset loading in production
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 KB (1MB)
  },
})