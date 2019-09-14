// @flow
import * as React from 'react';
import { ActionInput, EditableGroup, EditableInput } from '@seine/ui';
import { UPDATE_ELEMENT } from '@seine/core';

import type { EditableGroupProps } from './types';

/**
 * @description Pie chart editable elements group.
 * @param {EditableGroupProps} props
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
}: EditableGroupProps) {
  return (
    <EditableGroup
      columns
      justify={'center'}
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
        size={size}
        fontSize={fontSize}
        as={ActionInput}
        name={'value'}
        value={value}
        action={{ type: UPDATE_ELEMENT, index }}
        dispatch={dispatch}
        type={'number'}
        minvalue={0}
        maxvalue={100}
        align={'center'}
      />
      <EditableInput
        size={size}
        fontSize={0.75 * fontSize}
        as={ActionInput}
        name={'title'}
        value={title}
        action={{ type: UPDATE_ELEMENT, index }}
        dispatch={dispatch}
      />
    </EditableGroup>
  );
}
