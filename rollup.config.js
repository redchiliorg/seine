import fs from 'fs';
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

import { workspaces } from './package.json';

const resolveWorkspaces = require('./scripts/resolve-workspaces');
const packages = resolveWorkspaces(workspaces);

const muiCorePath = path.dirname(require.resolve('@material-ui/core'));

const { NODE_ENV = 'production' } = process.env;
const { format, external, name } = minimist(process.argv.slice(2), {
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
      name: 'hooks',
      buildStart() {
        this.warn(`Building package ${packageName}@${packageVersion}`);
      },
      resolveId(id, importer) {
        if (importer && importer.startsWith(muiCorePath)) {
          const importerPath = path.dirname(importer);
          const modulePath = path.join(importerPath, id);
          try {
            if (fs.statSync(modulePath).isDirectory()) {
              return {
                id: `@material-ui/core/${path.basename(id)}`,
                external: true,
              };
            }
          } catch {}
        }

        if (id.startsWith('@material-ui/core')) {
          return { id, external: true };
        }

        if (id === packageName) {
          this.error(`${packageName} tries to import from itself`);
        }

        return null;
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
        'react-is': ['ForwardRef'],
        'prop-types': ['elementType'],
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
    ...packages.reduce(
      (acc, { packageJson: { name } }) =>
        name in dependencies ? [...acc, name] : acc,
      []
    ),
    ...(external ? external.split(',') : []),
  ],
};

export default config;
