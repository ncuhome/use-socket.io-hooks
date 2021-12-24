import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
  }
})
