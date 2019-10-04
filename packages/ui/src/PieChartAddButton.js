// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import { blockTypes, chartTypes, createBlock } from '@seine/core';

import ActionButton from './ActionButton';

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
export default React.forwardRef(function PieChartAddButton(
  { children = 'Pie chart', title = 'Add pie chart', ...buttonProps }: Props,
  ref
) {
  return (
    <ActionButton
      {...buttonProps}
      block={createBlock(
        blockTypes.CHART,
        {
          elements: [
            {
              title: 'First slice',
              value: 30,
            },
            {
              title: 'Second slice',
              value: 70,
            },
          ],
        },
        { kind: chartTypes.PIE }
      )}
      ref={ref}
      title={title}
    >
      {children}
    </ActionButton>
  );
});
