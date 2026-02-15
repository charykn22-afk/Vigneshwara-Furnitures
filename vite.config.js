import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Vigneshwara-Furnitures/', // Ensures correct asset paths when deployed to GitHub Pages
})
