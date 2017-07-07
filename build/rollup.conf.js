import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';


export default {
  entry: 'src/index.js',
  plugins: [
    nodeResolve(),
    babel(),
  ],
  targets: [
    {
      format: 'umd',
      moduleName: 'VueMask',
      dest: 'dist/v-mask.js',
    },
    {
      format: 'es',
      dest: 'dist/v-mask.esm.js',
    },
  ],
}
