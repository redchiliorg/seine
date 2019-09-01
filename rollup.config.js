import path from 'path';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

const defaultFormats = ['cjs', 'umd', 'esm'];

export default [
  ...configure('./packages/core'),
  ...configure('./packages/draft'),
  ...configure('./packages/pie'),
  ...configure('./packages/content'),
  ...configure('./packages/ui'),
  ...configure('./packages/draft-editor'),
];

/**
 *
 * @description Create workspace rollup build configuration.
 * @param {string} pkg
 * @param {Array<'cjs'|'umd'|'esm'>} formats
 * @returns {object}
 */
function configure(pkg, formats = defaultFormats) {
  const name = 'index';
  const { peerDependencies = {} } = require(`${pkg}/package.json`);
  return formats.map((format) => ({
    input: path.join(__dirname, pkg, 'src', `${name}.js`),
    output: {
      file: path.join(__dirname, pkg, 'lib', `${name}.${format}.js`),
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
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      postcss({ modules: true }),
    ],
    external: Object.keys(peerDependencies),
  }));
}
