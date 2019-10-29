const { resolve } = require('path');
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
  return spawn('rollup', options, {
    cwd: workspace && resolve(workspace),
    stdio: 'inherit',
  });
}

module.exports = buildWorkspace;

if (require.main === module) {
  buildWorkspace();
}
