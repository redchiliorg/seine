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
import camelCase from 'lodash/camelCase';

import { workspaces } from './package.json';

const { NODE_ENV = 'production' } = process.env;
const { format, external, name } = minimist(process.argv.slice(2), {
  alias: commandAliases,
  default: {
    external: '',
    format: 'esm',
    name: 'index',
  },
});

const {
  name: packageName,
  dependencies = {},
  peerDependencies = {},
} = require(path.resolve('package.json'));

const workspaceModuleIds = [
  ...require('./scripts/resolve-workspaces')(workspaces)
    .map(({ packageJson: { name: id } }) => id)
    .filter((id) => id in dependencies),
];
const peerModuleIds = Object.keys(peerDependencies);
const externalModuleIds = [
  ...peerModuleIds,
  ...workspaceModuleIds,
  ...external.split(','),
].filter((id) => id.trim());

const config = {
  input: path.join('src', `${name}.js`),
  output: {
    file: path.join('lib', format, `${name}.js`),
    format,
    ...(format === 'umd' && {
      name: camelCase(packageName),
      banner: `window.process = {env: {NODE_ENV: '${NODE_ENV}'}};`,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'draft-js': 'Draft',
        'styled-components': 'styled',
        crypto: 'crypto',
        ...Object.keys(workspaceModuleIds).reduce(
          (acc, name) => ({
            ...acc,
            [name]: camelCase(name),
          }),
          {}
        ),
      },
    }),
    sourcemap: true,
  },
  plugins: [
    ...(format === 'esm'
      ? [visualize({ template: process.env.VISUALIZER_TEMPLATE })]
      : []),

    ...(format === 'esm' || format === 'cjs' ? [flowEntry()] : []),

    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      rootMode: 'upward',
    }),
    commonjs(),
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    postcss({ modules: true }),
    cleanup(),
  ],
  external: (id) =>
    externalModuleIds.some(
      (moduleId) => id === moduleId || id.startsWith(`${moduleId}/`)
    ),
};

export default config;
