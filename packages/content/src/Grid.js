// @flow
import * as React from 'react';
import type { GridBody, GridFormat } from '@seine/core';

export type Props = (GridBody & GridFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export const defaultGridColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
export const defaultGridColumnGap = 20;
export const defaultGridRowGap = 20;
export const defaultGridRows = '';

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Grid({
  children,

  columns = defaultGridColumns,
  columnGap = defaultGridColumnGap,

  rows = defaultGridRows,
  rowGap = defaultGridRowGap,
}: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        columnGap,
        rowGap,
      }}
    >
      {children}
    </div>
  );
}
