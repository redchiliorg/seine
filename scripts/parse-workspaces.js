const { dirname, join } = require('path');

const glob = require('glob');

const { workspaces: defaultWorkspaces = [] } = require('../package.json');

const globOptions = {
  sync: true,
  nodir: true,
};

module.exports = function parseWorkspaces(workspaces = defaultWorkspaces) {
  const { nohoist = [], packages = [] } = Array.isArray(workspaces)
    ? { packages: workspaces }
    : workspaces;
  return {
    nohoist,
    packages: packages
      .reduce(
        (acc, pattern) => [
          ...acc,
          ...glob(join(__dirname, '..', pattern, 'package.json'), globOptions),
        ],
        []
      )
      .map((packageJson) => dirname(packageJson)),
  };
};
