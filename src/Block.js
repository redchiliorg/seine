// @flow
import * as React from 'react';

import { blockTypes } from './types';
import type { BlockType, Data } from './types';
import Grid from './Grid';
import Draft from './Draft';

export default function Block(
  props: Data & {
    breakpointId?: string,
    breakpoints?: string[],
    children?: React.ChildrenArray<React.Node>,
    type: BlockType,
  }
) {
  const { breakpoints, breakpointId, children, type, ...data } = props;

  return type === blockTypes.DRAFT ? (
    <Draft>{data}</Draft>
  ) : type === blockTypes.GRID ? (
    <Grid {...data} breakpoints={breakpoints} breakpointId={breakpointId}>
      {children}
    </Grid>
  ) : type === blockTypes.TEXT ? (
    <p>{data}</p>
  ) : (
    <React.Fragment />
  );
}
