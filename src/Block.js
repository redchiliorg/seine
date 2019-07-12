// @flow
import * as React from 'react';

import { blockTypes } from './types';
import type { BlockType, Data } from './types';
import Grid from './Grid';
import Draft from './Draft';
import Pie from './Pie';

export default function Block(props: {
  children?: React.ChildrenArray<React.Node>,
  data: Data,
  type: BlockType,
}) {
  const {
    children,
    data: { body, elements, ...data },
    type,
    ...config
  } = props;

  return type === blockTypes.DRAFT ? (
    <Draft {...config} editable {...data}>
      {body}
    </Draft>
  ) : type === blockTypes.GRID ? (
    <Grid {...config} {...data}>
      {children}
    </Grid>
  ) : type === blockTypes.PIE ? (
    <Pie {...config} {...data}>
      {elements}
    </Pie>
  ) : (
    <React.Fragment />
  );
}
