// @flow
import type { Action, Block, BlockId } from '@seine/core';
import {
  blockTypes,
  CREATE_BLOCK,
  createBlock,
  createBlocksFromTree,
} from '@seine/core';
import * as React from 'react';
import { toRawContent } from '@seine/draft';
import { CompositeActionButton } from '@seine/ui';

type Props = {
  id: BlockId,
  dispatch: (Action) => any,
  blocks: $ReadOnlyArray<Block>,
};

export default ({ id, dispatch, blocks }: Props) => (
  <CompositeActionButton
    title={'Add sibling text block'}
    dispatch={dispatch}
    actions={React.useMemo(
      () =>
        createBlocksFromTree(
          createBlock(
            blockTypes.GRID,
            null,
            { columns: 'repeat(auto-fit, minmax(300px, 1fr))' },
            id
          ),
          [
            {
              type: blockTypes.DRAFT,
              body: toRawContent('First column text content'),
              format: {
                verticalAlignment: 'center',
              },
            },
            {
              type: blockTypes.DRAFT,
              body: toRawContent('Second column text content'),
              format: {
                verticalAlignment: 'center',
              },
            },
          ]
        ).map((block) => ({ type: CREATE_BLOCK, block })),
      //eslint-disable-next-line
      [id, blocks]
    )}
  >
    + 2 text columns
  </CompositeActionButton>
);
