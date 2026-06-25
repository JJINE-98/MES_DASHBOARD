import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MES_DASHBOARD/',
  plugins: [react()],
})
