const parseWorkspaces = require('./parse-workspaces');

module.exports = parseWorkspaces();

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports);
}
