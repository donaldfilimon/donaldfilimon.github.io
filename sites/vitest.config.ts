import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      { find: 'next/link', replacement: fileURLToPath(new URL('./test/next-link.tsx', import.meta.url)) },
      { find: 'next/navigation', replacement: fileURLToPath(new URL('./test/next-navigation.ts', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./', import.meta.url)) },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
});
