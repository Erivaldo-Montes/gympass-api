import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// config dos alias do paths
export default defineConfig({
  plugins: [tsconfigPaths()],
})
