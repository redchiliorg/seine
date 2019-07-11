// @flow
import * as React from 'react';

import { blockTypes } from './types';
import type { BlockType, Data } from './types';
import Grid from './Grid';
import Draft from './Draft';

export default function Block(props: {
  children?: React.ChildrenArray<React.Node>,
  data: Data,
  type: BlockType,
}) {
  const { children, data, type, ...config } = props;

  return type === blockTypes.DRAFT ? (
    <Draft {...config}>{data}</Draft>
  ) : type === blockTypes.GRID ? (
    <Grid {...config} {...data}>
      {children}
    </Grid>
  ) : type === blockTypes.TEXT ? (
    <p>{data}</p>
  ) : (
    <React.Fragment />
  );
}
