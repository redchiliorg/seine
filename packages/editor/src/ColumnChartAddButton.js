// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import {
  blockTypes,
  chartTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { ActionButton } from '@seine/ui';

type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  children?: React.Node,
  dispatch: (BlocksAction) => any,
  title?: string,
};

/**
 * @description Action button to create pie chart block.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartAddButton({
  children = 'column chart',
  title = 'Add column chart',
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      {...buttonProps}
      block={createBlock(
        blockTypes.CHART,
        {
          elements: createTitleIdentityBlockElements([
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
          ]),
        },
        { kind: chartTypes.COLUMN }
      )}
      title={title}
    >
      {children}
    </ActionButton>
  );
}
