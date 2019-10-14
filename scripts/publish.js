#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

const { workspaces } = require('../package.json');

if (require.main === module) {
  try {
    publish(workspaces);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
function publish(workspaces) {
  return workspaces.reduce(
    (state, workspace) => ({
      workspace,
      child: state
        ? 'child' in state &&
          state.child.once('exit', (code) =>
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

/**
 * @description Publish (yarn) workspace.
 * @param {?string} workspace
 * @returns {*}
 */
function publishWorkspace(workspace) {
  return spawn(
    'yarn',
    ['publish', '--non-interactive', '--patch', '--access public'],
    {
      cwd: path.resolve(workspace),
      stdio: 'inherit',
    }
  );
}
