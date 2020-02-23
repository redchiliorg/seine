const { workspaces } = require('../package.json');
const resolveWorkspaces = require('../scripts/resolve-workspaces');

module.exports = async ({ config, mode }) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: resolveWorkspaces(workspaces)
      .filter((opts) =>
        mode.toLowerCase() === 'development'
          ? 'entry' in opts
          : 'module' in opts
      )
      .reduce(
        (acc, { entry, module, packageJson: { name } }) => ({
          ...acc,
          [name]: mode.toLowerCase() === 'development' ? entry : module,
        }),
        config.resolve.alias
      ),
  },
});
