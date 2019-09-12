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
  size,

  dispatch,
  index,
}: Props) {
  return (
    <EditableGroup
      key={index}
      x={x}
      y={y}
      size={size}
      width={width}
      height={height}
      fontSize={fontSize}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      <EditableInput
        as={ActionInput}
        name={'title'}
        value={title}
        action={{ type: UPDATE_ELEMENT, index }}
        dispatch={dispatch}
      />
      <EditableInput
        as={ActionInput}
        name={'value'}
        type={'number'}
        value={value}
        action={{ type: UPDATE_ELEMENT, index }}
        dispatch={dispatch}
        textAlign={'right'}
      />
    </EditableGroup>
  );
}
