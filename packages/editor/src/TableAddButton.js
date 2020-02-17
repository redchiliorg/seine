// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import { blockTypes, createBlock } from '@seine/core';
import { ActionButton } from '@seine/ui';
import { defaultTableCell } from '@seine/tables';

type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  dispatch: (BlocksAction) => any,
};

/**
 * @description Action button to create table block.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableAddButton({
  children = 'Table',
  title = 'Add text block',
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      block={createBlock(blockTypes.TABLE, {
        header: [
          { ...defaultTableCell, text: 'Column 1' },
          { ...defaultTableCell, text: 'Column 2' },
        ],
        rows: [
          [defaultTableCell, defaultTableCell],
          [defaultTableCell, defaultTableCell],
        ],
      })}
      title={title}
      {...buttonProps}
    >
      {children}
    </ActionButton>
  );
}
