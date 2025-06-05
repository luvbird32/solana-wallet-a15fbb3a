
/**
 * @fileoverview Vitest configuration for testing React components and utilities
 * @description Configures Vitest test runner with React Testing Library integration,
 * JSDOM environment, and proper module resolution for the Solana wallet application
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * Vitest configuration object
 * @description Sets up testing environment with React support, JSDOM browser simulation,
 * path aliases matching the main Vite config, and global test utilities
 */
export default defineConfig({
  plugins: [react()],
  test: {
    /** Use JSDOM to simulate browser environment for React component testing */
    environment: 'jsdom',
    /** Automatically import testing utilities in all test files */
    globals: true,
    /** Setup file to configure testing library and global test utilities */
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    /** Path aliases matching main application configuration */
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
