// @flow
import * as React from 'react';
import type { Action, Block, BlockId } from '@seine/core';
import {
  blockTypes,
  chartTypes,
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
            { columns: 'auto', rows: '0.025fr 0.975fr' },
            id
          ),
          [
            {
              type: blockTypes.DRAFT,
              body: toRawContent('<h2>Bar chart title</h2>'),
              format: {
                textAlignment: 'center',
              },
            },

            {
              type: blockTypes.CHART,
              body: {
                elements: [
                  {
                    title: 'First line',
                    value: 35,
                  },
                  {
                    title: 'Second line',
                    value: 70,
                  },
                ],
              },
              format: {
                kind: chartTypes.PIE,
              },
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