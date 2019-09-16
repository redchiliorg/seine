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
  BarChart,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from '@seine/charts';
import { UPDATE_ELEMENT } from '@seine/core';

import type { ChartEditorProps as Props } from './types';

/**
 * @description Editor of bar chart
 * props {Props}
 * @returns {React.Node}
 */
export default function BarChartEditor({
  dispatchElements,
  dispatch,
  editor,

  elements,

  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,

  ...chartProps
}: Props) {
  const [overlay, setOverlay] = React.useState(null);
  const overlayBox = overlay && overlay.getBoundingClientRect();

  const barLineSize = fontSize * 3;
  const maxSize = elements.length * barLineSize;

  return (
    <>
      <EditableOverlay ref={setOverlay}>
        {!!(editor && overlayBox) &&
          elements.map(
            ({ value, title }, index) =>
              index in editor && (
                <EditableGroup
                  maxWidth={overlayBox.width}
                  maxHeight={overlayBox.height}
                  width={editor[index].width}
                  height={editor[index].height}
                  x={editor[index].x}
                  y={editor[index].y + barLineSize * index}
                  size={maxSize}
                >
                  <EditableInput
                    as={ActionInput}
                    fontSize={`${0.65 * fontSize}em`}
                    name={'title'}
                    value={title}
                    action={{ type: UPDATE_ELEMENT, index }}
                    dispatch={dispatchElements}
                    width={size / 2}
                  />
                  <EditableInput
                    as={ActionInput}
                    fontSize={`${0.65 * fontSize}em`}
                    name={'value'}
                    type={'number'}
                    value={value}
                    action={{ type: UPDATE_ELEMENT, index }}
                    dispatch={dispatchElements}
                    align={'right'}
                  />
                </EditableGroup>
              )
          )}
      </EditableOverlay>

      <BarChart
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
        lineHeight={lineHeight}
        palette={palette}
        size={size}
      />
    </>
  );
}
