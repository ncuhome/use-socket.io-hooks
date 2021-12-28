import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    minify: false,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
  }
})
