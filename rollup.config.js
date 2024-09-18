import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';

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
    css({
      output: 'bundle.css'
    }),
    resolve({
      browser: true,
      dedupe: ['svelte', 'flowbite-svelte']
    }),
    commonjs(),
    terser()
  ]
};