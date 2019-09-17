// @flow
import * as React from 'react';
import { ForeignInput } from '@seine/ui';
import {
  ColumnChart,
  ColumnChartLegend,
  ColumnChartLegendProps,
} from '@seine/charts';
import { UPDATE_ELEMENT } from '@seine/core';

import type { ChartEditorProps as Props } from './types';

/**
 * @description Editor of column chart
 * props {Props}
 * @returns {React.Node}
 */
export default function ColumnChartEditor({
  dispatchElements,
  dispatch,
  editor,
  ...chartProps
}: Props) {
  return (
    <ColumnChart
      {...chartProps}
      as={React.useCallback(
        ({ children, ...viewProps }) => (
          <svg {...viewProps}>
            {children}
            {React.Children.map(children, (child: ?React.Node) => {
              if (React.isValidElement(child)) {
                switch (child.type) {
                  case ColumnChartLegend: {
                    const {
                      fontSize,
                      lineHeight,
                      size,
                      title,
                      width,
                      x,
                      y,
                    }: ColumnChartLegendProps = child.props;

                    return (
                      <ForeignInput
                        fontSize={fontSize}
                        height={size}
                        lineHeight={lineHeight}
                        onChange={() =>
                          dispatch({ type: UPDATE_ELEMENT, index: child.key })
                        }
                        value={title}
                        width={width}
                        x={x + size + fontSize * lineHeight}
                        y={y}
                      />
                    );
                  }

                  default:
                    return null;
                }
              }
            })}
            )}
          </svg>
        ),
        [dispatch]
      )}
    />
  );
}
