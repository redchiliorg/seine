import path from 'path';

import minimist from 'minimist';
import { commandAliases } from 'rollup/dist/shared';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import flowEntry from 'rollup-plugin-flow-entry';
import { bold } from 'ansi-colors';

const { format = 'esm', name = 'index', external = '' } = minimist(
  process.argv.slice(2),
  {
    alias: commandAliases,
  }
);
const packageJson = require(`${__dirname}/package.json`);

// eslint-disable-next-line
console.log(bold(`\nBuilding package ${packageJson.name}`));

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
      runtimeHelpers: true,
    }),
    commonjs(),
    nodeResolve({
      preferBuiltins: true,
    }),
    postcss({ modules: true }),
  ],
  external: [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.dependencies).filter((name) =>
      name.startsWith('@seine/')
    ),
    ...(external ? external.split(',') : []),
  ],
};
