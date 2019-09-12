// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_ELEMENT, reduceElements } from '@seine/core';
import {
  ActionInput,
  BlockContainer,
  EditableElement,
  EditableGroup,
  EditableOverlay,
  EditableInput,
  useSelectableBlockProps,
} from '@seine/ui';
import {
  BarChart,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from '@seine/charts';

type Props = BlockEditor & {
  id: string,
  dispatch: Function,
};

/**
 * @description Bar chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  id,
  selection,
  dispatch,
  elements,
  size = defaultChartSize,
  fontWeight = defaultChartFontWeight,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  editor = null,
}: Props) {
  const overlayRef = React.useRef(null);

  const dispatchElements = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduceElements(elements, action) },
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
            editor !== null &&
            overlayBox &&
            isSelected &&
            elements.map(({ title, value }, index) => {
              if (index in editor) {
                const { x, y, width, height } = editor[index];
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
                      action={{ type: UPDATE_ELEMENT, index }}
                      dispatch={dispatchElements}
                    />
                    <EditableInput
                      as={ActionInput}
                      name={'value'}
                      type={'number'}
                      value={value}
                      action={{ type: UPDATE_ELEMENT, index }}
                      dispatch={dispatchElements}
                      textAlign={'right'}
                    />
                  </EditableGroup>
                );
              }

              return false;
            }),
          [dispatchElements, elements, isSelected, overlayBox, size, editor]
        )}
      </EditableOverlay>

      <BarChart
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
