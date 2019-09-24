// @flow
import * as React from 'react';
import type { Action, Block, BlockId } from '@seine/core';
import {
  blockTypes,
  chartTypes,
  CREATE_BLOCK,
  createBlock,
  createBlocksFromTree,
  createTitleIdentityBlockElements,
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
    title={'Add line chart'}
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
              body: toRawContent('<h2>Line chart title</h2>'),
              format: {
                textAlignment: 'center',
              },
            },

            {
              type: blockTypes.CHART,
              body: {
                elements: createTitleIdentityBlockElements([
                  {
                    title: 'Top',
                    value: 100,
                    group: 'group 1',
                  },
                  {
                    title: 'Bottom',
                    value: 10,
                    group: 'group 1',
                  },
                  {
                    title: 'Top',
                    value: 100,
                    group: 'group 2',
                  },
                  {
                    title: 'Bottom',
                    value: 10,
                    group: 'group 2',
                  },
                ]),
              },
              format: {
                kind: chartTypes.LINE,
              },
            },
          ]
        ).map((block) => ({ type: CREATE_BLOCK, block })),
      //eslint-disable-next-line
      [id, blocks]
    )}
  >
    + line chart
  </CompositeActionButton>
);
