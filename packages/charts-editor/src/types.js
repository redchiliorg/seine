// @flow
import type { EditorAction, ElementsAction } from '@seine/core';
import type { ChartProps } from '@seine/charts';

export type ChartEditorProps = {
  dispatchElements: (ElementsAction) => any,
  dispatch: (EditorAction) => any,
  editor: {
    [index: number]: {
      x: number,
      y: number,
      width: number,
      height: number,
    },
  },
} & ChartProps;

export type EditableGroupProps = {
  x: number,
  y: number,
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
  lineHeight: number,
  value: number,
  title: string,
  fontSize: number,
  size: number,
  dispatch: (ElementsAction) => any,
  index: number,
};

export type ChartSVGElement = {
  getBBox: () => DOMRectReadOnly,
} & HTMLElement;
