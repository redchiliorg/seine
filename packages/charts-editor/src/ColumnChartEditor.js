// @flow
import * as React from 'react';
import { EditableGroup, EditableOverlay } from '@seine/ui';
import {
  ColumnChart,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from '@seine/charts';

import type { ChartEditorProps as Props } from './types';
import ColumnChartEditorView from './ColumnChartEditorView';

/**
 * @description Editor of column chart
 * props {Props}
 * @returns {React.Node}
 */
export default function ColumnChartEditor({
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
                  {...editor[index]}
                  y={editor[index].y + barLineSize * index}
                  width={editor[index].width}
                  height={editor[index].height}
                  size={maxSize}
                  maxWidth={overlayBox.width}
                  maxHeight={overlayBox.height}
                >
                  &nbsp;
                </EditableGroup>
              )
          )}
      </EditableOverlay>

      <ColumnChart
        {...chartProps}
        elements={elements}
        fontSize={fontSize}
        lineHeight={lineHeight}
        palette={palette}
        size={size}
        /* view and its props */
        as={ColumnChartEditorView}
        dispatch={dispatch}
      />
    </>
  );
}
