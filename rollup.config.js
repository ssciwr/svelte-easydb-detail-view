import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  input: './src/bundle.js',
  output: {
    file: 'bundle/bundle.js',
    format: 'iife',
    name: 'EasyDBDetailView',
    inlineDynamicImports: true
  },
  plugins: [
    svelte({
      emitCss: true,
      preprocess: sveltePreprocess({
        postcss: true, // Use PostCSS to process TailwindCSS
      }),
      compilerOptions: {
        customElement: true
      }
    }),
    replace({
      values: {
        "this.attachShadow({ mode: 'open' });": ""
      },
      delimiters: ['', '']
    }),
    postcss(),
    resolve({
      browser: true,
      dedupe: ['svelte', 'flowbite-svelte']
    }),
    commonjs(),
    terser()
  ]
};