const { readdirSync, existsSync } = require('fs');
const { dirname, resolve, relative, join } = require('path');
const { spawn } = require('child_process');

const minimist = require('minimist');
const { commandAliases } = require('rollup/dist/shared');

const allOptions = require('./build-options');

const lastDefaultOption = allOptions[allOptions.length - 1];
const defaultWorkspace =
  lastDefaultOption && lastDefaultOption.startsWith('-')
    ? void 0
    : lastDefaultOption;
const defaultOptions = defaultWorkspace ? allOptions.slice(0, -1) : allOptions;

/**
 * @description Build (yarn) workspace.
 * @param {?string} workspace
 * @param {?Array<string>} options
 * @returns {*}
 */
function buildWorkspace(
  workspace = defaultWorkspace,
  options = defaultOptions
) {
  const cwd = workspace && resolve(workspace);
  const config = relative(cwd, require.resolve('../rollup.config.js'));
  const { format, input } = minimist(options, {
    alias: commandAliases,
    default: {
      external: '',
      format: 'esm',
      name: 'index',
    },
  });

  const srcDir = input ? join(cwd, dirname(input)) : join(cwd, 'src');

  for (const dirEntry of readdirSync(srcDir, { withFileTypes: true })) {
    if (dirEntry.isDirectory()) {
      const entry = join(srcDir, dirEntry.name, 'index.js');
      if (existsSync(entry)) {
        buildWorkspace(workspace, [
          ...options,
          `--file=${join('lib', format, `${dirEntry.name}.js`)}`,
          `--input=${join('src', dirEntry.name, 'index.js')}`,
        ]);
      }
    }
  }

  return spawn('rollup', [...options, `--config=${config}`], {
    cwd,
    stdio: 'inherit',
  });
}

module.exports = buildWorkspace;

if (require.main === module) {
  buildWorkspace();
}
