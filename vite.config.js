import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html']
    }
  },
  assetsInclude: ['**/*.yaml'],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  }
});
