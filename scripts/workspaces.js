const { workspaces = [] } = require('../package.json');

module.exports = workspaces;

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports);
}
