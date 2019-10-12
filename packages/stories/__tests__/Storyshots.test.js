import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

initStoryshots({
  configPath: 'packages/stories/.storybook',
  integrityOptions: { cwd: __dirname },
  test: multiSnapshotWithOptions(),
});
