import initStoryshots, {
  multiSnapshotWithOptions,
  Stories2SnapsConverter,
} from '@storybook/addon-storyshots';

jest.mock('draft-js/lib/generateRandomKey.js', () => () => '1');

initStoryshots({
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '',
  }),
  test: multiSnapshotWithOptions(),
});
