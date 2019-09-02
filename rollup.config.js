import path from 'path';
import minimist from 'minimist';
import { commandAliases } from 'rollup/dist/shared';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import flowEntry from 'rollup-plugin-flow-entry';

const { format = 'cjs', name = 'index', external = '' } = minimist(
  process.argv.slice(2),
  {
    alias: commandAliases,
  }
);
const { dependencies = {}, peerDependencies = {} } = require('./package.json');

export default {
  input: path.join('src', `${name}.js`),
  output: {
    file: path.join('lib', format, `${name}.js`),
    format,
    ...(format === 'umd' && {
      name,
      banner: `window.process = {env: {NODE_ENV: 'production'}};`,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'draft-js': 'Draft',
        'styled-components': 'styled',
        crypto: 'crypto',
      },
    }),
  },
  plugins: [
    flowEntry(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    nodeResolve({
      preferBuiltins: true,
    }),
    postcss({ modules: true }),
  ],
  external: [
    ...Object.keys(peerDependencies),
    ...Object.keys(dependencies).filter((name) => name.startsWith('@seine/')),
    ...(external ? external.split(',') : []),
  ],
};
