const fs = require('fs');

const { addDefault } = require('@babel/helper-module-imports');
const { createMacro } = require('babel-plugin-macros');

const exportsNamePattern = /^(?<moduleName>\w+)Picker$/;
const exportsFilename = require.resolve('react-color');
const exportsCode = fs.readFileSync(exportsFilename, 'utf-8');

module.exports = createMacro(reactColorMacro);

/**
 * @description Cherry pick imported react-color picker components.
 */
function reactColorMacro({ babel: { parseSync, traverse }, references }) {
  traverse(parseSync(exportsCode, { filename: exportsFilename }), {
    Identifier(path) {
      const { node } = path;
      const { name: reference } = node;
      const { [reference]: referencePaths } = references;
      const match =
        referencePaths && referencePaths.length > 0
          ? reference.match(exportsNamePattern)
          : null;
      if (
        match &&
        path.findParent(
          (path) =>
            path.isMemberExpression({ property: node }) &&
            path.get('object').isIdentifier({ name: 'exports' }) &&
            path.findParent(
              (parentPath) =>
                parentPath.scope.parent === null &&
                parentPath.isAssignmentExpression({
                  left: path.node,
                  operator: '=',
                })
            )
        )
      ) {
        const { name } = addDefault(
          referencePaths[0],
          `react-color/lib/${match.groups.moduleName}`,
          { nameHint: reference }
        );
        referencePaths.forEach((path) => {
          path.node.name = name;
        });
      }
    },
  });
}
