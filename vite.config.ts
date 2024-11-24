import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ tsconfigPath: resolve(__dirname, 'tsconfig.lib.json') }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // As this library will be used in projects that have React installed anyways, we can externalize this dependencies to remove the code from bundle
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js', // transpiles main bundled file to "main.js"
      },
    },
  },
});
