// @flow
import * as React from 'react';
import { ActionInput, EditableGroup, EditableInput } from '@seine/ui';
import { UPDATE_ELEMENT } from '@seine/core';
import type { ElementsAction } from '@seine/core';

type Props = {
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

/**
 * @description Bar chart editable elements group.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditablePieGroup({
  x,
  y,
  width,
  height,
  maxWidth,
  maxHeight,

  value,
  title,

  fontSize,
  lineHeight,
  size,

  dispatch,
  index,

  elements,
}: Props) {
  const barLineSize = fontSize * 3;
  const maxSize = elements.length * barLineSize;

  return (
    <EditableGroup
      x={x}
      y={y + barLineSize * index}
      size={maxSize}
      width={width}
      height={height + lineHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      fontSize={fontSize / 2}
    >
      <EditableInput
        as={ActionInput}
        size={maxSize}
        name={'title'}
        value={title}
        action={{ type: UPDATE_ELEMENT, index }}
        dispatch={dispatch}
        width={size / 2}
      />
      <EditableInput
        as={ActionInput}
        size={maxSize}
        name={'value'}
        type={'number'}
        value={value}
        action={{ type: UPDATE_ELEMENT, index }}
        dispatch={dispatch}
        align={'right'}
      />
    </EditableGroup>
  );
}
