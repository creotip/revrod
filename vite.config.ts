/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }), tsconfigPaths()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {},
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    setupFiles: './src/tests/setup.ts',
  },
})
