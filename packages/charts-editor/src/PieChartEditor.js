// @flow
import * as React from 'react';
import {
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
        {React.useMemo(
          () =>
            !!(editor && overlayBox) &&
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
                      align={'center'}
                      fontSize={`${2 * fontSize}em`}
                      minvalue={0}
                      maxvalue={100}
                      onChange={({ currentTarget }) =>
                        dispatchElements({
                          type: UPDATE_ELEMENT,
                          index,
                          body: { value: +currentTarget.value },
                        })
                      }
                      size={size}
                      type={'number'}
                      value={value}
                    />
                    <EditableInput
                      fontSize={`${1.5 * fontSize}em`}
                      onChange={({ currentTarget }) =>
                        dispatchElements({
                          type: UPDATE_ELEMENT,
                          index,
                          body: { title: currentTarget.value },
                        })
                      }
                      size={size}
                      value={title}
                    />
                  </EditableGroup>
                )
            ),
          [dispatchElements, editor, elements, fontSize, overlayBox, size]
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
