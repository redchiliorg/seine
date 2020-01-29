// @flow
import * as React from 'react';

export type TableElement = {
  text: React.Node,
  align?: 'left' | 'center' | 'right',
  bold?: boolean,
  italic?: boolean,
};

export type TableBody = {
  title?: string,
  header: TableElement[],
  rows: TableElement[][],
};

export type TableFormat = {};

export const TABLE = 'table';
