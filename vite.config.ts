
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/wallet_address_validator.ts'),
      name: 'WAValidator',
      formats: ['es', 'cjs'],
      fileName: (format) => `wallet-address-validator.${format === 'es' ? 'esm' : 'cjs'}.js`
    },
    rollupOptions: {
      external: ['node:crypto', 'crypto', 'base-x', 'cbor-js', 'crc', 'js-sha3', 'js-sha512', 'jssha', '@scure/base'],
      output: {
        globals: {
          'node:crypto': 'crypto',
          'crypto': 'crypto',
          'base-x': 'baseX',
          'cbor-js': 'cbor',
          'crc': 'crc',
          'js-sha3': 'sha3',
          'js-sha512': 'sha512',
          'jssha': 'jsSHA',
          '@scure/base': 'scureBase'
        }
      }
    },
    target: 'ES2020'
  },
  plugins: [visualizer()],
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/', 'dist/']
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
});
