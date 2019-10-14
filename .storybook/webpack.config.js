const path = require('path');

const { workspaces } = require('../package.json');

module.exports = async ({ config }) => {
  workspaces.forEach((workspace) => {
    const workSpacePath = path.resolve(workspace);
    const packageJsonPath = path.join(workSpacePath, 'package.json');
    const entryPath = path.join(workSpacePath, 'src', 'index.js');

    const { name: moduleId } = require(packageJsonPath);

    config.resolve.alias[moduleId] = require.resolve(entryPath);
  });
  return config;
};
