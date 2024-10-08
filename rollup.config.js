import copy from 'rollup-plugin-copy';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  input: './src/bundle.js',
  output: {
    file: 'bundle/easydb.js',
    format: 'iife',
    name: 'EasyDBDetailView',
    inlineDynamicImports: true
  },
  plugins: [
    copy({
      targets: [
        {
          src: 'public/pregen/*',
          dest: 'bundle/pregen'
        }
      ]
    }),
    svelte({
      emitCss: false,
      preprocess: sveltePreprocess({
        postcss: true, // Use PostCSS to process TailwindCSS
      }),
      compilerOptions: {
        customElement: true
      }
    }),
    postcss({
      extract: "easydb.css"
    }),
    resolve({
      browser: true,
      dedupe: ['svelte', 'flowbite-svelte']
    }),
    commonjs(),
    terser()
  ]
};