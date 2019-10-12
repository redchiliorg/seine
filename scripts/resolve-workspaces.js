const { join, resolve } = require('path');
const { inspect } = require('util');

const { packages: defaultWorkspaces } = require('./workspaces');

/**
 * @description Resolve each workspaces to its context path, entry module and
 * packageJson content
 * @param {string[]} workspaces
 * @returns {Array<{context: string, entry: string, packageJson: object}>}
 */
function resolveWorkspaces(workspaces = defaultWorkspaces) {
  return workspaces.map((workspace) => {
    const context = resolve(workspace);
    return {
      context,
      entry: require.resolve(join(context, 'src', 'index.js')),
      packageJson: require(join(context, 'package.json')),
    };
  });
}

module.exports = resolveWorkspaces;

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(inspect(resolveWorkspaces(), false, null, true));
}
