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
 * @description Action button to create bar chart block.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function BarChartAddButton(
  { children = 'Bar chart', title = 'Add bar chart', ...buttonProps }: Props,
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
              title: 'First line',
              value: 35,
            },
            {
              title: 'Second line',
              value: 70,
            },
          ],
        },
        { kind: chartTypes.BAR }
      )}
      ref={ref}
      title={title}
    >
      {children}
    </ActionButton>
  );
});
