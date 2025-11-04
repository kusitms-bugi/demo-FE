import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: 'src/renderer',
  plugins: [
    svgr({
      // svgr 옵션: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        icon: false,
        dimensions: false,
        expandProps: 'end',
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  removeDimensions: true,
                },
              },
            },
          ],
        },
        titleProp: true,
        typescript: true,
      },
      esbuildOptions: {
        jsx: 'automatic',
      },
      include: '**/*.svg?react',
      exclude: '',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ui/': path.resolve(__dirname, 'src/renderer/src/components') + '/',
      '@ui': path.resolve(__dirname, 'src/renderer/src/components'),
      '@assets/': path.resolve(__dirname, 'src/renderer/src/assets') + '/',
      '@assets': path.resolve(__dirname, 'src/renderer/src/assets'),
      ui: path.resolve(__dirname, 'src/renderer/src/components'),
    },
  },
  server: {
    port: 3000,
    host: 'localhost',
  },
  build: {
    outDir: '../dist/renderer',
    sourcemap: true,
    emptyOutDir: true,
  },
});
