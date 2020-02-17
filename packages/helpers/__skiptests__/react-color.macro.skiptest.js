const pluginTester = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  babelOptions: { filename: __filename },
  snapshot: true,
  tests: [
    `
      // @flow
      import { SketchPicker } from '../react-color.macro';

      const DefaultPicker = SketchPicker;

      export default () => <DefaultPicker />;
      export const Picker = () => {
        const Picker = SketchPicker;
        return <Picker />;
      }
      export { SketchPicker };
    `,
  ],
});
