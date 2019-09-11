// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import { UPDATE_BLOCK_BODY, useSelectableBlockProps } from '@seine/core';
import {
  ActionInput,
  BlockContainer,
  EditableElement,
  EditableGroup,
  EditableOverlay,
  EditableInput,
} from '@seine/ui';
import {
  Barchart,
  defaultBarchartFontWeight,
  defaultBarchartLineHeight,
  defaultBarchartPalette,
  defaultBarchartSize,
} from '@seine/barchart';

import reduce, { UPDATE_BAR_CHART_ELEMENT } from './reducer';
import type { Action } from './reducer';

type Props = BlockEditor & {
  id: string,
  dispatch: Function,
};

const defaultBarchartEditor = {};

/**
 * @description Bar chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarchartEditor({
  id,
  selection,
  dispatch,
  elements,
  size = defaultBarchartSize,
  fontWeight = defaultBarchartFontWeight,
  lineHeight = defaultBarchartLineHeight,
  palette = defaultBarchartPalette,
  editor: boxes = defaultBarchartEditor,
}: Props) {
  const overlayRef = React.useRef(null);

  const dispatchElements = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduce(elements, action) },
      }),
    [dispatch, elements]
  );

  const isSelected = selection.length === 1 && selection[0] === id;

  const overlayBox =
    overlayRef.current && overlayRef.current.getBoundingClientRect();

  return (
    <BlockContainer {...useSelectableBlockProps({ id, selection }, dispatch)}>
      <EditableOverlay ref={overlayRef}>
        {React.useMemo(
          () =>
            overlayBox &&
            isSelected &&
            elements.map(({ title, value }, index) => {
              if (index in boxes) {
                const { x, y, width, height } = boxes[index];
                return (
                  <EditableGroup
                    key={index}
                    x={x}
                    y={y}
                    size={size}
                    width={width}
                    height={height}
                    fontSize={2}
                    maxWidth={overlayBox.width}
                    maxHeight={overlayBox.height}
                  >
                    <EditableInput
                      as={ActionInput}
                      name={'title'}
                      value={title}
                      action={{ type: UPDATE_BAR_CHART_ELEMENT, index }}
                      dispatch={dispatchElements}
                    />
                    <EditableInput
                      as={ActionInput}
                      name={'value'}
                      type={'number'}
                      value={value}
                      action={{ type: UPDATE_BAR_CHART_ELEMENT, index }}
                      dispatch={dispatchElements}
                      textAlign={'right'}
                    />
                  </EditableGroup>
                );
              }

              return false;
            }),
          [dispatchElements, elements, isSelected, overlayBox, size, boxes]
        )}
      </EditableOverlay>

      <Barchart
        size={size}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        palette={palette}
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
      />
    </BlockContainer>
  );
}
