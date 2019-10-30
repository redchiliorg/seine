#!/usr/bin/env node
const resolveWorkspaces = require('./resolve-workspaces');
const publishWorkspace = require('./publish-workspace');

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
function publish(workspaces) {
  return resolveWorkspaces(workspaces)
    .filter((workspace) => !workspace.packageJson.private)
    .reduce(
      (state, { context }) => ({
        context,
        child:
          state && 'child' in state
            ? state.child.once('exit', (code) =>
                code
                  ? // eslint-disable-next-line no-console
                    console.warn(`${state.context} failed with code ${code}`)
                  : publishWorkspace(context)
              )
            : publishWorkspace(context),
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
