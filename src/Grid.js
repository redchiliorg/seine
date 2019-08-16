// @flow
import * as React from 'react';

import type { GridData } from './types';

type Props = GridData & {
  children: React.ChildrenArray<React.Node>,
};

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Grid({
  children,
  rows = '',
  columns = '',
  areas = 'none',
  columnGap = 20,
  rowGap = 20,
}: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: areas,
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
