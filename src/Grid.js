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
  breakpointId: 'lg',
  breakpoints: ['lg', 'md', 'sm'],
}: Config);

export default function Grid(props: Props) {
  const breakpoint = Math.max(
    props.breakpoints ? props.breakpoints.indexOf(props.breakpointId) : -1,
    0
  );
  return (
    <div
      style={{
        display: 'grid',

        gridTemplateAreas: props.areas[
          props.areas.length > breakpoint ? breakpoint : props.areas.length - 1
        ]
          .map((row) => `"${row}"`)
          .join(' '),

        gridTemplateColumns: props.columns[
          props.columns.length > breakpoint
            ? breakpoint
            : props.columns.length - 1
        ].join(' '),

        gridTemplateRows: props.rows[
          props.rows.length > breakpoint ? breakpoint : props.rows.length - 1
        ].join(' '),
      }}
    >
      {props.children}
    </div>
  );
}
