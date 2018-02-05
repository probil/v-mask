import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';


export default {
  input: 'src/index.js',
  plugins: [
    nodeResolve(),
    babel(),
  ],
  output: [
    {
      format: 'umd',
      name: 'VueMask',
      exports: 'named',
      file: 'dist/v-mask.js',
    },
    {
      format: 'es',
      file: 'dist/v-mask.esm.js',
    },
  ],
}
