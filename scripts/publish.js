#!/usr/bin/env node
const resolveWorkspaces = require('./resolve-workspaces');
const publishWorkspace = require('./publish-workspace');

/**
 * @description Publish non-private packages of (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
function publish(workspaces) {
  return resolveWorkspaces(workspaces)
    .filter(({ packageJson }) => !packageJson.private)
    .map(({ context }) => publishWorkspace(context));
}

module.exports = publish;

if (require.main === module) {
  try {
    publish();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
