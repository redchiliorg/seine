const { dirname, join } = require('path');

const glob = require('glob');

const { workspaces = [] } = require('../package.json');

const { nohoist = [], packages = [] } = Array.isArray(workspaces)
  ? { packages: workspaces }
  : workspaces;

const globOptions = {
  sync: true,
  nodir: true,
};

module.exports = {
  nohoist,
  packages: packages
    .reduce(
      (acc, pattern) => [
        ...acc,
        ...glob(join(pattern, 'package.json'), globOptions),
      ],
      []
    )
    .map((packageJson) => dirname(packageJson)),
};

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports);
}
