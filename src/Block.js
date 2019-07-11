// @flow
import * as React from 'react';

import { blockTypes } from './types';
import type { BlockType, Data } from './types';
import Grid from './Grid';

export default function Block(
  props: Data & {
    type: BlockType,
    children?: React.ChildrenArray<React.Node>,
  }
) {
  return props.type === blockTypes.DRAFT ? (
    <div>{props.children}</div>
  ) : props.type === blockTypes.GRID ? (
    <Grid {...props}>{props.children}</Grid>
  ) : props.type === blockTypes.TEXT ? (
    <p>{props.text}</p>
  ) : (
    <React.Fragment />
  );
}
