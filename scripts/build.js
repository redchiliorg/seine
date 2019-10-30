#!/usr/bin/env node
const resolveWorkspaces = require('./resolve-workspaces');
const buildWorkspace = require('./build-workspace');

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
function build(workspaces) {
  return resolveWorkspaces(workspaces)
    .filter((workspace) => 'entry' in workspace)
    .map(({ context }) => buildWorkspace(context));
}

module.exports = build;

if (require.main === module) {
  try {
    build();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
