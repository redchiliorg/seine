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
    title={'Add bar chart'}
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
                    title: 'First Column',
                    value: 35,
                    group: 'group 1',
                  },
                  {
                    title: 'Second Column',
                    value: 70,
                    group: 'group 1',
                  },
                  {
                    title: 'First Column',
                    value: 70,
                    group: 'group 2',
                  },
                  {
                    title: 'Second Column',
                    value: 35,
                    group: 'group 2',
                  },
                  {
                    title: 'First Column',
                    value: 35,
                    group: 'group 3',
                  },
                  {
                    title: 'Second Column',
                    value: 35,
                    group: 'group 3',
                  },
                ],
              },
              format: {
                kind: chartTypes.COLUMN,
              },
            },
          ]
        ).map((block) => ({ type: CREATE_BLOCK, block })),
      //eslint-disable-next-line
      [id, blocks]
    )}
  >
    + column chart
  </CompositeActionButton>
);
