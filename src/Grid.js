// @flow
import * as React from 'react';

import type { GridBody, GridFormat } from './types';

export type Props = (GridBody & GridFormat) & {
  children: React.ChildrenArray<React.Node>,
};

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Grid({
  children,
  columns = 'repeat(auto-fit, minmax(300px, 1fr))',
  columnGap = 20,
  rows = '',
  rowGap = 20,
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
