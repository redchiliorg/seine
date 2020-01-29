// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import { blockTypes, createBlock } from '@seine/core';
import { ActionButton } from '@seine/ui';

type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  dispatch: (BlocksAction) => any,
};

const defaultCell = { text: '' };

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
        header: [{ text: 'Column 1' }, { text: 'Column 2' }],
        rows: [[defaultCell, defaultCell], [defaultCell, defaultCell]],
      })}
      title={title}
      {...buttonProps}
    >
      {children}
    </ActionButton>
  );
}
