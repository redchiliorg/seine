// @flow
import type { BlocksAction, ElementsAction } from '@seine/core';
import type { ChartProps } from '@seine/charts';

export type ChartEditorProps = {
  dispatchElements: (ElementsAction) => any,
  dispatch: (BlocksAction) => any,
  editor: {
    [index: number]: {
      x: number,
      y: number,
      width: number,
      height: number,
    },
  },
} & ChartProps;

export type ChartSVGElement = {
  getBBox: () => DOMRectReadOnly,
} & HTMLElement;
