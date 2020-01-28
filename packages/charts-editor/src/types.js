// @flow
import type { BlocksAction, ElementsAction } from '@seine/core';
import type { ChartProps } from '@seine/charts';

export type ChartEditorProps = {
  dispatch: (BlocksAction) => any,
  dispatchElements: (ElementsAction) => any,
} & ChartProps;
