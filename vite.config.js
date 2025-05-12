/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';
import { resolve } from 'path';

const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  base: '/',
  plugins: [
    env({
      prefix: 'VITE',
      mountedPath: 'import.meta.env',
    }),
  ],
  root: 'src',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'qrWidget',
      fileName: 'qr-widget',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
