module.exports = [
  '--environment=NODE_ENV:production',
  '--config=../../rollup.config.js',
  ...process.argv.slice(2),
];

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports);
}
