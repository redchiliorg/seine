import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

import { peerDependencies } from './package.json';

const format = process.env.FORMAT;
const dir = process.env.DIR;
const name = 'index';

export default {
  input: `src/${name}.js`,
  output: {
    file: `${dir}/${name}.${format}.js`,
    format,
    ...(format === 'umd' && {
      banner: `window.process = {env: {NODE_ENV: 'production'}};`,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'draft-js': 'Draft',
        'styled-components': 'styled',
      },
      name,
    }),
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    nodeResolve(),
    commonjs(),
    postcss({ modules: true }),
  ],
  external: Object.keys(peerDependencies),
};
