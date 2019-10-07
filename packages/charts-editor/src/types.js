// @flow
import type { BlocksAction, ElementsAction } from '@seine/core';
import type { ChartProps } from '@seine/charts';

export type ChartEditorProps = {
  dispatch: (BlocksAction) => any,
  dispatchElement: (ElementsAction) => any,
} & ChartProps;

export type ChartSVGElement = {
  getBBox: () => DOMRectReadOnly,
} & HTMLElement;
