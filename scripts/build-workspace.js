const { resolve, relative } = require('path');
const { spawn } = require('child_process');

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

  return spawn('rollup', [...options, `--config=${config}`], {
    cwd,
    stdio: 'inherit',
  });
}

module.exports = buildWorkspace;

if (require.main === module) {
  buildWorkspace();
}
