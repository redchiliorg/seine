/* eslint-disable no-template-curly-in-string */
module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'react-color',
        customName: (name) => {
          const matched = name.match(/^(?<N>\w+)Picker$/);
          return `react-color/lib/${matched ? matched.groups.N : name}`;
        },
        camel2DashComponentName: false,
      },
      'react-color',
    ],
  ],
};
