// @flow
import * as React from 'react';
import { ActionInput, EditableGroup, EditableInput } from '@seine/ui';
import { UPDATE_ELEMENT } from '@seine/core';

import type { EditableGroupProps } from './types';

/**
 * @description Bar chart editable elements group.
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
  lineHeight,
  size,

  dispatch,
  index,

  elements,
}: EditableGroupProps) {
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
