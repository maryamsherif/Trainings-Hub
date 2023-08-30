import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      // dev specific config
    }
  } else if(command === 'build'){
    return {
      plugins: [react()],
      base:"/_VOIS-Internship/"
    }
  }
})