import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

import { componentSizeChecker } from './customPlugins/componentSizeChecker';

const srcPath = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
    componentSizeChecker({
      include: ['src/pages', 'src/components'],
      maxLines: 200,
      maxSizeKb: 40,
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: 'vite.setup.js',
  },
  resolve: {
    alias: {
      src: srcPath,
      '/assets': path.resolve(srcPath, 'assets'),
    },
  },
  server: {
    port: 3000,
  },
});
