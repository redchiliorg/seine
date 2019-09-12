// @flow
import * as React from 'react';
import type { Action, Block, BlockId } from '@seine/core';
import {
  blockTypes,
  CREATE_BLOCK,
  createBlock,
  createBlocksFromTree,
} from '@seine/core';
import { toRawContent } from '@seine/draft';
import { CompositeActionButton } from '@seine/ui';

type Props = {
  id: BlockId,
  dispatch: (Action) => any,
  blocks: $ReadOnlyArray<Block>,
};

export default ({ id, dispatch, blocks }: Props) => (
  <CompositeActionButton
    title={'Add pie chart'}
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
              body: toRawContent('Text content'),
              format: null,
            },
            {
              type: blockTypes.GRID,
              format: { columns: '100%', rows: '0.025fr 0.975fr' },
              children: [
                {
                  type: blockTypes.DRAFT,
                  body: toRawContent('<h2>Pie title</h2>'),
                  format: {
                    textAlignment: 'center',
                  },
                },

                {
                  type: blockTypes.PIE_CHART,
                  body: {
                    elements: [
                      {
                        title: 'First half',
                        percent: 50,
                      },
                      {
                        title: 'Second half',
                        percent: 50,
                      },
                    ],
                  },
                  format: {
                    fontSize: 14,
                    padding: 60,
                  },
                },
              ],
            },
          ]
        ).map((block) => ({ type: CREATE_BLOCK, block })),
      //eslint-disable-next-line
      [id, blocks]
    )}
  >
    + pie chart
  </CompositeActionButton>
);
