import initStoryshots, {
  multiSnapshotWithOptions,
  Stories2SnapsConverter,
} from '@storybook/addon-storyshots';
import * as draftModule from '@seine/draft';
import * as draftEditorModule from '@seine/draft-editor';

draftModule.Draft = draftEditorModule.DraftEditor = jest.fn(
  ({ blocks, entityMap }) =>
    JSON.stringify({
      blocks: blocks.map((block, index) => ({ ...block, key: index + 1 })),
      entityMap,
    })
);

initStoryshots({
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '',
  }),
  test: multiSnapshotWithOptions(),
});
