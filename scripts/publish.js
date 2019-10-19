#!/usr/bin/env node
const publishWorkspace = require('./publish-workspace');
const parseWorkspaces = require('./parse-workspaces');

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
function publish(workspaces) {
  return parseWorkspaces(workspaces).packages.reduce(
    (state, workspace) => ({
      workspace,
      child:
        state && 'child' in state
          ? state.child.once('exit', (code) =>
              code
                ? // eslint-disable-next-line no-console
                  console.warn(`${state.workspace} failed with code ${code}`)
                : publishWorkspace(workspace)
            )
          : publishWorkspace(workspace),
    }),
    null
  );
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
