const { resolve } = require('path');
const { spawn } = require('child_process');

const allOptions = require('./publish-options');

const lastDefaultOption = allOptions[allOptions.length - 1];
const defaultWorkspace =
  lastDefaultOption && lastDefaultOption.startsWith('-')
    ? void 0
    : lastDefaultOption;
const defaultOptions = defaultWorkspace ? allOptions.slice(0, -1) : allOptions;

/**
 * @description Publish (yarn) workspace.
 * @param {?string} workspace
 * @param {?Array<string>} options
 * @returns {*}
 */
function publishWorkspace(
  workspace = defaultWorkspace,
  options = defaultOptions
) {
  return spawn('yarn', ['publish', ...options], {
    cwd: workspace && resolve(workspace),
    stdio: 'inherit',
  });
}

module.exports = publishWorkspace;

if (require.main === module) {
  publishWorkspace();
}
