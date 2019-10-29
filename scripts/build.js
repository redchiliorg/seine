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
    .reduce(
      (state, { context }) => ({
        context,
        child:
          state && 'child' in state
            ? state.child.once('exit', (code) =>
                code
                  ? // eslint-disable-next-line no-console
                    console.warn(`${state.context} failed with code ${code}`)
                  : buildWorkspace(context)
              )
            : buildWorkspace(context),
      }),
      null
    );
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
