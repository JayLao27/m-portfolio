import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { OutputOptions } from 'rollup'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'postprocessing'],
          animation: ['gsap', 'locomotive-scroll'],
        },
      } satisfies OutputOptions,
    },
  },
})