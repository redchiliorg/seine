import path from 'path';
import fs from 'fs';

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
const {
  external,
  format,
  name,
  input = path.join('src', `${name}.js`),
  defaultOutputFile = path.join('lib', format, `${name}.js`),
  file = defaultOutputFile,
} = minimist(process.argv.slice(2), {
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
  input,
  output: {
    file,
    format,
    ...(format === 'umd' && {
      name: camelCase(packageName),
      banner: `window.process = {env: {NODE_ENV: '${NODE_ENV}'}};`,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'draft-js': 'Draft',
        'styled-components/macro': 'styled',
        crypto: 'crypto',
        ...externalModuleIds.reduce(
          (acc, name) => ({
            ...acc,
            [name]: camelCase(name),
          }),
          {}
        ),
      },
    }),
    sourcemap: !!file,
  },
  plugins: [
    ...(format === 'esm'
      ? [visualize({ template: process.env.VISUALIZER_TEMPLATE })]
      : []),

    ...(format === 'esm' || format === 'cjs' ? [flowEntry()] : []),

    babel({
      runtimeHelpers: true,
      rootMode: 'upward',
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    postcss({ modules: true }),
    cleanup(),
  ],
  external: (id) =>
    externalModuleIds.some(
      (moduleId) => id === moduleId || id.startsWith(`${moduleId}/`)
    ),
};

try {
  const defaultOutputDir = path.dirname(defaultOutputFile);
  const subDirs = [defaultOutputDir];

  for (const dirEntry of fs.readdirSync(defaultOutputDir, {
    withFileTypes: true,
  })) {
    const entryPath = path.resolve(defaultOutputDir, dirEntry.name);
    if (dirEntry.isFile()) {
      fs.unlinkSync(entryPath);
    } else if (dirEntry.isDirectory()) {
      subDirs.push(entryPath);
    }
  }

  for (const entryPath of subDirs.sort().reverse()) {
    fs.rmdirSync(entryPath);
  }
} catch (err) {}

export default config;
