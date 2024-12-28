import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import ViteRestart from 'vite-plugin-restart';
import svgr from 'vite-plugin-svgr';

export default ({ mode }: { mode: ConfigEnv['mode'] }) => {
  // Load environment variables from the `.env` files
  const env = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...env };

  return defineConfig({
    plugins: [
      react(),
      libInjectCss(),
      dts({ tsconfigPath: resolve(__dirname, 'tsconfig.lib.json') }),
      ViteRestart({
        restart: ['/lib/**'],
      }),
      svgr({
        svgrOptions: {
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    build: {
      copyPublicDir: false,
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
        }
      },
    },
    resolve: {
      preserveSymlinks: true,
    },
  });
};
