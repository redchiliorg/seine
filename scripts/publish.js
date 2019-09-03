#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');
const { workspaces } = require('../package.json');

if (require.main === module) {
  try {
    publish(workspaces);
  } catch (error) {
    console.error(error);
  }
}

function publish(workspaces) {
  return workspaces.reduce(
    (state, workspace) => ({
      workspace,
      child: state
        ? state.child.once('exit', (code) =>
            code
              ? console.warn(`${workspace} failed with code ${code}`)
              : publishWorkspace(workspace)
          )
        : publishWorkspace(workspace),
    }),
    null
  );
}

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
