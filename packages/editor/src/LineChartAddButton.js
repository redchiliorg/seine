// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import {
  blockTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { ActionButton } from '@seine/ui';
import { defaultChartFormat } from '@seine/charts';

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
export default function LineChartAddButton({
  children = 'line chart',
  title = 'Add line chart',
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
        defaultChartFormat
      )}
      title={title}
    >
      {children}
    </ActionButton>
  );
}
