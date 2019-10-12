#!/usr/bin/env node
const { packages: defaultWorkspaces } = require('./workspaces');
const publishWorkspace = require('./publish-workspace');

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
function publish(workspaces = defaultWorkspaces) {
  return workspaces.reduce(
    (state, workspace) => ({
      workspace,
      child:
        state && 'child' in state
          ? state.child.once('exit', (code) =>
              code
                ? // eslint-disable-next-line no-console
                  console.warn(`${workspace} failed with code ${code}`)
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
