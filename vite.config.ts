import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ tsconfigPath: resolve(__dirname, 'tsconfig.lib.json') }),
    svgr({
      // svgr options
      svgrOptions: {
        ref: true, // Allows forwarding refs
        svgo: false, // Disables SVGO optimization
        titleProp: true, // Enables the `title` prop for accessibility
      },
      include: '**/*.svg', // Targets all SVG files
    }),
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
