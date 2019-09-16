// @flow
import * as React from 'react';
import {
  ActionInput,
  EditableElement,
  EditableGroup,
  EditableInput,
  EditableOverlay,
} from '@seine/ui';
import {
  defaultChartFontSize,
  defaultChartPalette,
  defaultChartSize,
  PieChart,
} from '@seine/charts';
import { UPDATE_ELEMENT } from '@seine/core';

import type { ChartEditorProps as Props } from './types';

/**
 * @description Editor of pie chart
 * props {Props}
 * @returns {React.Node}
 */
export default function PieChartEditor({
  dispatchElements,
  dispatch,
  editor,

  elements,

  fontSize = defaultChartFontSize,
  palette = defaultChartPalette,
  size = defaultChartSize,

  ...chartProps
}: Props) {
  const [overlay, setOverlay] = React.useState(null);
  const overlayBox = overlay && overlay.getBoundingClientRect();

  return (
    <>
      <EditableOverlay ref={setOverlay}>
        {!!(editor && overlayBox) &&
          elements.map(
            ({ value, title }, index) =>
              index in editor && (
                <EditableGroup
                  columns
                  fontSize={1}
                  justify={'center'}
                  maxWidth={overlayBox.width}
                  maxHeight={overlayBox.height}
                  width={editor[index].width}
                  height={editor[index].height}
                  x={editor[index].x}
                  y={editor[index].y}
                  size={size}
                >
                  <EditableInput
                    size={size}
                    fontSize={`${2 * fontSize}em`}
                    as={ActionInput}
                    name={'value'}
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
                    fontSize={`${1.5 * fontSize}em`}
                    as={ActionInput}
                    name={'title'}
                    value={title}
                    action={{ type: UPDATE_ELEMENT, index }}
                    dispatch={dispatchElements}
                  />
                </EditableGroup>
              )
          )}
      </EditableOverlay>

      <PieChart
        {...chartProps}
        elements={elements.map((element, index) => ({
          ...element,
          as: ({ children }) => (
            <EditableElement index={index} dispatch={dispatch}>
              {children}
            </EditableElement>
          ),
        }))}
        fontSize={fontSize}
        palette={palette}
        size={size}
      />
    </>
  );
}
