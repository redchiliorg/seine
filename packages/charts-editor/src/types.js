// @flow
import type { ElementsAction } from '@seine/core';
import type { ChartProps } from '@seine/charts';

export type ChartEditorProps = {
  dispatch: (ElementsAction) => any,
} & ChartProps;

export type ChartSVGElement = {
  getBBox: () => DOMRectReadOnly,
} & HTMLElement;
