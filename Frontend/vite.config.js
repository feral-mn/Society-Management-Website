import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // only if you're using React
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),      // keep if you're using React
    tailwindcss(),
  ],
})
