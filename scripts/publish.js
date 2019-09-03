#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');
const { workspaces } = require('../package.json');

const requiredArgs = ['--non-interactive'];
const defaultArgs = [
  '--access public',
  '--patch',
  '--no-commit-hooks',
  '--no-git-tag-version',
];

if (require.main === module) {
  try {
    publish(workspaces);
  } catch (error) {
    console.error(error);
  }
}

function publish(workspaces) {
  return workspaces.reduce(
    (child, workspace) =>
      child
        ? child.once('exit', (code) =>
            code ? process.exit(code) : publishWorkspace(workspace)
          )
        : publishWorkspace(workspace),
    null
  );
}

function publishWorkspace(workspace, args = defaultArgs) {
  return spawn('yarn', ['publish', ...requiredArgs, ...args], {
    cwd: path.resolve(workspace),
    stdio: 'inherit',
  });
}
