// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import type { ActionButtonProps } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import type { TableBody, TableCell } from '@seine/core';

type Props = {
  children: any,
  columnIndex: number,
  rowIndex: number,
  cell: TableCell,
} & $Rest<ActionButtonProps, {| type: string |}> &
  TableBody;

/**
 * @description Table cell format button
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableCellButton({
  cell,
  children = null,
  rows,
  rowIndex,
  columnIndex,
  header,
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      type={UPDATE_BLOCK_BODY}
      {...buttonProps}
      body={{
        rows: [
          ...rows.slice(0, rowIndex),
          [
            ...rows[rowIndex].slice(0, columnIndex),
            {
              ...rows[rowIndex][columnIndex],
              ...cell,
            },
            ...rows[rowIndex].slice(columnIndex + 1),
          ],
          ...rows.slice(rowIndex + 1),
        ],
      }}
    >
      {children}
    </ActionButton>
  );
}
