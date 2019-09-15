// @flow
import * as React from 'react';
import type { BlockEditor, ElementsAction } from '@seine/core';
import { chartTypes, reduceElements, UPDATE_BLOCK_BODY } from '@seine/core';
import {
  BlockContainer,
  EditableElement,
  EditableOverlay,
  useSelectableBlockProps,
} from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import {
  Chart,
  defaultChartDy,
  defaultChartFontSize,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartMaxValue,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartSize,
  defaultChartTitle,
} from '@seine/charts';

import EditablePieGroup from './EditablePieGroup';
import EditableBarGroup from './EditableBarGroup';

type Props = ChartProps &
  BlockEditor & {
    id: string,
    dispatch: Function,
  };

const defaultEditableGroupRenderMap = {
  [chartTypes.BAR]: EditableBarGroup,
  [chartTypes.PIE]: EditablePieGroup,
  [chartTypes.COLUMN]: EditableBarGroup,
};

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  elements,

  dy = defaultChartDy,
  size = defaultChartSize,
  fontSize = defaultChartFontSize,
  fontWeight = defaultChartFontWeight,
  kind = chartTypes.BAR,
  lineHeight = defaultChartLineHeight,
  maxValue = defaultChartMaxValue,
  minValue = defaultChartMinValue,
  palette = defaultChartPalette,
  title = defaultChartTitle,

  editableGroupRenderMap: {
    [kind]: EditableGroup,
  } = defaultEditableGroupRenderMap,
  editor = null,

  id,
  selection,
  dispatch,
}: Props) {
  const overlayRef = React.useRef(null);

  const dispatchElements = React.useCallback(
    (action: ElementsAction) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduceElements(elements, action) },
      }),
    [dispatch, elements]
  );

  const isSelected = selection.length === 1 && selection[0] === id;

  const overlayBox =
    overlayRef.current && overlayRef.current.getBoundingClientRect();

  const maxWidth = overlayBox && overlayBox.width;
  const maxHeight = overlayBox && overlayBox.height;

  return (
    <BlockContainer {...useSelectableBlockProps({ id, selection }, dispatch)}>
      <EditableOverlay ref={overlayRef}>
        {editor !== null &&
          overlayBox &&
          isSelected &&
          elements.map(
            (element, index) =>
              index in editor && (
                <EditableGroup
                  key={index}
                  index={index}
                  {...element}
                  {...editor[index]}
                  dispatch={dispatchElements}
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                  maxHeight={maxHeight}
                  maxWidth={maxWidth}
                  elements={elements}
                  size={size}
                />
              )
          )}
      </EditableOverlay>

      <Chart
        elements={
          isSelected
            ? elements.map((element, index) => ({
                ...element,
                as: ({ children }) => (
                  <EditableElement index={index} dispatch={dispatch}>
                    {children}
                  </EditableElement>
                ),
              }))
            : elements
        }
        dy={dy}
        fontSize={fontSize}
        fontWeight={fontWeight}
        kind={kind}
        lineHeight={lineHeight}
        minValue={minValue}
        maxValue={maxValue}
        palette={palette}
        size={size}
        title={title}
      />
    </BlockContainer>
  );
}
