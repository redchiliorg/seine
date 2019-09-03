import path from 'path';
import { rmdirSync, unlinkSync } from 'fs';

import minimist from 'minimist';
import { commandAliases } from 'rollup/dist/shared';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import flowEntry from 'rollup-plugin-flow-entry';
import cleanup from 'rollup-plugin-cleanup';
import { bold, grey } from 'ansi-colors';
import visualize from 'rollup-plugin-visualizer';

const { external, format, name } = minimist(process.argv.slice(2), {
  commandAliases,
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
} = require(`${__dirname}/package.json`);

const config = {
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
    cleanup(),
  ],
  external: [
    'crypto',
    ...Object.keys(peerDependencies),
    ...Object.keys(dependencies).filter((name) => name.startsWith('@seine/')),
    ...(external ? external.split(',') : []),
  ],
};

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-console */
  try {
    unlinkSync(`${__dirname}/stats.html`);
  } catch (error) {
    console.log(grey(error));
  }

  try {
    unlinkSync(config.output.file);
    try {
      unlinkSync(`${config.output.file}.flow`);
    } catch (error) {
      console.log(grey(error));
    }
    rmdirSync(path.dirname(config.output.file));
  } catch (error) {
    console.log(grey(error));
  }

  console.log(bold(`\nBuilding package ${packageName}@${packageVersion}`));
  /* eslint-enable no-console */

  config.plugins = [
    visualize({
      template: process.env.VISUALIZER_TEMPLATE,
    }),
    ...config.plugins,
  ];
}

export default config;
