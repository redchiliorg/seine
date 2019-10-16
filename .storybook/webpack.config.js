const { workspaces } = require('../package.json');
const resolveWorkspaces = require('../scripts/resolve-workspaces');

module.exports = async ({ config, mode }) =>
  mode === 'development'
    ? {
        ...config,
        resolve: {
          ...config.resolve,
          alias: resolveWorkspaces(workspaces)
            .filter((opts) => 'entry' in opts)
            .reduce(
              (acc, { entry, packageJson: { name } }) => ({
                ...acc,
                [name]: entry,
              }),
              config.resolve.alias
            ),
        },
      }
    : config;
