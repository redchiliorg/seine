// @flow
import * as React from 'react';
import type {
  BlockEditor,
  ChartBody,
  ChartFormat,
  ElementsAction,
} from '@seine/core';
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
import { defaultChartPalette, defaultChartSize, PieChart } from '@seine/charts';

type Props = BlockEditor & $Shape<ChartFormat> & ChartBody;

/**
 * @description Pie editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartEditor({
  elements,
  size = defaultChartSize,
  palette = defaultChartPalette,

  id,
  dispatch,
  selection,
  editor = null,
}: Props) {
  const isSelected = selection.length === 1 && selection[0] === id;
  const overlayRef = React.useRef(null);
  const dispatchElements = React.useCallback(
    (action: ElementsAction) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduceElements(elements, action) },
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
            editor !== null &&
            overlayBox &&
            isSelected &&
            elements.map(({ title, percent: value }, index) => {
              if (index in editor) {
                const { x, y, width, height } = editor[index];
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
                      value={value}
                      action={{ type: UPDATE_ELEMENT, index }}
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
                      action={{ type: UPDATE_ELEMENT, index }}
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
            editor,
          ]
        )}
      </EditableOverlay>

      <PieChart
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
