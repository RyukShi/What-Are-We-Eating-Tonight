import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/What-Are-We-Eating-Tonight/',
  plugins: [react()],
})
