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
export default React.forwardRef(function LineChartAddButton(
  { children = 'line chart', title = 'Add line chart', ...buttonProps }: Props,
  ref
) {
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
        { kind: chartTypes.LINE }
      )}
      ref={ref}
      title={title}
    >
      {children}
    </ActionButton>
  );
});
