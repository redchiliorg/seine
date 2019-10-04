import path from 'path';

import minimist from 'minimist';
import { commandAliases } from 'rollup/dist/shared';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import flowEntry from 'rollup-plugin-flow-entry';
import cleanup from 'rollup-plugin-cleanup';
import visualize from 'rollup-plugin-visualizer';

const { NODE_ENV = 'production' } = process.env;
const { external, format, name } = minimist(process.argv.slice(2), {
  alias: commandAliases,
  default: {
    external: false,
    format: 'esm',
    name: 'index',
  },
});

const {
  name: packageName,
  version: packageVersion,
  dependencies = {},
  peerDependencies = {},
} = require(path.resolve('package.json'));

const config = {
  input: path.join('src', `${name}.js`),
  output: {
    file: path.join('lib', format, `${name}.js`),
    format,
    ...(format === 'umd' && {
      name,
      banner: `window.process = {env: {NODE_ENV: '${NODE_ENV}'}};`,
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
    {
      name: 'debug',
      buildStart() {
        this.warn(`Building package ${packageName}@${packageVersion}`);
      },
    },
    visualize({
      template: process.env.VISUALIZER_TEMPLATE,
    }),
    flowEntry(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      rootMode: 'upward',
    }),
    commonjs({
      namedExports: {
        '../../node_modules/@material-ui/utils/node_modules/react-is/index.js': [
          'ForwardRef',
        ],
        '../../node_modules/prop-types/index.js': ['elementType'],
      },
    }),
    nodeResolve({
      preferBuiltins: true,
    }),
    postcss({ modules: true }),
    cleanup(),
  ],
  external: [
    'crypto',
    ...Object.keys(peerDependencies),
    ...Object.keys(dependencies).filter((name) => name.startsWith('@seine/')),
    ...(external ? external.split(',') : []),
  ],
};

export default config;
