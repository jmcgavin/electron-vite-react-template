import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
// eslint-disable-next-line import/no-unresolved
import electron from 'vite-plugin-electron/simple'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'src/main/main.ts',
      },
      preload: {
        input: path.join(__dirname, 'src/main/preload.ts'),
      },
      // Polyfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer:
        process.env.NODE_ENV === 'test'
          ? undefined // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
          : {},
    }),
  ],
})
