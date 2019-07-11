// @flow
import * as React from 'react';

import type { GridData } from './types';

type Config = {
  breakpointId?: string,
  breakpoints?: string[],
};

type Props = Config &
  (GridData & {
    children: React.ChildrenArray<React.Node>,
  });

Grid.defaultProps = ({
  areas: 'none',
  columns: 'repeat(auto-fit, minmax(300px, 1fr))',
  rows: 'auto',
}: Config);

export default function Grid(props: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: props.areas,
        gridTemplateColumns: props.columns,
        gridTemplateRows: props.rows,
      }}
    >
      {props.children}
    </div>
  );
}
