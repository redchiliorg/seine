// @flow
import * as React from 'react';
import type { BlockEditor, PieBody, PieFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY, useSelectableBlockProps } from '@seine/core';
import { defaultPiePalette, defaultPieSize, Pie } from '@seine/pie';
import {
  ActionInput,
  BlockContainer,
  EditableElement,
  EditableGroup,
  EditableOverlay,
  EditableInput,
} from '@seine/ui';

import reduce, { UPDATE_PIE_ELEMENT } from './reducer';
import type { Action } from './reducer';

type Props = BlockEditor & $Shape<PieFormat> & PieBody;

const defaultPieEditor = {};

/**
 * @description Pie editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieEditor({
  id,
  selection,
  dispatch,
  elements,
  size = defaultPieSize,
  palette = defaultPiePalette,
  editor: boxes = defaultPieEditor,
}: Props) {
  const isSelected = selection.length === 1 && selection[0] === id;
  const overlayRef = React.useRef(null);
  const dispatchElements = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduce(elements, action) },
      }),
    [dispatch, elements]
  );

  const overlayBox =
    overlayRef.current && overlayRef.current.getBoundingClientRect();

  const fontSize = size / 24;

  return (
    <BlockContainer {...useSelectableBlockProps({ id, selection }, dispatch)}>
      <EditableOverlay ref={overlayRef}>
        {React.useMemo(
          () =>
            overlayBox &&
            isSelected &&
            elements.map(({ title, percent: value }, index) => {
              if (index in boxes) {
                const { x, y, width, height } = boxes[index];
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
                    maxWidth={overlayBox.width}
                    maxHeight={overlayBox.height}
                    key={index}
                  >
                    <EditableInput
                      size={size}
                      as={ActionInput}
                      name={'percent'}
                      value={Math.min(99, Math.max(value, 1))}
                      action={{ type: UPDATE_PIE_ELEMENT, index }}
                      dispatch={dispatchElements}
                      type={'number'}
                      minvalue={0}
                      maxvalue={100}
                      align={'center'}
                    />
                    <EditableInput
                      size={size}
                      fontSize={0.75}
                      as={ActionInput}
                      name={'title'}
                      value={title}
                      action={{ type: UPDATE_PIE_ELEMENT, index }}
                      dispatch={dispatchElements}
                    />
                  </EditableGroup>
                );
              }

              return false;
            }),
          [
            dispatchElements,
            elements,
            fontSize,
            isSelected,
            overlayBox,
            size,
            boxes,
          ]
        )}
      </EditableOverlay>

      <Pie
        size={size}
        elements={React.useMemo(
          () =>
            isSelected
              ? elements.map((element, index) => ({
                  ...element,
                  as: ({ children }) => (
                    <EditableElement index={index} dispatch={dispatch}>
                      {children}
                    </EditableElement>
                  ),
                }))
              : elements,
          [dispatch, elements, isSelected]
        )}
        palette={palette}
      />
    </BlockContainer>
  );
}
