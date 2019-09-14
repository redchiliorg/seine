// @flow
import type { ElementsAction } from '@seine/core/src/reducers';

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
