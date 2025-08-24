import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const env = loadEnv("dev", process.cwd());
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: false,
    }),
    tailwindcss()
  ],
})
