const resolveWorkspaces = require('../../../scripts/resolve-workspaces');

module.exports = async ({ config }) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: resolveWorkspaces().reduce(
      (acc, { entry, packageJson: { name } }) => ({
        ...acc,
        [name]: entry,
      }),
      config.resolve.alias
    ),
  },
});
